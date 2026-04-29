export default function decorate(block) {
  const imageContainer = block.querySelector('picture');
  const textContainer = block.querySelector('p');

  if (imageContainer) {
    imageContainer.classList.add('card-image');
  }

  if (textContainer) {
    textContainer.classList.add('card-text');
  }
}
