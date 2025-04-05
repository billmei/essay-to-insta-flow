/**
 * Splits a long text into chunks that will fit in Instagram posts
 * Each Instagram post has a maximum character count per image
 */
export const splitTextIntoChunks = (
  text: string,
  maxCharsPerPost: number = 280,
  preserveParagraphs: boolean = true
): string[] => {
  // If preserve paragraphs is true, we try to keep paragraphs together
  if (preserveParagraphs) {
    const paragraphs = text.split(/\n\s*\n/); // Split on empty lines
    const chunks: string[] = [];
    let currentChunk = "";

    for (const paragraph of paragraphs) {
      // If adding this paragraph would exceed the limit, start a new chunk
      if (currentChunk.length + paragraph.length > maxCharsPerPost && currentChunk.length > 0) {
        chunks.push(currentChunk.trim());
        currentChunk = paragraph;
      } else {
        // Otherwise, add it to the current chunk
        currentChunk += (currentChunk ? "\n\n" : "") + paragraph;
      }
      
      // If the single paragraph is too long, we need to split it
      if (paragraph.length > maxCharsPerPost) {
        const words = paragraph.split(/\s+/);
        let wordChunk = "";
        
        for (const word of words) {
          if (wordChunk.length + word.length + 1 > maxCharsPerPost) {
            chunks.push(wordChunk.trim());
            wordChunk = word;
          } else {
            wordChunk += (wordChunk ? " " : "") + word;
          }
        }
        
        if (wordChunk.length > 0) {
          chunks.push(wordChunk.trim());
        }
        
        currentChunk = "";
      }
    }

    // Don't forget the last chunk
    if (currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
    }

    return chunks;
  } else {
    // Simple splitting without preserving paragraphs
    const words = text.split(/\s+/);
    const chunks: string[] = [];
    let currentChunk = "";

    for (const word of words) {
      if (currentChunk.length + word.length + 1 > maxCharsPerPost) {
        chunks.push(currentChunk.trim());
        currentChunk = word;
      } else {
        currentChunk += (currentChunk ? " " : "") + word;
      }
    }

    // Don't forget the last chunk
    if (currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
    }

    return chunks;
  }
};

/**
 * Estimates the number of characters that can fit in an Instagram post
 * based on the font size and container dimensions
 */
export const estimateMaxCharsPerPost = (
  fontSize: number,
  containerWidth: number,
  containerHeight: number,
  padding: number = 40
): number => {
  // This is a rough estimation
  const availableWidth = containerWidth - padding * 2;
  const availableHeight = containerHeight - padding * 2;
  
  // Estimate chars per line (assume average char width is fontSize * 0.6)
  const charsPerLine = Math.floor(availableWidth / (fontSize * 0.6));
  
  // Estimate number of lines
  const lineHeight = fontSize * 1.5; // Typical line height
  const maxLines = Math.floor(availableHeight / lineHeight);
  
  return charsPerLine * maxLines;
};
