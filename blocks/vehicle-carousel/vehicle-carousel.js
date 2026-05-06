import Swiper from "./swiper.min.js";

export default function decorate(block) {
  const swiperContainer = block.parentElement; // .vehicle-carousel-wrapper

  swiperContainer.classList.add("swiper");
  block.classList.add("swiper-wrapper");

  // Process slides
  [...block.children].forEach((slide) => {
    slide.classList.add("swiper-slide");
    if (slide.children[0])
      slide.children[0].classList.add("vehicle-content-col");
    if (slide.children[1]) slide.children[1].classList.add("vehicle-image-col");
  });

  // Create Navigation Buttons
  const nextBtn = document.createElement("div");
  nextBtn.classList.add("swiper-button-next");

  const prevBtn = document.createElement("div");
  prevBtn.classList.add("swiper-button-prev");

  // Create Pagination
  const paginationEl = document.createElement("div");
  paginationEl.classList.add("swiper-pagination");

  // Append elements
  swiperContainer.appendChild(nextBtn);
  swiperContainer.appendChild(prevBtn);
  swiperContainer.appendChild(paginationEl);

  // Initialize Swiper
  new Swiper(swiperContainer, {
    slidesPerView: 1,
    loop: true,
    pagination: {
      el: paginationEl,
      type: "bullets",
      clickable: true,
    },
    navigation: {
      nextEl: nextBtn,
      prevEl: prevBtn,
    },
  });
}
