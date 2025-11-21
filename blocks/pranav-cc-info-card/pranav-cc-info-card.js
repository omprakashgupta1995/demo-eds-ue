export default function decorate(block) {
  block.children[0].classList.add("cc-info-card-image");
  block.children[1].classList.add("cc-info-card-content");
  block.children[2].classList.add("cc-info-card-button");
}
