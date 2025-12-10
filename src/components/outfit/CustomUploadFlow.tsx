import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImageUpload } from "./ImageUpload";
import { ResultDisplay } from "./ResultDisplay";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wand2 } from "lucide-react";

export const CustomUploadFlow = () => {
  const [personImage, setPersonImage] = useState<File | null>(null);
  const [clothingImage, setClothingImage] = useState<File | null>(null);
  const [personPreview, setPersonPreview] = useState<string>("");
  const [clothingPreview, setClothingPreview] = useState<string>("");
  const [resultImages, setResultImages] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState("");
  const { toast } = useToast();
  const configRef = useRef<HTMLDivElement>(null);

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

  const handleClothingImageChange = (file: File | null) => {
    setClothingImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setClothingPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setClothingPreview("");
    }
  };

  const uploadImage = async (file: File, type: string): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${type}-${Date.now()}.${fileExt}`;
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
    if (!personImage || !clothingImage) {
      toast({
        title: "Imagens necessárias",
        description: "Por favor, faça upload da sua foto e da roupa.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Step 1: Upload images
      setProcessingStep("Fazendo upload das imagens...");
      const personUrl = await uploadImage(personImage, 'person');
      const clothingUrl = await uploadImage(clothingImage, 'clothing');

      // Step 2: Generate prompt with AI agent
      setProcessingStep("Analisando a roupa com IA...");
      const { data: promptData, error: promptError } = await supabase.functions.invoke(
        'generate-prompt',
        {
          body: {
            personImageUrl: personUrl,
            clothingImageUrl: clothingUrl,
          },
        }
      );

      if (promptError) throw promptError;

      // Step 3: Edit image with Flux Kontext
      setProcessingStep("Gerando a imagem editada...");
      const { data: editData, error: editError } = await supabase.functions.invoke(
        'edit-outfit',
        {
          body: {
            personImageUrl: personUrl,
            prompt: promptData.prompt,
          },
        }
      );

    if (editError) throw editError;

    // The image comes as base64, convert it to display format
    const imageUrl = editData.imageData 
      ? `data:image/jpeg;base64,${editData.imageData}`
      : editData.editedImageUrl;

    setResultImages((prev) => [imageUrl, ...prev].slice(0, 4));
      toast({
        title: "Sucesso!",
        description: "Sua imagem foi gerada com sucesso!",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao processar as imagens. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProcessingStep("");
    }
  };

  const handleReset = () => {
    setPersonImage(null);
    setClothingImage(null);
    setPersonPreview("");
    setClothingPreview("");
    setResultImages([]);
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

      <Card ref={configRef} className="p-6 bg-card/50 backdrop-blur border-border">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Foto da Roupa</h3>
        <ImageUpload
          onImageChange={handleClothingImageChange}
          preview={clothingPreview}
          label="Fazer upload da roupa"
        />
        <Button
          onClick={handleGenerate}
          disabled={!personImage || !clothingImage || isProcessing}
          className="w-full mt-4"
          size="lg"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processando...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-5 w-5" />
              Gerar Imagem
            </>
          )}
        </Button>
        {processingStep && (
          <p className="text-sm text-muted-foreground text-center mt-2 animate-pulse">
            {processingStep}
          </p>
        )}
      </Card>

      <Card
        className={`p-6 bg-card/50 backdrop-blur border-border transition-all ${
          isProcessing || resultImages.length ? "md:col-span-2" : ""
        }`}
      >
        <ResultDisplay
          primaryImage={resultImages[0]}
          gallery={resultImages}
          isProcessing={isProcessing}
          onReset={handleReset}
          onRefine={() => configRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
        />
      </Card>
    </div>
  );
};
