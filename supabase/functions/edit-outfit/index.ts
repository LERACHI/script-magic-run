import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      personImageUrl, 
      prompt, 
      format,
      removeBackground
    } = await req.json();
    
    // Map format to image dimensions
    const formatDimensions: Record<string, { width: number; height: number }> = {
      "1:1": { width: 1024, height: 1024 },
      "3:4": { width: 768, height: 1024 },
      "16:9": { width: 1280, height: 720 },
    };
    
    const dimensions = formatDimensions[format] || formatDimensions["1:1"];
    console.log('Requested format:', format, 'Dimensions:', dimensions);
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');

    if (!lovableApiKey) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    console.log('Calling Lovable AI (Nano Banana) with prompt:', prompt);

    // Fetch the image to send to the AI
    const imageResponse = await fetch(personImageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();
    const base64Image = btoa(
      new Uint8Array(imageBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    const personImageDataUrl = `data:image/jpeg;base64,${base64Image}`;

    // Build message content dynamically
    const content: any[] = [];
    let updatedPrompt = prompt;

    if (removeBackground) {
      updatedPrompt = `First remove the background from the uploaded person image, produce a clean silhouette. Then, follow the main prompt: ${prompt}`;
      console.log('Added removeBackground instruction to prompt.');
    }

    content.push({
      type: 'text',
      text: `${updatedPrompt} CRITICAL OUTPUT REQUIREMENTS: Generate the image in ${format} aspect ratio (${dimensions.width}x${dimensions.height}). The ENTIRE person must be visible in frame - do NOT crop any body parts. Include complete head-to-toe view with padding around the subject. Never cut off hands, feet, or head.`
    });

    // Person image
    content.push({
      type: 'image_url',
      image_url: { url: personImageDataUrl }
    });

    // Build a strict system prompt (logo handling removed)
    const systemPrompt = `You are a strict image compositor. Do not invent or add any logos, watermarks, text, icons, or badges. Follow the user's instructions exactly and keep the person fully in frame.`;

    // Call Lovable AI Gateway with Nano Banana model
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image-preview',
        temperature: 0,
        presence_penalty: 0,
        frequency_penalty: 0,
        messages: [
          {
            role: 'system',
            content: [{ type: 'text', text: systemPrompt }],
          },
          {
            role: 'user',
            content
          }
        ],
        modalities: ['image', 'text']
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI error:', response.status, errorText);
      
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      if (response.status === 402) {
        throw new Error('Payment required. Please add credits to your Lovable AI workspace.');
      }
      
      throw new Error(`Lovable AI error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Image generation complete!');

    // Extract the generated image from the response
    const editedImageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!editedImageUrl) {
      console.error('No image in response:', data);
      throw new Error('No image URL in response');
    }

    // The image is already in base64 format from Nano Banana
    // Extract the base64 data
    const imageData = editedImageUrl.replace(/^data:image\/\w+;base64,/, '');

    return new Response(
      JSON.stringify({ 
        editedImageUrl: editedImageUrl,
        prompt: prompt,
        imageData: imageData
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in edit-outfit function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
