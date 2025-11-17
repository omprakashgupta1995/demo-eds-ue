export default function decorate(block) {
  // Select the direct child divs inside the block
  const innerDivs = block.querySelectorAll(':scope > div');

  if (innerDivs.length >= 2) {
    innerDivs[0].classList.add('fastag-image');
    innerDivs[1].classList.add('fastag-content');
  }
}
