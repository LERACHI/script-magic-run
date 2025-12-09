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
    const { personImageUrl, clothingImageUrl } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    console.log('Generating prompt with GPT-4.1-mini for outfit swap');

    // Call GPT-4.1-mini to analyze images and generate prompt
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini-2025-04-14',
        max_completion_tokens: 300,
        messages: [
        {
          role: 'system',
          content: 'You are an expert AI assistant specialized in color-accurate image editing prompts. Your primary task is to analyze clothing items and generate precise prompts for AI image editors that preserve EXACT colors, not just styles. You must identify and describe colors with extreme precision using specific color descriptors (bright red, navy blue, forest green, etc.) and ensure the AI understands to match the exact hue, saturation, and brightness of the original clothing.'
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analyze this clothing item with EXTREME FOCUS ON COLOR ACCURACY and create a detailed prompt for Flux Kontext Pro API. CRITICAL: You must identify the EXACT color of the clothing (e.g., "bright crimson red", "deep navy blue", "olive green", "burnt orange") and emphasize color precision in your prompt. The prompt should: 1) Start by describing the EXACT COLOR with high precision (use specific color names like crimson, scarlet, burgundy, not just "red"), 2) Describe the clothing type, style, and patterns, 3) Specify this is a FULL BODY SHOT showing complete outfit from head to toe, 4) Emphasize "preserve the EXACT color as shown in the reference image", 5) Maintain person\'s face, hair, pose in standing position, 6) Ensure realistic lighting while PRESERVING THE ORIGINAL COLOR ACCURATELY, 7) Create seamless blending. The COLOR MUST BE IDENTICAL to the input image. Return ONLY the prompt text, nothing else.'
            },
              {
                type: 'image_url',
                image_url: {
                  url: clothingImageUrl
                }
              }
            ]
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedPrompt = data.choices[0].message.content;

    console.log('Generated prompt:', generatedPrompt);

    return new Response(
      JSON.stringify({ prompt: generatedPrompt }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-prompt function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});