export default function decorate(block) {
    if (block) {
        // Select all direct child divs inside the block
        const childDivs = block.children;
        // Loop through and add class with index number
        Array.from(childDivs).forEach((div, index) => {
            div.classList.add(`container-index-${index}`);
        });
    }
}