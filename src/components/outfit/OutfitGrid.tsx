import { OutfitPreset } from "@/lib/outfitData";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

interface OutfitGridProps {
  outfits: OutfitPreset[];
  selectedOutfit: OutfitPreset | null;
  onSelectOutfit: (outfit: OutfitPreset) => void;
}

export const OutfitGrid = ({ outfits, selectedOutfit, onSelectOutfit }: OutfitGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
      {outfits.map((outfit) => (
        <Card
          key={outfit.id}
          onClick={() => onSelectOutfit(outfit)}
          className={`relative cursor-pointer transition-all hover:scale-105 ${
            selectedOutfit?.id === outfit.id
              ? 'ring-2 ring-primary shadow-glow'
              : 'hover:border-primary/50'
          }`}
        >
          <img
            src={outfit.imageUrl}
            alt={outfit.name}
            className="w-full h-32 object-cover rounded-t-lg"
          />
          <div className="p-2">
            <p className="text-xs font-medium text-foreground truncate">{outfit.name}</p>
          </div>
          {selectedOutfit?.id === outfit.id && (
            <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
              <Check className="w-4 h-4 text-primary-foreground" />
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};