/*
 * Accordion Block
 * Recreate an accordion
 */

export default function decorate(block) {
  if (!block) return;

  // Skip in author mode
  if (window.location.href.includes('/author')) return;

  [...block.children].forEach((row) => {
    if (row.children.length < 2) return;

    // label
    const label = row.children[0];
    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    summary.append(...label.childNodes);

    // body
    const body = row.children[1];
    body.className = 'accordion-item-body';

    // wrapper
    const details = document.createElement('details');
    details.className = 'accordion-item';
    details.append(summary, body);

    row.replaceWith(details);
  });
}