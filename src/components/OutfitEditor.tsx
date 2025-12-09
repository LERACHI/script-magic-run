import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomUploadFlow } from "./outfit/CustomUploadFlow";
import { PresetFlow } from "./outfit/PresetFlow";
import { Sparkles } from "lucide-react";
import logo from "@/assets/logo.png";

export const OutfitEditor = () => {
  const [activeTab, setActiveTab] = useState("preset");

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="mb-6 flex flex-col items-center">
            <img src={logo} alt="AI HUB VAREJO" className="w-20 h-20 mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
              AI HUB VAREJO
            </h1>
          </div>
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-semibold text-foreground">
              Teste seu Modelo
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Visualize como você ficaria com peças sob medida exclusivas usando inteligência artificial.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="preset" className="text-base">
              Catálogo de Roupas
            </TabsTrigger>
            <TabsTrigger value="custom" className="text-base">
              Upload Customizado
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preset" className="animate-fade-in">
            <PresetFlow />
          </TabsContent>

          <TabsContent value="custom" className="animate-fade-in">
            <CustomUploadFlow />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
