# MAPPING-README — awards-banner

## Source → EDS mapping

| Source element | Source class / selector | EDS block / field |
|---|---|---|
| Full-width accent strip | `.awards-banner` or `.award-strip` | `awards-banner` block |
| Tagline text | `<p>` or `<h2>` inside strip | `Tagline` richtext field |
| CTA link text | link text | `CTA Label` text field (col1) |
| CTA href | `href` | `CTA URL` text field (col2) |

## EDS authoring table structure

| Row | Columns | Content |
|---|---|---|
| 0 | 1 | Tagline (richtext — bold paragraph or H2) |
| 1 | 2 | CTA Label \| CTA URL |

CSS-only decoration elements (not authored):
- `.awards-banner-tagline` class added to row 0 by JS
- `.awards-banner-cta` `<p>` wrapper with `<a>` — built from row 1 values
- `→` arrow appended via CSS `::after` pseudo-element

## Pages using this block

| Page | URL | Notes |
|---|---|---|
| Homepage | `/content/demo-ue-022/om` | "Award-winning service" accent strip |

## When to reuse vs create new

- **Reuse** for any full-width dark accent strip with a short tagline + link.
- **Create new** only if the strip requires images, icons, or multiple CTAs.

## Variant class reference

| Class | Description |
|---|---|
| `awards-banner` | Base block class (always present) |
| No variants currently defined | — |
