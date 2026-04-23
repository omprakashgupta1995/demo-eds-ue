export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  rows.forEach((row) => {
    row.classList.add('content-text-wrapper');

    const firstElement = row.firstElementChild;
    if (firstElement) {
      firstElement.classList.add('content-text');
    }
  });
}