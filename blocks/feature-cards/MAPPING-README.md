# MAPPING-README — feature-cards

## Source → EDS mapping

| Source element | Source class / selector | EDS block / field |
|---|---|---|
| Section container | `.why-choose` or equivalent section | `feature-cards` block |
| Section H2 | `h2` inside section | `Section Heading` richtext field |
| Decorative section image | `<img>` beside H2 | `Section Image` reference field |
| Card container (×3) | `.feature-card` or `.card` li | Feature Cards Item child |
| Card icon image | `<img class="icon">` or small img | `Card Icon` reference field (col1) |
| Card heading | `h3` inside card | Part of `Card Content` richtext (col2) |
| Card body paragraph | `<p>` inside card | Part of `Card Content` richtext (col2) |
| Card CTA link text | link text | `CTA Label` text field (col3) |
| Card CTA href | `href` | `CTA URL` text field (col3) |

## EDS authoring table structure

| Row | Columns | Content |
|---|---|---|
| 0 | 1 | Section Heading (richtext — `<h2>`) |
| 1 | 1 | Section Image (reference) |
| 2 | 3 | Card 1: Icon \| Content (H3 + p) \| CTA Label + CTA URL |
| 3 | 3 | Card 2: Icon \| Content (H3 + p) \| CTA Label + CTA URL |
| 4 | 3 | Card 3: Icon \| Content (H3 + p) \| CTA Label + CTA URL |

CSS-only decoration elements (not authored):
- `.feature-cards-header` wrapper — CSS-only
- `.feature-cards-heading` wrapper — CSS-only
- `.feature-cards-section-image` wrapper — CSS-only
- `.feature-cards-list` `<ul>` — built from child items
- `.feature-cards-item` `<li>` — built from child items
- `.feature-cards-icon` wrapper — CSS-only
- `.feature-cards-text` wrapper — CSS-only

## Pages using this block

| Page | URL | Notes |
|---|---|---|
| Homepage | `/content/demo-ue-022/om` | "Why choose NGS Super?" section; 3 cards |

## When to reuse vs create new

- **Reuse** for any section with a heading + decorative image + grid of icon/heading/body/link cards.
- **Extend** by adding more Feature Cards Item children for additional cards.
- **Create new** only if fundamentally different layout is needed (e.g. horizontal cards, carousel).

## Variant class reference

| Class | Description |
|---|---|
| `feature-cards` | Base block class (always present) |
| No variants currently defined | — |
