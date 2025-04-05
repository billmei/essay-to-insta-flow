
import { useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { StyleOptionsType } from "./StyleOptions";

interface ImagePreviewProps {
  text: string;
  style: StyleOptionsType;
  index: number;
  total: number;
}

const ImagePreview = ({ text, style, index, total }: ImagePreviewProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    // Set canvas dimensions (square for Instagram)
    const size = canvas.width; // Should be a square
    
    // Clear canvas
    ctx.clearRect(0, 0, size, size);
    
    // Draw background
    if (style.background.includes('gradient')) {
      // Parse the gradient class name
      const gradientName = style.background.replace('gradient-', '');
      
      // Draw gradient based on the class name
      if (gradientName === 'blue-purple') {
        const gradient = ctx.createLinearGradient(0, 0, size, size);
        gradient.addColorStop(0, '#E5DEFF');
        gradient.addColorStop(1, '#D3E4FD');
        ctx.fillStyle = gradient;
      } else if (gradientName === 'peach-cream') {
        const gradient = ctx.createLinearGradient(0, 0, size, size);
        gradient.addColorStop(0, '#FDE1D3');
        gradient.addColorStop(1, '#FEF7CD');
        ctx.fillStyle = gradient;
      } else if (gradientName === 'green-blue') {
        const gradient = ctx.createLinearGradient(0, 0, size, size);
        gradient.addColorStop(0, '#F2FCE2');
        gradient.addColorStop(1, '#D3E4FD');
        ctx.fillStyle = gradient;
      } else if (gradientName === 'pink-purple') {
        const gradient = ctx.createLinearGradient(0, 0, size, size);
        gradient.addColorStop(0, '#FFDEE2');
        gradient.addColorStop(1, '#E5DEFF');
        ctx.fillStyle = gradient;
      } else {
        // Default white background
        ctx.fillStyle = '#FFFFFF';
      }
    } else {
      // Solid color
      ctx.fillStyle = style.background;
    }
    
    ctx.fillRect(0, 0, size, size);
    
    // Set text properties
    ctx.fillStyle = style.textColor;
    ctx.font = `${style.fontSize} ${style.fontFamily}`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    
    // Calculate padding
    const padding = size * 0.08; // 8% padding
    
    // Draw text with word wrapping
    const fontSize = parseInt(style.fontSize);
    const lineHeight = fontSize * 1.5;
    const maxWidth = size - padding * 2;
    const words = text.split(' ');
    let line = '';
    let y = padding;
    
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      
      if (testWidth > maxWidth && i > 0) {
        ctx.fillText(line, padding, y);
        line = words[i] + ' ';
        y += lineHeight;
        
        // Check if we've exceeded the height
        if (y > size - padding - 30) { // Leave space for the page number
          break;
        }
      } else {
        line = testLine;
      }
    }
    
    // Draw the last line
    ctx.fillText(line, padding, y);
    
    // Add post number and total at the bottom
    ctx.font = `${fontSize * 0.8}px ${style.fontFamily}`;
    ctx.textAlign = 'center';
    ctx.fillText(`${index + 1}/${total}`, size / 2, size - padding / 2);
    
  }, [text, style, index, total]);
  
  // Gradient class for div
  const gradientClass = style.background.startsWith('gradient-') 
    ? style.background 
    : '';

  return (
    <Card className="instagram-post overflow-hidden mx-auto">
      <div 
        className={`w-full h-full ${gradientClass}`}
        style={{
          backgroundColor: style.background.startsWith('gradient-') ? 'transparent' : style.background,
          position: 'relative'
        }}
      >
        <canvas 
          ref={canvasRef} 
          width={500} 
          height={500} 
          className="w-full h-full"
        />
      </div>
    </Card>
  );
};

export default ImagePreview;
