export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;
  rows.forEach((row) => {
    row.classList.add('menu-list-item');
    row?.children[0]?.classList.add('menu-image-wrapper');
    row?.children[1]?.classList.add('menu-content-wrapper');
  });
}
