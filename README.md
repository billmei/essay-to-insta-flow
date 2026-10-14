# Essay to Instagram

Paste an essay and turn it into a series of square images for posting to Instagram.

**Live:** https://billmei.github.io/essay-to-insta-flow/

The text is split into ~300-character chunks (keeping paragraphs together where possible), drawn onto canvases with your choice of background, font, size and colour, and downloaded as `instagram-post-N.png`. Everything runs in the browser.

## Development

Requires [Bun](https://bun.sh).

```sh
bun install
bun run dev      # start a dev server
bun run build    # type-check and build to dist/
bun run preview  # serve the production build
```

Built with [Preact](https://preactjs.com), [Vite](https://vite.dev) and TypeScript. There are no other dependencies.

| File | Purpose |
| --- | --- |
| `src/App.tsx` | Page layout and essay input |
| `src/StyleOptions.tsx` | Background, font and colour controls |
| `src/PreviewGallery.tsx` | Post preview, pagination and download |
| `src/post.ts` | Style presets, text splitting and canvas rendering |
| `src/style.css` | All styles |

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site with Bun and publishes `dist/` to GitHub Pages. In the repository settings, **Pages → Source** must be set to **GitHub Actions**.

The site is served from `/essay-to-insta-flow/`; if the repository is renamed, update `base` in `vite.config.ts`.
