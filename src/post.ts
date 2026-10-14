export const POST_SIZE = 500;
export const MAX_CHARS_PER_POST = 300;

// Diagonal gradients, top-left to bottom-right. Solid colours use the same stop twice.
export const BACKGROUNDS: Record<string, [string, string]> = {
  "blue-purple": ["#E5DEFF", "#D3E4FD"],
  "peach-cream": ["#FDE1D3", "#FEF7CD"],
  "green-blue": ["#F2FCE2", "#D3E4FD"],
  "pink-purple": ["#FFDEE2", "#E5DEFF"],
  white: ["#FFFFFF", "#FFFFFF"],
  black: ["#000000", "#000000"],
};

export const FONTS = [
  { label: "Sans-serif", value: "Inter, sans-serif" },
  { label: "Serif", value: "Georgia, serif" },
  { label: "Display", value: "Playfair Display, serif" },
  { label: "Monospace", value: "monospace" },
];

export const TEXT_COLORS = [
  { label: "Black", value: "#000000" },
  { label: "White", value: "#FFFFFF" },
  { label: "Gray", value: "#333333" },
  { label: "Purple", value: "#6E59A5" },
  { label: "Blue", value: "#1EAEDB" },
];

export interface PostStyle {
  background: string; // a key of BACKGROUNDS
  fontFamily: string;
  fontSize: number;
  textColor: string;
}

export const DEFAULT_STYLE: PostStyle = {
  background: "blue-purple",
  fontFamily: "Playfair Display, serif",
  fontSize: 24,
  textColor: "#000000",
};

export const cssGradient = (background: string) => {
  const [from, to] = BACKGROUNDS[background];
  return `linear-gradient(135deg, ${from} 0%, ${to} 100%)`;
};

/** Splits text into post-sized chunks, keeping paragraphs together where possible. */
export function splitText(text: string, maxChars = MAX_CHARS_PER_POST): string[] {
  const chunks: string[] = [];
  let current = "";

  for (const paragraph of text.split(/\n\s*\n/)) {
    if (current.length + paragraph.length > maxChars && current.length > 0) {
      chunks.push(current.trim());
      current = paragraph;
    } else {
      current += (current ? "\n\n" : "") + paragraph;
    }

    // A single paragraph that is too long gets split on word boundaries.
    if (paragraph.length > maxChars) {
      let words = "";
      for (const word of paragraph.split(/\s+/)) {
        if (words.length + word.length + 1 > maxChars) {
          chunks.push(words.trim());
          words = word;
        } else {
          words += (words ? " " : "") + word;
        }
      }
      if (words.length > 0) chunks.push(words.trim());
      current = "";
    }
  }

  if (current.length > 0) chunks.push(current.trim());
  return chunks;
}

/** Draws one post (background, word-wrapped text and an "n/total" footer) onto a square canvas. */
export function drawPost(
  canvas: HTMLCanvasElement,
  text: string,
  style: PostStyle,
  index: number,
  total: number,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const size = canvas.width;
  const [from, to] = BACKGROUNDS[style.background];
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, from);
  gradient.addColorStop(1, to);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  ctx.fillStyle = style.textColor;
  ctx.font = `${style.fontSize}px ${style.fontFamily}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  const padding = size * 0.08;
  const lineHeight = style.fontSize * 1.5;
  const maxWidth = size - padding * 2;
  const words = text.split(" ");
  let line = "";
  let y = padding;

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + " ";
    if (ctx.measureText(testLine).width > maxWidth && i > 0) {
      ctx.fillText(line, padding, y);
      line = words[i] + " ";
      y += lineHeight;
      if (y > size - padding - 30) break; // leave room for the page number
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, padding, y);

  ctx.font = `${style.fontSize * 0.8}px ${style.fontFamily}`;
  ctx.textAlign = "center";
  ctx.fillText(`${index + 1}/${total}`, size / 2, size - padding / 2);
}

/** Renders every chunk to a PNG and downloads them as instagram-post-N.png. */
export function downloadPosts(chunks: string[], style: PostStyle) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = POST_SIZE;
  chunks.forEach((text, i) => {
    drawPost(canvas, text, style, i, chunks.length);
    const link = document.createElement("a");
    link.download = `instagram-post-${i + 1}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}
