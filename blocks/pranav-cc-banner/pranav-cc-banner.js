export default function decorate(block) {
  const bannerImage = block.children[0].querySelector("picture").parentElement;

  bannerImage.classList.add("banner_image");
}
