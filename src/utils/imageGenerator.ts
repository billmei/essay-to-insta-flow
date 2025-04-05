
/**
 * Converts a text chunk into an image for Instagram
 */
export const textToImage = async (
  text: string,
  style: {
    background: string;
    fontFamily: string;
    fontSize: string;
    textColor: string;
  },
  size: number = 1080 // Instagram recommended size
): Promise<string> => {
  // Create a canvas element
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Canvas context not available');
  }
  
  // Set canvas dimensions (square for Instagram)
  canvas.width = size;
  canvas.height = size;
  
  // Draw background (could be a gradient or solid color)
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
  
  // Split text into lines and draw on canvas
  const lineHeight = parseInt(style.fontSize) * 1.5;
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
      if (y > size - padding) {
        break;
      }
    } else {
      line = testLine;
    }
  }
  
  // Draw the last line
  ctx.fillText(line, padding, y);
  
  // Add post number and total (e.g., 1/5) at the bottom
  // Note: In the real implementation, we'd need to know the index and total
  
  // Convert canvas to image
  return canvas.toDataURL('image/png');
};

/**
 * Generates all images for a multi-post Instagram series
 */
export const generateImages = async (
  chunks: string[],
  style: {
    background: string;
    fontFamily: string;
    fontSize: string;
    textColor: string;
  }
): Promise<string[]> => {
  const images: string[] = [];
  
  for (let i = 0; i < chunks.length; i++) {
    const image = await textToImage(
      chunks[i],
      style
    );
    images.push(image);
  }
  
  return images;
};

/**
 * Downloads all images for Instagram posting
 */
export const downloadImages = (images: string[]): void => {
  images.forEach((image, index) => {
    const link = document.createElement('a');
    link.download = `instagram-post-${index + 1}.png`;
    link.href = image;
    link.click();
  });
};
