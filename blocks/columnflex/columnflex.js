export default function decorate(block) {
    const rowsCollection = block.children; // Get the child rows of the block
    const rows = Array.from(rowsCollection); // Convert rowsCollection (HTMLCollection) into an array
  
    rows.forEach((row, index) => {
      // For each row, create a class with the format 'row-{index+1}' and add it to the row
      let rowClass = `row-${index + 1}`;
      row.classList.add(rowClass); // Add the class to the row
  
      const colsCon = row.children; // Get the columns inside the row
      const cols = Array.from(colsCon); // Convert columns into an array
  
      cols.forEach((col, colIn) => {
        // For each column, create a class with the format 'row-{index+1}-col-{colIn+1}' and add it to the column
        let colClass = `${rowClass}-col-${colIn + 1}`;
        col.classList.add(colClass); // Add the class to the column
      });
    });
    
    let columnFlexContainer = document.querySelector('.columnflex-container')
    // console.log('Akash',columnFlexContainer);
    let childrenDivClassName = columnFlexContainer.children[1];
    childrenDivClassName.classList.add('connect');


    let columnFlexContainer2 = document.querySelector('.columnflex-container')
    // console.log('Akash',columnFlexContainer);
    let childrenDivClassName2 = columnFlexContainer2.children[0];
    childrenDivClassName2.classList.add('connect1');
    
  }
  