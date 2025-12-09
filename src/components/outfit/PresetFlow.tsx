import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImageUpload } from "./ImageUpload";
import { ResultDisplay } from "./ResultDisplay";
import { OutfitGrid } from "./OutfitGrid";
import { ImageSettings, ImageSettingsData } from "./ImageSettings";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { outfitPresets, OutfitPreset } from "@/lib/outfitData";
import { Loader2, Wand2 } from "lucide-react";

const backgroundPrompts: Record<string, string> = {
  studio: "professional photography studio with neutral gray backdrop",
  colorful: "vibrant colorful gradient background",
  street: "urban street photography setting",
  nature: "natural outdoor environment with greenery",
  office: "modern corporate office environment",
};

const posePrompts: Record<string, string> = {
  frontal: "facing directly towards camera",
  side: "turned to the side in profile view",
  casual: "relaxed casual standing pose",
  professional: "confident professional business pose",
};

export const PresetFlow = () => {
  const [personImage, setPersonImage] = useState<File | null>(null);
  const [personPreview, setPersonPreview] = useState<string>("");
  const [selectedOutfit, setSelectedOutfit] = useState<OutfitPreset | null>(null);
  const [resultImage, setResultImage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [imageSettings, setImageSettings] = useState<ImageSettingsData>({
    background: "studio",
    pose: "frontal",
    format: "1:1",
    usage: "marketplace",
  });
  const { toast } = useToast();

  const handlePersonImageChange = (file: File | null) => {
    setPersonImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPersonPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPersonPreview("");
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `person-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('outfit-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('outfit-images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const formatPrompts: Record<string, string> = {
    "1:1": "square aspect ratio 1:1, centered composition",
    "3:4": "portrait aspect ratio 3:4, vertical framing, full body visible from head to feet",
    "16:9": "landscape aspect ratio 16:9, wide horizontal framing",
  };

  const buildEnhancedPrompt = (basePrompt: string): string => {
    const bgPrompt = backgroundPrompts[imageSettings.background] || "";
    const posePrompt = posePrompts[imageSettings.pose] || "";
    const formatPrompt = formatPrompts[imageSettings.format] || "";
    
    return `${basePrompt}. Setting: ${bgPrompt}. Pose: ${posePrompt}. Image format: ${formatPrompt}. Optimized for ${imageSettings.usage} use.`;
  };

  const handleGenerate = async () => {
    if (!personImage || !selectedOutfit) {
      toast({
        title: "Seleção incompleta",
        description: "Por favor, faça upload da sua foto e escolha uma roupa.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setResultImage("");

    try {
      const personUrl = await uploadImage(personImage);
      const enhancedPrompt = buildEnhancedPrompt(selectedOutfit.prompt);

      const { data: editData, error: editError } = await supabase.functions.invoke(
        'edit-outfit',
        {
          body: {
            personImageUrl: personUrl,
            prompt: enhancedPrompt,
            format: imageSettings.format,
          },
        }
      );

      if (editError) throw editError;

      const imageUrl = editData.imageData 
        ? `data:image/jpeg;base64,${editData.imageData}`
        : editData.editedImageUrl;

      setResultImage(imageUrl);
      toast({
        title: "Sucesso!",
        description: "Sua imagem foi gerada com sucesso!",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao processar a imagem. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setPersonImage(null);
    setPersonPreview("");
    setSelectedOutfit(null);
    setResultImage("");
    setImageSettings({
      background: "studio",
      pose: "frontal",
      format: "1:1",
      usage: "marketplace",
    });
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4 bg-card/50 backdrop-blur border-border">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Sua Foto</h3>
        <ImageUpload
          onImageChange={handlePersonImageChange}
          preview={personPreview}
          label="Fazer upload da foto"
        />
      </Card>

      <Card className="p-4 bg-card/50 backdrop-blur border-border">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Escolha a Roupa</h3>
        <OutfitGrid
          outfits={outfitPresets}
          selectedOutfit={selectedOutfit}
          onSelectOutfit={setSelectedOutfit}
        />
      </Card>

      <Card className="p-4 bg-card/50 backdrop-blur border-border">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Configurações</h3>
        <ImageSettings
          settings={imageSettings}
          onSettingsChange={setImageSettings}
        />
        <Button
          onClick={handleGenerate}
          disabled={!personImage || !selectedOutfit || isProcessing}
          className="w-full mt-4"
          size="lg"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Gerando...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-5 w-5" />
              Gerar Imagem
            </>
          )}
        </Button>
      </Card>

      <Card className="p-4 bg-card/50 backdrop-blur border-border">
        <ResultDisplay 
          resultImage={resultImage} 
          isProcessing={isProcessing}
          onReset={handleReset}
        />
      </Card>
    </div>
  );
};
