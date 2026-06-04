/**
 * Decorates the cta-banner block.
 *
 * xwalk model field rows:
 *   rows[0] = heading          (1 col, richtext — H2 tagline)
 *   rows[1] = col1_ctaText | col2_ctaUrl  (2 cols — button label + URL)
 *
 * MODEL_ROWS = 2; no child items.
 */
const MODEL_ROWS = 2;

export default function decorate(block) {
  const rows = [...block.children];
  const fieldRows = rows.slice(0, MODEL_ROWS);

  // Row 1: col1 = button text, col2 = href
  const ctaCols = [...(fieldRows[1]?.children ?? [])];
  const ctaText = ctaCols[0]?.textContent.trim() || '';
  const ctaUrl = ctaCols[1]?.textContent.trim() || '#';

  // Remove the raw CTA row — rebuilt as <a class="button">
  fieldRows[1]?.remove();

  // Wrap heading
  const headingRow = fieldRows[0];
  if (headingRow) {
    headingRow.className = 'cta-banner-heading';
  }

  // Build CTA button
  if (ctaText) {
    const p = document.createElement('p');
    p.className = 'cta-banner-cta';
    const a = document.createElement('a');
    a.href = ctaUrl;
    a.textContent = ctaText;
    a.className = 'button';
    p.append(a);
    block.append(p);
  }
}
