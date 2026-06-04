# MAPPING-README — columns

## Source → EDS mapping

| Source element | Source class / selector | EDS block / field |
|---|---|---|
| 2-column section wrapper | `.columns` or `.two-col` | `columns` block |
| Left image | `<img>` or `<picture>` in first col | `image` child component (auto-detected as `columns-img-col`) |
| Right heading | `h2` or `h3` in second col | `title` child component |
| Right body text | `<p>` in second col | `text` child component |
| Right CTA button | `<a class="button">` | `button` child component |
| Right secondary link | second `<a>` or `<a class="secondary">` | `button` child component with secondary style |

## EDS authoring table structure (adviser-promo variant)

| Column | Content |
|---|---|
| Col 0 | `image` component — NGS Virtual Adviser screenshot |
| Col 1 | `title` (H2/H3) + `text` (body paragraph) + `button` (primary CTA) + `button` (secondary link) |

Block authored as: **`Columns (adviser-promo)`**

CSS-only decoration elements (not authored):
- `.columns-img-col` class — added by `columns.js` when a column contains only a picture
- `.button-container` wrapper — rendered by EDS button processing

## Pages using this block

| Page | URL | Variant | Notes |
|---|---|---|---|
| Homepage | `/content/demo-ue-022/om` | `adviser-promo` | "NGS Virtual Adviser" promo section |

## When to reuse vs create new

- **Reuse** for any side-by-side two-column layout (image + text, text + text).
- **Add variant** via CSS modifier class for visual variations — do NOT create a new block.
- **Create new** only if a fundamentally different layout is required (e.g. 3+ columns with
  complex interactions).

## Variant class reference

| Class | Description |
|---|---|
| `columns` | Base block class (always present) |
| `adviser-promo` | NGS Virtual Adviser promo: blue bg, rounded image, branded CTAs |
