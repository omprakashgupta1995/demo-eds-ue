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


//   let pointDiv =  document.createElement("div");

//   pointDiv.classList.add("point")



  Array.from(block.querySelector(".left_content").children).forEach(
    (child, i) => {
      if (i > 0) {
        child.classList.add("point_content");
      }
    }
  );
}
