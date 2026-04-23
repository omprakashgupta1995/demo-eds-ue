export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  block.classList.add("list-container");

  rows.forEach((row) => {
    row.classList.add("list-item");

    row?.children[0]?.classList.add("list-image-wrapper");
    row?.children[1]?.classList.add("list-content-wrapper");
  });
}
