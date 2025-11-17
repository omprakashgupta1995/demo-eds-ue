export default function decorate(block) {
  // Select the 3 main divs inside .product-cards.block
  const cards = block.querySelectorAll(':scope > div');

  cards.forEach((card) => {
    card.classList.add('product-card'); // main wrapper

    // Get inner divs: 1 = image, 2 = text
    const innerDivs = card.querySelectorAll(':scope > div');

    if (innerDivs[0]) {
      innerDivs[0].classList.add('img-div');
    }

    if (innerDivs[1]) {
      innerDivs[1].classList.add('text-div');
    }
  });
}
