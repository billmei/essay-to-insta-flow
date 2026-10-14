import { useEffect, useRef, useState } from "preact/hooks";
import { POST_SIZE, downloadPosts, drawPost, type PostStyle } from "./post";

interface Props {
  chunks: string[];
  style: PostStyle;
}

export function PreviewGallery({ chunks, style }: Props) {
  const [current, setCurrent] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const index = Math.min(current, chunks.length - 1);

  useEffect(() => {
    if (canvasRef.current && chunks.length > 0) {
      drawPost(canvasRef.current, chunks[index], style, index, chunks.length);
    }
  }, [chunks, style, index]);

  if (chunks.length === 0) return null;

  const go = (step: number) => setCurrent((index + step + chunks.length) % chunks.length);

  return (
    <section class="card">
      <h2>Preview Your Posts</h2>
      <div class="preview">
        <div class="post-frame">
          <canvas ref={canvasRef} width={POST_SIZE} height={POST_SIZE} />
        </div>
        <button class="nav nav-prev" aria-label="Previous post" onClick={() => go(-1)}>
          <Icon d="m15 18-6-6 6-6" />
        </button>
        <button class="nav nav-next" aria-label="Next post" onClick={() => go(1)}>
          <Icon d="m9 18 6-6-6-6" />
        </button>
      </div>

      <div class="pages">
        {chunks.map((_, i) => (
          <button key={i} class={i === index ? "page active" : "page"} onClick={() => setCurrent(i)}>
            {i + 1}
          </button>
        ))}
      </div>

      <div class="card-footer">
        <button class="button" onClick={() => downloadPosts(chunks, style)}>
          <Icon d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
          Download All Images
        </button>
      </div>
    </section>
  );
}

// Stroke icons in the style of lucide.dev
function Icon({ d }: { d: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}
