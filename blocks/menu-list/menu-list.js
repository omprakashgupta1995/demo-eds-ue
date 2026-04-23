export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  rows.forEach((row) => {
    row.classList.add('menu-list-item');

    const cols = [...row.children];

    // First column → image
    if (cols[0]) {
      cols[0].classList.add('menu-image-wrapper');
    }

    // Second column → content
    if (cols[1]) {
      cols[1].classList.add('menu-content-wrapper');
    }

    // Optional: guard against unexpected structure
    if (cols.length < 2) {
      console.warn('Menu block: row has less than 2 columns', row);
    }
  });
}