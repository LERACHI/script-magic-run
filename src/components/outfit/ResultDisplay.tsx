import { Button } from "@/components/ui/button";
import { Download, RotateCcw, Loader2 } from "lucide-react";

interface ResultDisplayProps {
  resultImage: string;
  isProcessing: boolean;
  onReset: () => void;
}

export const ResultDisplay = ({ resultImage, isProcessing, onReset }: ResultDisplayProps) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = `outfit-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Resultado</h3>
      
      {isProcessing ? (
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-lg bg-background/50">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="text-sm text-muted-foreground">Gerando sua imagem...</p>
        </div>
      ) : resultImage ? (
        <>
          <div className="relative group">
            <img
              src={resultImage}
              alt="Result"
              className="w-full rounded-lg border-2 border-primary shadow-glow object-contain"
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleDownload}
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
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-lg bg-background/50">
          <p className="text-sm text-muted-foreground text-center px-4">
          Sua imagem editada aparecerá aqui
          </p>
        </div>
      )}
    </div>
  );
};