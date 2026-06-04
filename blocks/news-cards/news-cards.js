import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * Decorates the news-cards block.
 *
 * xwalk model field rows (container, 1 col each):
 *   rows[0] = heading  (richtext — section H2)
 *   rows[1] = image    (reference — decorative section image)
 *
 * rows[2+] = news-cards-item children (2 cols each):
 *   col 0 = col1_image  (reference — thumbnail picture)
 *   col 1 = col2_text   (richtext  — H3 + excerpt + Read more link)
 */
const MODEL_ROWS = 2;

export default function decorate(block) {
  const rows = [...block.children];
  const fieldRows = rows.slice(0, MODEL_ROWS);
  const cardRows = rows.slice(MODEL_ROWS);

  // ── Section header ──────────────────────────────────────────────────────
  const header = document.createElement('div');
  header.className = 'news-cards-header';

  const headingRow = fieldRows[0];
  if (headingRow) {
    const headingDiv = document.createElement('div');
    headingDiv.className = 'news-cards-heading';
    moveInstrumentation(headingRow, headingDiv);
    while (headingRow.firstElementChild) headingDiv.append(headingRow.firstElementChild);
    headingRow.remove();
    header.append(headingDiv);
  }

  const imageRow = fieldRows[1];
  if (imageRow) {
    const imageDiv = document.createElement('div');
    imageDiv.className = 'news-cards-section-image';
    moveInstrumentation(imageRow, imageDiv);
    while (imageRow.firstElementChild) imageDiv.append(imageRow.firstElementChild);
    imageRow.remove();
    header.append(imageDiv);
  }

  // ── Cards list ──────────────────────────────────────────────────────────
  const ul = document.createElement('ul');
  ul.className = 'news-cards-list';

  cardRows.forEach((row) => {
    const cols = [...row.children];
    const li = document.createElement('li');
    li.className = 'news-cards-item';
    moveInstrumentation(row, li);

    // col 0 → thumbnail picture
    const imageDiv = document.createElement('div');
    imageDiv.className = 'news-cards-image';
    if (cols[0]) {
      while (cols[0].firstElementChild) imageDiv.append(cols[0].firstElementChild);
    }

    // col 1 → richtext body (h3 + p + a)
    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'news-cards-body';
    if (cols[1]) {
      while (cols[1].firstElementChild) bodyDiv.append(cols[1].firstElementChild);
    }

    li.append(imageDiv, bodyDiv);
    row.remove();
    ul.append(li);
  });

  block.textContent = '';
  block.append(header, ul);
}
