
import { useState } from "react";
import TextInput from "@/components/TextInput";
import StyleOptions, { StyleOptionsType } from "@/components/StyleOptions";
import PreviewGallery from "@/components/PreviewGallery";

const Index = () => {
  const [chunks, setChunks] = useState<string[]>([]);
  const [style, setStyle] = useState<StyleOptionsType>({
    background: "gradient-blue-purple",
    fontFamily: "Playfair Display, serif",
    fontSize: "24px",
    textColor: "#000000",
  });

  const handleTextProcessed = (processedChunks: string[]) => {
    setChunks(processedChunks);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-6xl mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-display font-bold mb-3 animate-fade-in">
            Essay to Instagram
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-in">
            Transform your long-form essays into beautiful, shareable Instagram posts
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <TextInput onTextProcessed={handleTextProcessed} />
            <StyleOptions style={style} onStyleChange={setStyle} />
          </div>
          <div>
            <PreviewGallery chunks={chunks} style={style} />
          </div>
        </div>
        
        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>Created with ❤️ for Instagram content creators</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
