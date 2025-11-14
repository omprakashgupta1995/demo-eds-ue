import { div } from "../../scripts/dom-helpers.js";
import Swiper from "../../scripts/swiper-bundle.min.js";

export default function decorate(block) {
  const swiperWrapper = div(
    { class: "swiper" },
    div(
      { class: "swiper-wrapper" },
      ...Array.from(block.children).map((slides) => {
        slides.classList.add("swiper-slide");
        return slides;
      })
    )
  );

  block.appendChild(swiperWrapper);

  block.appendChild(div({ class: "swiper-pagination" }));

  const mySwiper = Swiper(".swiper", {
    loop: true,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
    },
  });
}
