export default function decorate(block) {
  let rows = [...block.children];

  // 👉 Remove empty rows (EDS junk)
  rows = rows.filter((row) => {
    return row.textContent.trim() !== '' || row.querySelector('img');
  });

  block.classList.add('product-grid');

  // 👉 Header (first valid row now)
  const header = rows[0];
  if (header) {
    header.classList.add('product-header');

    const tagline = header.children[0];
    const titleWrapper = header.children[1];

    tagline?.classList.add('product-tagline');
    titleWrapper?.classList.add('product-title');

    // CTA is inside title now
    const cta = titleWrapper?.querySelector('div');
    cta?.classList.add('product-cta');
  }

  // 👉 Cards (remaining rows)
  const cards = rows.slice(1);

  cards.forEach((card) => {
    card.classList.add('product-card');

    const imageWrapper = card.children[0];
    const contentWrapper = card.children[1];

    imageWrapper?.classList.add('product-image');
    contentWrapper?.classList.add('product-content');

    const label = contentWrapper?.querySelector('p:first-child');
    const arrow = contentWrapper?.querySelector('.icon');

    label?.classList.add('product-label');
    arrow?.classList.add('product-arrow');

    // 👉 Move arrow to top-right (DOM move, no innerHTML)
    if (arrow && card) {
      card.appendChild(arrow); // move it out
    }
  });
}