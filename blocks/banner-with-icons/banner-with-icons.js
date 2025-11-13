export default function decorate(block) {
  block.children[0].classList.add("bannerBg");
  block.children[1].classList.add("content_wrapper");

  block
    .querySelector(".content_wrapper")
    .children[0].classList.add("left_content");
  block
    .querySelector(".content_wrapper")
    .children[1].classList.add("right_image");
  block.querySelector(".left_content").children[0].classList.add("heading");
}
