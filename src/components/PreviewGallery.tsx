
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import ImagePreview from "./ImagePreview";
import { StyleOptionsType } from "./StyleOptions";
import { downloadImages } from "@/utils/imageGenerator";

interface PreviewGalleryProps {
  chunks: string[];
  style: StyleOptionsType;
}

const PreviewGallery = ({ chunks, style }: PreviewGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? chunks.length - 1 : prev - 1));
  };
  
  const goToNext = () => {
    setCurrentIndex((prev) => (prev === chunks.length - 1 ? 0 : prev + 1));
  };
  
  const handleDownload = async () => {
    const canvas = document.querySelector('.instagram-post canvas') as HTMLCanvasElement;
    if (!canvas) return;
    
    const images: string[] = [];
    
    // We need to convert each preview to an image
    for (let i = 0; i < chunks.length; i++) {
      // This is a simplified approach - in a real app we'd generate all images properly
      setCurrentIndex(i);
      
      // This is a hack to wait for the canvas to update
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = document.querySelector('.instagram-post canvas') as HTMLCanvasElement;
      if (canvas) {
        images.push(canvas.toDataURL('image/png'));
      }
    }
    
    downloadImages(images);
  };
  
  if (chunks.length === 0) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-display">Preview Your Posts</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative w-full max-w-md">
          <ImagePreview 
            text={chunks[currentIndex]} 
            style={style} 
            index={currentIndex}
            total={chunks.length}
          />
          
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={goToPrevious}
              className="rounded-full bg-white shadow-md"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={goToNext}
              className="rounded-full bg-white shadow-md"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-center mt-4 space-x-1">
          {chunks.map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={() => setCurrentIndex(index)}
              className={`w-8 h-8 p-0 ${
                index === currentIndex ? 'bg-primary text-white' : ''
              }`}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          variant="default" 
          onClick={handleDownload}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download All Images
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PreviewGallery;
