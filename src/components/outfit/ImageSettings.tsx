import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export interface ImageSettingsData {
  background: string;
  pose: string;
  format: string;
  usage: string;
}

interface ImageSettingsProps {
  settings: ImageSettingsData;
  onSettingsChange: (settings: ImageSettingsData) => void;
}

const backgrounds = [
  { value: "studio", label: "Estúdio" },
  { value: "colorful", label: "Colorido" },
  { value: "street", label: "Rua" },
  { value: "nature", label: "Natureza" },
  { value: "office", label: "Escritório" },
];

const poses = [
  { value: "frontal", label: "Frontal" },
  { value: "side", label: "Lateral" },
  { value: "casual", label: "Casual" },
  { value: "professional", label: "Profissional" },
];

const formats = [
  { value: "1:1", label: "Quadrada (1:1)" },
  { value: "3:4", label: "Retrato (3:4)" },
  { value: "16:9", label: "Paisagem (16:9)" },
];

const usages = [
  { value: "marketplace", label: "Marketplace" },
  { value: "social", label: "Redes Sociais" },
  { value: "catalog", label: "Catálogo" },
  { value: "website", label: "Website" },
];

export const ImageSettings = ({ settings, onSettingsChange }: ImageSettingsProps) => {
  const updateSetting = (key: keyof ImageSettingsData, value: string) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-5">
      <div>
        <Label className="text-sm font-medium text-foreground mb-2 block">Plano de Fundo</Label>
        <RadioGroup
          value={settings.background}
          onValueChange={(value) => updateSetting("background", value)}
          className="grid grid-cols-2 gap-2"
        >
          {backgrounds.map((bg) => (
            <div key={bg.value} className="flex items-center space-x-2">
              <RadioGroupItem value={bg.value} id={`bg-${bg.value}`} />
              <Label htmlFor={`bg-${bg.value}`} className="text-sm cursor-pointer">
                {bg.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-sm font-medium text-foreground mb-2 block">Postura</Label>
        <RadioGroup
          value={settings.pose}
          onValueChange={(value) => updateSetting("pose", value)}
          className="grid grid-cols-2 gap-2"
        >
          {poses.map((pose) => (
            <div key={pose.value} className="flex items-center space-x-2">
              <RadioGroupItem value={pose.value} id={`pose-${pose.value}`} />
              <Label htmlFor={`pose-${pose.value}`} className="text-sm cursor-pointer">
                {pose.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-sm font-medium text-foreground mb-2 block">Formato da Imagem</Label>
        <RadioGroup
          value={settings.format}
          onValueChange={(value) => updateSetting("format", value)}
          className="space-y-2"
        >
          {formats.map((format) => (
            <div key={format.value} className="flex items-center space-x-2">
              <RadioGroupItem value={format.value} id={`format-${format.value}`} />
              <Label htmlFor={`format-${format.value}`} className="text-sm cursor-pointer">
                {format.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-sm font-medium text-foreground mb-2 block">Sugestão de Uso</Label>
        <RadioGroup
          value={settings.usage}
          onValueChange={(value) => updateSetting("usage", value)}
          className="grid grid-cols-2 gap-2"
        >
          {usages.map((usage) => (
            <div key={usage.value} className="flex items-center space-x-2">
              <RadioGroupItem value={usage.value} id={`usage-${usage.value}`} />
              <Label htmlFor={`usage-${usage.value}`} className="text-sm cursor-pointer">
                {usage.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};
