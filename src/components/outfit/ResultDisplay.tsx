import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Download, RotateCcw, Loader2, Wand2 } from "lucide-react";

interface ResultDisplayProps {
  primaryImage?: string;
  gallery: string[];
  isProcessing: boolean;
  onReset: () => void;
  onRefine?: () => void;
}

export const ResultDisplay = ({ primaryImage, gallery, isProcessing, onReset, onRefine }: ResultDisplayProps) => {
  const handleDownload = (image: string) => {
    const link = document.createElement("a");
    link.href = image;
    link.download = `outfit-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const hasResults = gallery.length > 0 || !!primaryImage;
  const displayImage = primaryImage || gallery[0];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Resultado</h3>

      {isProcessing ? (
        <div className="space-y-3">
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-lg bg-background/50">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-sm text-muted-foreground">Gerando sua imagem...</p>
            <Progress value={70} className="mt-4 w-48 animate-pulse" />
          </div>
        </div>
      ) : hasResults && displayImage ? (
        <div className="space-y-3">
          <div className="relative group">
            <img
              src={displayImage}
              alt="Result"
              className="w-full rounded-lg border-2 border-primary shadow-glow object-contain"
            />
          </div>
          {gallery.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {gallery.slice(0, 4).map((thumb, idx) => (
                <div key={`${thumb}-${idx}`} className="border rounded-lg p-2 bg-background/50">
                  <img
                    src={thumb}
                    alt={`Resultado ${idx + 1}`}
                    className="h-32 w-full object-cover rounded-md border"
                  />
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <Button variant="secondary" size="sm" onClick={() => handleDownload(thumb)}>
                      <Download className="mr-1 h-4 w-4" />
                      Baixar PNG/JPG
                    </Button>
                    <Button variant="outline" size="sm" onClick={onRefine}>
                      <Wand2 className="mr-1 h-4 w-4" />
                      Refinar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <Button
              onClick={() => handleDownload(displayImage)}
              className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              <Download className="mr-2 h-4 w-4" />
              Baixar
            </Button>
            <Button onClick={onReset} variant="outline" className="flex-1">
              <RotateCcw className="mr-2 h-4 w-4" />
              Nova Imagem
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-lg bg-background/50">
          <p className="text-sm text-muted-foreground text-center px-4">Sua imagem editada aparecerǭ aqui</p>
        </div>
      )}
    </div>
  );
};
