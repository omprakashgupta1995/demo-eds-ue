# MAPPING-README — news-cards

## Source → EDS mapping

| Source element | Source class / selector | EDS block / field |
|---|---|---|
| Section container | `.news-section` or equivalent | `news-cards` block |
| Section H2 | `h2` inside section | `Section Heading` richtext field |
| Decorative section image | `<img>` beside H2 | `Section Image` reference field |
| Article card (×3) | `.article-card` or `.news-card` | News Cards Item child |
| Card thumbnail | `<img>` or `<picture>` in card | `Thumbnail` reference field (col1) |
| Article title | `h3` inside card | Part of `Article Content` richtext (col2) |
| Article excerpt | `<p>` inside card | Part of `Article Content` richtext (col2) |
| Read more link | `<a>Read more</a>` | Part of `Article Content` richtext (col2) |

## EDS authoring table structure

| Row | Columns | Content |
|---|---|---|
| 0 | 1 | Section Heading (richtext — `<h2>`) |
| 1 | 1 | Section Image (reference) |
| 2 | 2 | Card 1: Thumbnail \| Article Content (H3 + p + a) |
| 3 | 2 | Card 2: Thumbnail \| Article Content |
| 4 | 2 | Card 3: Thumbnail \| Article Content |

CSS-only decoration elements (not authored):
- `.news-cards-header` wrapper — CSS-only
- `.news-cards-heading` wrapper — CSS-only
- `.news-cards-section-image` wrapper — CSS-only
- `.news-cards-list` `<ul>` — built from child items
- `.news-cards-item` `<li>` — built from child items
- `.news-cards-image` wrapper — CSS-only
- `.news-cards-body` wrapper — CSS-only

## Pages using this block

| Page | URL | Notes |
|---|---|---|
| Homepage | `/content/demo-ue-022/om` | "News and insights" section; 3 article cards |

## When to reuse vs create new

- **Reuse** for any section with a heading + image header and a grid of article/news cards.
- **Extend** by adding more News Cards Item children for additional articles.
- **Create new** only if a fundamentally different card layout is needed (e.g. horizontal cards,
  video thumbnails).

## Variant class reference

| Class | Description |
|---|---|
| `news-cards` | Base block class (always present) |
| No variants currently defined | — |
