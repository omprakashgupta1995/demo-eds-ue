export default function decorate(block){
    const childDivs = block.children;
        
        // Loop through and add class with index number
        Array.from(childDivs).forEach((div, index) => {
            div.classList.add(`div-index-${index}`);
        });
}