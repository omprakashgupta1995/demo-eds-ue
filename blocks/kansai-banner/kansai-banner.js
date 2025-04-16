export default function decorate(block) {
  // Find the elements inside the block
  const h2 = block.querySelector('h2');
  const firstP = h2?.nextElementSibling;
  const secondP = firstP?.nextElementSibling;

  if (h2 && firstP && secondP) {
    // Create a new div to wrap the text elements
    const textWrapper = document.createElement('div');
    textWrapper.classList.add('kansai-banner__textContainer');

    // Move the elements into the wrapper
    textWrapper.appendChild(h2);
    textWrapper.appendChild(firstP);
    textWrapper.appendChild(secondP);

    // Insert the wrapper at the beginning of the block
    block.firstElementChild.firstElementChild.insertBefore(
      textWrapper,
      block.firstElementChild.firstElementChild.firstChild
    );
  }
}
