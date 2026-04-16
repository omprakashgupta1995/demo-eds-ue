/*
 * Accordion Block
 * Recreate an accordion
 * https://www.hlx.live/developer/block-collection/accordion
 */

// export default function decorate(block) {
//   [...block.children].forEach((row) => {
//     // decorate accordion item label
//     const label = row.children[0];
//     const summary = document.createElement('summary');
//     summary.className = 'accordion-item-label';
//     summary.append(...label.childNodes);
//     // decorate accordion item body
//     const body = row.children[1];
//     body.className = 'accordion-item-body';
//     // decorate accordion item
//     const details = document.createElement('details');
//     details.className = 'accordion-item';
//     details.append(summary, body);
//     row.replaceWith(details);
//   });
// }


export default function decorate(block) {
  const items = block.querySelectorAll('.item');

  items.forEach((item) => {
    const label = item.querySelector('.title');
    const body = item.querySelector('.description');

    if (!label || !body) return;

    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    summary.append(...label.childNodes);

    const content = document.createElement('div');
    content.className = 'accordion-item-body';
    content.append(...body.childNodes);

    const details = document.createElement('details');
    details.className = 'accordion-item';

    details.append(summary, content);

    item.replaceWith(details);
  });
}
