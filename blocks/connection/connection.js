export default function decorate(block){

    const rowsCollection = block.children;
    const rows = Array.from(rowsCollection);
    console.log(rows);
    rows.forEach((row, index) => {
    let rowClass = `row-${index+1}`
    row.classList.add(rowClass);

    const colsCon = row.children;
    const cols = Array.from(colsCon);
    console.log(cols);
    cols.forEach((col,colIn)=>{
        let colClass = `${rowClass}-col-${colIn+1}`;
        col.classList.add(colClass);
    })
    });
}
