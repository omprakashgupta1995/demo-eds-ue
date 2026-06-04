/**
 * Decorates the awards-banner block.
 *
 * xwalk model field rows:
 *   rows[0] = heading      (1 col, richtext — tagline)
 *   rows[1] = col1_linkText | col2_linkUrl  (2 cols — CTA link)
 *
 * MODEL_ROWS = 2; no child items.
 */
const MODEL_ROWS = 2;

export default function decorate(block) {
  const rows = [...block.children];
  const fieldRows = rows.slice(0, MODEL_ROWS);

  // Row 1: col1 = link text, col2 = href
  const ctaCols = [...(fieldRows[1]?.children ?? [])];
  const linkText = ctaCols[0]?.textContent.trim() || '';
  const linkUrl = ctaCols[1]?.textContent.trim() || '#';

  // Remove the raw CTA row — will be rebuilt as <a>
  fieldRows[1]?.remove();

  // Wrap heading content
  const headingRow = fieldRows[0];
  if (headingRow) {
    headingRow.className = 'awards-banner-tagline';
  }

  // Build CTA link
  if (linkText) {
    const cta = document.createElement('p');
    cta.className = 'awards-banner-cta';
    const a = document.createElement('a');
    a.href = linkUrl;
    a.textContent = linkText;
    cta.append(a);
    block.append(cta);
  }
}
