export default function decorate(block) {
  const rows = [...block.children];

  // First row = heading
  if (rows.length > 0) {
    rows[0].classList.add('card-v3-heading');
  }

  // Rest = cards
  rows.slice(1).forEach((row) => {
    row.classList.add('card-v3-item');

    const cols = [...row.children];

    if (cols[0]) cols[0].classList.add('card-v3-icon');
    if (cols[1]) cols[1].classList.add('card-v3-text');
  });
}