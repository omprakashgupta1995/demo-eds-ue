export default function decorate(block) {
  // Select all direct child divs inside the block
  const innerDivs = block.querySelectorAll(':scope > div > div');

  if (innerDivs.length >= 1) {
    innerDivs[0].classList.add('piramal-banner-content');
  }

  if (innerDivs.length >= 2) {
    innerDivs[1].classList.add('piramal-banner-image');
  }
}
