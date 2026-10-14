import { useState } from "preact/hooks";
import { DEFAULT_STYLE, splitText, type PostStyle } from "./post";
import { StyleOptions } from "./StyleOptions";
import { PreviewGallery } from "./PreviewGallery";

export function App() {
  const [text, setText] = useState("");
  const [chunks, setChunks] = useState<string[]>([]);
  const [style, setStyle] = useState<PostStyle>(DEFAULT_STYLE);

  return (
    <div class="container">
      <header class="header">
        <h1>Essay to Instagram</h1>
        <p>Transform your long-form essays into beautiful, shareable Instagram posts</p>
      </header>

      <main class="layout">
        <div class="column">
          <section class="card">
            <h2>Paste Your Essay</h2>
            <textarea
              placeholder="Paste your long-form essay here..."
              value={text}
              onInput={(e) => setText(e.currentTarget.value)}
            />
            <div class="card-footer">
              <button class="button" disabled={!text.trim()} onClick={() => setChunks(splitText(text))}>
                Generate Instagram Posts
              </button>
            </div>
          </section>
          <StyleOptions style={style} onChange={setStyle} />
        </div>
        <div>
          <PreviewGallery chunks={chunks} style={style} />
        </div>
      </main>

      <footer class="footer">
        Created by <a href="https://billmei.net">Bill Mei</a>
      </footer>
    </div>
  );
}
