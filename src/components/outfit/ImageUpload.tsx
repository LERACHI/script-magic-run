import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

interface ImageUploadProps {
  onImageChange: (file: File | null) => void;
  preview: string;
  label: string;
  inputId?: string;
}

export const ImageUpload = ({ onImageChange, preview, label, inputId }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const safeId =
    inputId || `file-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Math.abs(label.length)}`;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
  };

  const handleRemove = () => {
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id={safeId}
      />
      
      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-64 object-cover rounded-lg border-2 border-border"
          />
          <Button
            onClick={handleRemove}
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <label
          htmlFor={safeId}
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors bg-background/50"
        >
          <Upload className="w-12 h-12 text-muted-foreground mb-2" />
          <span className="text-sm text-muted-foreground">{label}</span>
        </label>
      )}
    </div>
  );
};
