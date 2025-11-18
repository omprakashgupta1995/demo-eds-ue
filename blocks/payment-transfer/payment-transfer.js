export default function decorate(block) {
  // Get all direct children of block
  const items = block.children;

  Array.from(items).forEach((item, index) => {
    // Add a common class to all rows/items
    item.classList.add('pt-item');

    // Add pt-1, pt-2, pt-3 based on index
    item.classList.add(`pt-${index + 1}`);

    // Get inner divs (left + right divs)
    const innerDivs = item.children;

    if (innerDivs[0]) innerDivs[0].classList.add('pt-left-div');
    if (innerDivs[1]) innerDivs[1].classList.add('pt-right-div');
  });
}
