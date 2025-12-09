import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImageUpload } from "./ImageUpload";
import { ResultDisplay } from "./ResultDisplay";
import { OutfitGrid } from "./OutfitGrid";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { outfitPresets, OutfitPreset } from "@/lib/outfitData";
import { Loader2, Wand2 } from "lucide-react";

export const PresetFlow = () => {
  const [personImage, setPersonImage] = useState<File | null>(null);
  const [personPreview, setPersonPreview] = useState<string>("");
  const [selectedOutfit, setSelectedOutfit] = useState<OutfitPreset | null>(null);
  const [resultImage, setResultImage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
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

      const { data: editData, error: editError } = await supabase.functions.invoke(
        'edit-outfit',
        {
          body: {
            personImageUrl: personUrl,
            prompt: selectedOutfit.prompt,
          },
        }
      );

      if (editError) throw editError;

      // The image comes as base64, convert it to display format
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
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="p-6 bg-card/50 backdrop-blur border-border">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Sua Foto</h3>
        <ImageUpload
          onImageChange={handlePersonImageChange}
          preview={personPreview}
          label="Fazer upload da foto"
        />
      </Card>

      <Card className="p-6 bg-card/50 backdrop-blur border-border">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Escolha a Roupa</h3>
        <OutfitGrid
          outfits={outfitPresets}
          selectedOutfit={selectedOutfit}
          onSelectOutfit={setSelectedOutfit}
        />
        <Button
          onClick={handleGenerate}
          disabled={!personImage || !selectedOutfit || isProcessing}
          className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
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

      <Card className="p-6 bg-card/50 backdrop-blur border-border">
        <ResultDisplay 
          resultImage={resultImage} 
          isProcessing={isProcessing}
          onReset={handleReset}
        />
      </Card>
    </div>
  );
};