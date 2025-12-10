import { cn } from "@/lib/utils";
import { OutfitPreset } from "@/lib/outfitData";

interface OutfitGridProps {
  outfits: OutfitPreset[];
  selectedOutfit: OutfitPreset | null;
  onSelectOutfit: (outfit: OutfitPreset) => void;
}

export const OutfitGrid = ({ outfits, selectedOutfit, onSelectOutfit }: OutfitGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {outfits.map((outfit) => {
        const isActive = selectedOutfit?.id === outfit.id;
        return (
          <button
            key={outfit.id}
            type="button"
            onClick={() => onSelectOutfit(outfit)}
            className={cn(
              "group relative rounded-lg border bg-card/60 p-2 text-left transition hover:border-primary hover:shadow",
              isActive && "border-primary ring-2 ring-primary/30"
            )}
          >
            <div className="aspect-square overflow-hidden rounded-md border bg-background/50">
              <img src={outfit.imageUrl} alt={outfit.name} className="h-full w-full object-cover" />
            </div>
            <div className="mt-2 text-sm font-medium text-foreground">{outfit.name}</div>
            {isActive && (
              <span className="absolute right-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase text-primary-foreground">
                Selecionada
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
