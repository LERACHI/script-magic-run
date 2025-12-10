import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
  const [resultImages, setResultImages] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [referenceView, setReferenceView] = useState<string>("frente");
  const [productDetails, setProductDetails] = useState<string>("");
  const [seasonFilter, setSeasonFilter] = useState<string>("todas");
  const [removeBackground, setRemoveBackground] = useState<boolean>(false);
  const [imageSettings, setImageSettings] = useState<ImageSettingsData>({
    prompt: "",
    style: "Fotorealista",
    fidelity: 7,
    background: "studio",
    pose: "frontal",
    format: "1:1",
    usage: "marketplace",
  });
  const configRef = useRef<HTMLDivElement>(null);
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
    const fileExt = file.name.split(".").pop();
    const fileName = `person-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage.from("outfit-images").upload(filePath, file);
    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage.from("outfit-images").getPublicUrl(filePath);

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
    const scenePrompt = imageSettings.prompt?.trim();
    const stylePrompt = imageSettings.style ? `Visual style: ${imageSettings.style}.` : "";
    const fidelityPrompt = `Fidelity: ${imageSettings.fidelity}/10 (1=mais criativo, 10=mais fiel ao prompt).`;
    const referencePrompt = referenceView ? `Reference view: ${referenceView}.` : "";
    const detailsPrompt = productDetails.trim() ? `Product details: ${productDetails.trim()}.` : "";
    const removeBgPrompt = removeBackground ? "Remove background from the uploaded person image, clean silhouette." : "";

    const detailedScene = scenePrompt ? `User scene: ${scenePrompt}.` : "";

    return `${basePrompt}. ${detailedScene} ${stylePrompt} ${detailsPrompt} ${referencePrompt} ${removeBgPrompt} Setting: ${bgPrompt}. Pose: ${posePrompt}. Image format: ${formatPrompt}. ${fidelityPrompt} Optimized for ${imageSettings.usage} use.`;
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

    try {
      const personUrl = await uploadImage(personImage);
      const enhancedPrompt = buildEnhancedPrompt(selectedOutfit.prompt);

      const { data: editData, error: editError } = await supabase.functions.invoke("edit-outfit", {
        body: {
          personImageUrl: personUrl,
          prompt: enhancedPrompt,
          format: imageSettings.format,
          removeBackground,
        },
      });

      if (editError) throw editError;

      const imageUrl = editData.imageData ? `data:image/jpeg;base64,${editData.imageData}` : editData.editedImageUrl;

      setResultImages((prev) => [imageUrl, ...prev].slice(0, 4));
      toast({
        title: "Sucesso!",
        description: "Sua imagem foi gerada com sucesso!",
      });
    } catch (error) {
      console.error("Error:", error);
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
    setResultImages([]);
    setReferenceView("frente");
    setProductDetails("");
    setRemoveBackground(false);
    setImageSettings({
      prompt: "",
      style: "Fotorealista",
      fidelity: 7,
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
        <ImageUpload onImageChange={handlePersonImageChange} preview={personPreview} label="Fazer upload da foto" />

        <div className="mt-4 space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="remove-bg" checked={removeBackground} onCheckedChange={(val) => setRemoveBackground(!!val)} />
            <Label htmlFor="remove-bg" className="text-sm text-foreground cursor-pointer">
              Remover fundo da imagem de upload
            </Label>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-card/50 backdrop-blur border-border">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Escolha a Roupa</h3>
        <div className="mb-3 space-y-2">
          <Label className="text-sm font-medium text-foreground block">Estação do Ano</Label>
          <RadioGroup
            value={seasonFilter}
            onValueChange={(val) => {
              setSeasonFilter(val);
              if (selectedOutfit && val !== "todas" && !selectedOutfit.seasons.includes(val)) {
                setSelectedOutfit(null);
              }
            }}
            className="grid grid-cols-2 gap-2"
          >
            {[
              { value: "todas", label: "Todas" },
              { value: "primavera", label: "Primavera" },
              { value: "verao", label: "Verão" },
              { value: "outono", label: "Outono" },
              { value: "inverno", label: "Inverno" },
            ].map((opt) => (
              <div key={opt.value} className="flex items-center space-x-2">
                <RadioGroupItem value={opt.value} id={`season-${opt.value}`} />
                <Label htmlFor={`season-${opt.value}`} className="text-sm cursor-pointer">
                  {opt.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <p className="text-xs text-muted-foreground">
            A estação sugere looks adequados ao clima selecionado.
          </p>
        </div>
        <OutfitGrid
          outfits={
            seasonFilter === "todas"
              ? outfitPresets
              : outfitPresets.filter((o) => o.seasons.includes(seasonFilter))
          }
          selectedOutfit={selectedOutfit}
          onSelectOutfit={setSelectedOutfit}
        />
        <div className="mt-4 space-y-3">
          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">Imagem de Referência</Label>
            <RadioGroup value={referenceView} onValueChange={setReferenceView} className="grid grid-cols-3 gap-2">
              {[
                { value: "frente", label: "Frente" },
                { value: "costas", label: "Costas" },
                { value: "detalhe", label: "Detalhe" },
              ].map((opt) => (
                <div key={opt.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={opt.value} id={`ref-${opt.value}`} />
                  <Label htmlFor={`ref-${opt.value}`} className="text-sm cursor-pointer">
                    {opt.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground block">Detalhes do Produto para a IA (Opcional)</Label>
            <Textarea
              value={productDetails}
              onChange={(e) => setProductDetails(e.target.value)}
              placeholder="Ex: Foco no tecido de linho, evite gola dobrada."
              rows={3}
            />
            <p className="text-xs text-muted-foreground">Ex: Foco no tecido de linho, evite gola dobrada.</p>
          </div>
        </div>
      </Card>

      <Card ref={configRef} className="p-4 bg-card/50 backdrop-blur border-border">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Configurações</h3>
        <ImageSettings settings={imageSettings} onSettingsChange={setImageSettings} />
        <Button
          onClick={handleGenerate}
          disabled={!personImage || !selectedOutfit || isProcessing}
          className="w-full mt-4"
          size="lg"
          title={!selectedOutfit ? "Selecione uma roupa para habilitar a geração" : undefined}
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
        {!selectedOutfit && (
          <p className="mt-2 text-xs text-destructive">
            Selecione pelo menos uma roupa na coluna "Escolha a Roupa" para gerar a imagem.
          </p>
        )}
      </Card>

      <Card
        className={`p-4 bg-card/50 backdrop-blur border-border transition-all ${
          isProcessing || resultImages.length ? "lg:col-span-2" : ""
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
