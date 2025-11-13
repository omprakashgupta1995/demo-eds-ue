export default function decorate(block) {
  block.children[0].classList.add("bannerBg");
  block.children[1].classList.add("content_wrapper");

  block
    .querySelector(".content_wrapper")
    .children[0].classList.add("heading");
  block
    .querySelector(".content_wrapper")
    .children[1].classList.add("left_content");
  block
    .querySelector(".content_wrapper")
    .children[2].classList.add("right_image");
}
