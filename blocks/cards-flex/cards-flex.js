export default function decorate(block) {
    let outerdiv = block.children;
    console.log(outerdiv);

    // Loop through each row and apply a common class for all rows
    Array.from(outerdiv).forEach((row) => {
        row.classList.add('common-row'); // Apply the same class to every row

        // Loop through each column in the row and add column names as "image", "title", or "description"
        let colClass = row.children;
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
