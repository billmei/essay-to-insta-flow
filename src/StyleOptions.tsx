import { BACKGROUNDS, FONTS, TEXT_COLORS, cssGradient, type PostStyle } from "./post";

interface Props {
  style: PostStyle;
  onChange: (style: PostStyle) => void;
}

export function StyleOptions({ style, onChange }: Props) {
  const update = <K extends keyof PostStyle>(key: K, value: PostStyle[K]) =>
    onChange({ ...style, [key]: value });

  return (
    <section class="card">
      <h2>Style Options</h2>

      <fieldset>
        <legend>Background</legend>
        <div class="options options-2">
          {Object.keys(BACKGROUNDS).map((name) => (
            <label key={name} title={name}>
              <input
                type="radio"
                name="background"
                checked={style.background === name}
                onChange={() => update("background", name)}
              />
              <span class="swatch" style={{ background: cssGradient(name) }} />
            </label>
          ))}
        </div>
      </fieldset>

      <label class="field">
        <span class="field-label">Font Family</span>
        <select value={style.fontFamily} onChange={(e) => update("fontFamily", e.currentTarget.value)}>
          {FONTS.map((font) => (
            <option key={font.value} value={font.value}>
              {font.label}
            </option>
          ))}
        </select>
      </label>

      <label class="field">
        <span class="field-label">
          Font Size <span class="muted">{style.fontSize}</span>
        </span>
        <input
          type="range"
          min={16}
          max={32}
          step={1}
          value={style.fontSize}
          onInput={(e) => update("fontSize", Number(e.currentTarget.value))}
        />
      </label>

      <fieldset>
        <legend>Text Color</legend>
        <div class="options options-3">
          {TEXT_COLORS.map((color) => (
            <label key={color.value}>
              <input
                type="radio"
                name="textColor"
                checked={style.textColor === color.value}
                onChange={() => update("textColor", color.value)}
              />
              {color.label}
            </label>
          ))}
        </div>
      </fieldset>
    </section>
  );
}
