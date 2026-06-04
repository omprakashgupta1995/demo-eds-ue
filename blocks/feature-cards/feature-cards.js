import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * Decorates the feature-cards block.
 *
 * xwalk model field rows (container, 1 col each):
 *   rows[0] = heading  (richtext — section H2)
 *   rows[1] = image    (reference — decorative section image)
 *
 * rows[2+] = feature-cards-item children (3 cols each):
 *   col 0 = col1_icon     (reference — card icon picture)
 *   col 1 = col2_text     (richtext  — H3 + paragraph)
 *   col 2 = col3_linkText + col3_linkUrl (2 child elements in same column div)
 *
 * Partition: 1-col rows → container fields; 3-col rows → card items.
 */
const MODEL_ROWS = 2;

export default function decorate(block) {
  const rows = [...block.children];
  const fieldRows = rows.slice(0, MODEL_ROWS);
  const cardRows = rows.slice(MODEL_ROWS);

  // ── Section header ──────────────────────────────────────────────────────
  const header = document.createElement('div');
  header.className = 'feature-cards-header';

  const headingRow = fieldRows[0];
  if (headingRow) {
    const headingDiv = document.createElement('div');
    headingDiv.className = 'feature-cards-heading';
    moveInstrumentation(headingRow, headingDiv);
    while (headingRow.firstElementChild) headingDiv.append(headingRow.firstElementChild);
    headingRow.remove();
    header.append(headingDiv);
  }

  const imageRow = fieldRows[1];
  if (imageRow) {
    const imageDiv = document.createElement('div');
    imageDiv.className = 'feature-cards-section-image';
    moveInstrumentation(imageRow, imageDiv);
    while (imageRow.firstElementChild) imageDiv.append(imageRow.firstElementChild);
    imageRow.remove();
    header.append(imageDiv);
  }

  // ── Cards list ──────────────────────────────────────────────────────────
  const ul = document.createElement('ul');
  ul.className = 'feature-cards-list';

  cardRows.forEach((row) => {
    const cols = [...row.children];
    const li = document.createElement('li');
    li.className = 'feature-cards-item';
    moveInstrumentation(row, li);

    // col 0 → icon picture
    const iconDiv = document.createElement('div');
    iconDiv.className = 'feature-cards-icon';
    if (cols[0]) {
      while (cols[0].firstElementChild) iconDiv.append(cols[0].firstElementChild);
    }

    // col 1 → richtext (h3 + paragraph)
    const textDiv = document.createElement('div');
    textDiv.className = 'feature-cards-text';
    if (cols[1]) {
      while (cols[1].firstElementChild) textDiv.append(cols[1].firstElementChild);
    }

    // col 2 → linkText (first child) + linkUrl (second child)
    const linkText = cols[2]?.children[0]?.textContent.trim() || '';
    const linkUrl = cols[2]?.children[1]?.textContent.trim() || '#';

    li.append(iconDiv, textDiv);

    if (linkText) {
      const a = document.createElement('a');
      a.href = linkUrl;
      a.textContent = linkText;
      a.className = 'feature-cards-link';
      li.append(a);
    }

    row.remove();
    ul.append(li);
  });

  block.textContent = '';
  block.append(header, ul);
}
