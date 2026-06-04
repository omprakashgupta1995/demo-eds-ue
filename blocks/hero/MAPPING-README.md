# MAPPING-README — hero

## Source → EDS mapping

| Source element | Source class / selector | EDS block / field |
|---|---|---|
| `<section class="hero">` | `.hero` | `hero` block |
| H1 heading | `h1` inside hero section | `Text` richtext field (first heading) |
| Subtext paragraph | `p` inside hero section | `Text` richtext field (paragraph) |
| Primary CTA button | `.hero__cta--primary` or first `<a class="button">` | `Primary CTA Label` + `Primary CTA Link` fields |
| Secondary CTA link | `.hero__cta--secondary` or second link | `Secondary CTA Label` + `Secondary CTA Link` fields |
| Hero portrait image | `<img>` inside hero `<picture>` | `Image` reference field |
| Image alt text | `alt` attribute on `<img>` | `Image Alt` text field |
| Quick-links nav | `.hero__quick-links` or `<nav>` below hero | Hero Item children (one per link) |
| Quick-link label | link text | `Link Label` field |
| Quick-link URL | `href` | `Link URL` field |

## EDS authoring table structure

The hero block is authored as a table with the following rows:

| Row | Columns | Content |
|---|---|---|
| 0 | 1 | Image (DAM reference) |
| 1 | 1 | Image Alt (text — auto-applied to `<img alt>`) |
| 2 | 1 | Text (richtext: `<h1>` heading + `<p>` subtext) |
| 3 | 1 | Primary CTA Label |
| 4 | 1 | Primary CTA Link (URL) |
| 5 | 1 | Secondary CTA Label |
| 6 | 1 | Secondary CTA Link (URL) |
| 7 | 2 | Quick-link 1: Label \| URL |
| 8 | 2 | Quick-link 2: Label \| URL |
| … | 2 | (one Hero Item row per quick-link) |

CSS-only decoration elements (not authored):
- `.hero-main` wrapper div — CSS-only
- `.hero-content` wrapper div — CSS-only
- `.hero-image` wrapper div — CSS-only
- `.hero-ctas` wrapper div — CSS-only
- `.hero-quick-links` `<nav>` — built from Hero Item children

## Pages using this block

| Page | URL | Notes |
|---|---|---|
| Homepage | `/content/demo-ue-022/om` | H1 "Built for what matters"; 5 quick-links |

## When to reuse vs create new

- **Reuse** this block for any full-width hero with a heading, subtext, image, and optional CTAs.
- **Add quick-links** by adding Hero Item children to the block in UE.
- **Create new** only if a fundamentally different hero pattern is needed (e.g. video background,
  carousel hero).

## Variant class reference

| Class | Description |
|---|---|
| `hero` | Base block class (always present) |
| No variants currently defined | — |
