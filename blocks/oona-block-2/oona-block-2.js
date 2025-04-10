export default function decorate(block) {
  const outerdiv = block.children;
  // console.log(outerdiv);

  Array.from(outerdiv).forEach((row, rowIndex) => {
    const rowClass = `block-2-row-${rowIndex + 1}`;
    row.classList.add(rowClass);

    const colClass = row.children;
    Array.from(colClass).forEach((col, colIndex) => {
      const colClasses = `${rowClass}-col-${colIndex + 1}`;
      col.classList.add(colClasses);
    });
  });
}
