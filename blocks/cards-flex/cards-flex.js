export default function decorate(block) {
  const outerdiv = block.children;
  // console.log(outerdiv);

  // Loop through each row and apply a common class for all rows
  Array.from(outerdiv).forEach((row) => {
    row.classList.add('common-row'); // Apply the same class to every row

    const colClass = row.children;
    Array.from(colClass).forEach((col, colIndex) => {
      if (colIndex === 0) {
        col.classList.add('image-col');
      } else if (colIndex === 1) {
        col.classList.add('title-col');
      } else if (colIndex === 2) {
        col.classList.add('description-col');
      }
    });
  });
}
