import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * Decorates the hero block.
 *
 * xwalk model field rows (imageAlt does not produce its own row):
 *   rows[0] = image           (1 col, reference → <picture>)
 *   rows[1] = text            (1 col, richtext  → <h1> + <p>)
 *   rows[2] = col1_primaryCtaText | col2_primaryCtaLink   (2 cols)
 *   rows[3] = col1_secondaryCtaText | col2_secondaryCtaLink (2 cols)
 *
 * rows[4+] = hero-item children (2 cols each): linkLabel | linkUrl
 *
 * NOTE: Because CTA rows also have 2 cols, we cannot use col-count to split
 * field rows from child items. Use a fixed MODEL_ROWS slice instead.
 */
const MODEL_ROWS = 4;

export default function decorate(block) {
  const rows = [...block.children];
  const fieldRows = rows.slice(0, MODEL_ROWS);
  const linkRows = rows.slice(MODEL_ROWS);

  // Row 2: col1 = label, col2 = href
  const primaryCols = [...(fieldRows[2]?.children ?? [])];
  const primaryLabel = primaryCols[0]?.textContent.trim() || '';
  const primaryHref = primaryCols[1]?.textContent.trim() || '#';

  // Row 3: col1 = label, col2 = href
  const secondaryCols = [...(fieldRows[3]?.children ?? [])];
  const secondaryLabel = secondaryCols[0]?.textContent.trim() || '';
  const secondaryHref = secondaryCols[1]?.textContent.trim() || '#';

  // Build main wrapper
  const heroMain = document.createElement('div');
  heroMain.className = 'hero-main';

  // ── Content side ──────────────────────────────────────────────────────────
  const contentDiv = document.createElement('div');
  contentDiv.className = 'hero-content';

  const textRow = fieldRows[1];
  if (textRow) {
    moveInstrumentation(textRow, contentDiv);
    while (textRow.firstElementChild) contentDiv.append(textRow.firstElementChild);
    textRow.remove();
  }

  if (primaryLabel || secondaryLabel) {
    const ctaDiv = document.createElement('div');
    ctaDiv.className = 'hero-ctas';
    if (primaryLabel) {
      const primaryA = document.createElement('a');
      primaryA.href = primaryHref;
      primaryA.textContent = primaryLabel;
      primaryA.className = 'button';
      ctaDiv.append(primaryA);
    }
    if (secondaryLabel) {
      const secondaryA = document.createElement('a');
      secondaryA.href = secondaryHref;
      secondaryA.textContent = secondaryLabel;
      secondaryA.className = 'hero-secondary-cta';
      ctaDiv.append(secondaryA);
    }
    contentDiv.append(ctaDiv);
  }

  // Remove CTA field rows — values already extracted above
  fieldRows.slice(2).forEach((r) => r.remove());

  // ── Image side ────────────────────────────────────────────────────────────
  const imageDiv = document.createElement('div');
  imageDiv.className = 'hero-image';

  const imageRow = fieldRows[0];
  if (imageRow) {
    moveInstrumentation(imageRow, imageDiv);
    while (imageRow.firstElementChild) imageDiv.append(imageRow.firstElementChild);
    imageRow.remove();
  }

  heroMain.append(contentDiv, imageDiv);
  block.textContent = '';
  block.append(heroMain);

  // ── Quick-links bar ───────────────────────────────────────────────────────
  if (linkRows.length) {
    const nav = document.createElement('nav');
    nav.className = 'hero-quick-links';
    nav.setAttribute('aria-label', 'Quick links');
    linkRows.forEach((row) => {
      const cols = [...row.children];
      const label = cols[0]?.textContent.trim() || '';
      const href = cols[1]?.textContent.trim() || '#';
      if (label) {
        const a = document.createElement('a');
        a.href = href;
        a.textContent = label;
        nav.append(a);
      }
      row.remove();
    });
    block.append(nav);
  }
}
