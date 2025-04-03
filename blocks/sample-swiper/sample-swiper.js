import Swiper from "./swiper-bundle.min.js";
export default function decorate(block) {
  block.classList.add("swiper");
  const swiperWrapper = document.createElement("div");
  swiperWrapper.classList.add("swiper-wrapper");
  Array.from(block.children).forEach(function (row) {
    row.classList.add("swiper-slide");
    swiperWrapper.appendChild(row);
  });
  block.appendChild(swiperWrapper);
  Swiper(block, {
    autoplay: true,
  });
}
