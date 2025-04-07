export default function decorate(block){
    let outerdiv = block.children;
    console.log(outerdiv);

    Array.from(outerdiv).forEach((row, rowIndex) => {
        let rowClass = `block-1-row-${rowIndex + 1}`;
        row.classList.add(rowClass);

        let colClass = row.children;
        Array.from(colClass).forEach((col, colIndex) => {
            let colClasses = `block-1-${rowClass}-col-${colIndex + 1}`;
            col.classList.add(colClasses);
        })
    })
}