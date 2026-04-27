import Swiper from "./swiper.min.js";

export default function decorate(block) {
  const swiperContainer = block.parentElement;
  swiperContainer.classList.add("swiper");
  block.classList.add("swiper-wrapper");

  const paginationEl = document.createElement("div");
  paginationEl.classList.add("swiper-pagination", "hero-pagination");

  const thumbnailsContainer = document.createElement("div");
  thumbnailsContainer.classList.add("hero-thumbnails-container");

  const slides = [...block.children];
  slides.forEach((slide, index) => {
    slide.classList.add("swiper-slide");

    const col1 = slide.children[0];
    const col2 = slide.children[1];

    col1.classList.add("hero-bg-col");
    if (col2) col2.classList.add("hero-content-col");

    // 1. Identify media inside the background column
    const videoLink = col1.querySelector('a[href$=".mp4"]');
    const pictures = col1.querySelectorAll("picture");

    let bgMedia;
    let thumbMedia;

    if (videoLink) {
      // It's a video background
      bgMedia = document.createElement("video");
      bgMedia.src = videoLink.href;
      bgMedia.autoplay = true;
      bgMedia.loop = true;
      bgMedia.muted = true;
      bgMedia.playsInline = true;

      // If there's a picture alongside the video, it's the thumbnail
      if (pictures.length > 0) thumbMedia = pictures[0];
    } else {
      // It's an image background
      if (pictures.length > 0) bgMedia = pictures[0];
      // If there's a second picture, it's the thumbnail
      if (pictures.length > 1) thumbMedia = pictures[1];
    }

    // 2. Move thumbnail out of the slide and into the right-bottom container
    if (thumbMedia) {
      const thumbBtn = document.createElement("button");
      thumbBtn.className = `hero-thumb-btn ${index === 0 ? "active" : ""}`;
      thumbBtn.appendChild(thumbMedia); // Moves the picture
      thumbnailsContainer.appendChild(thumbBtn);
    }

    // 3. Clean up the background column so it ONLY contains the video/image
    col1.innerHTML = "";
    if (bgMedia) col1.appendChild(bgMedia);
  });

  swiperContainer.appendChild(paginationEl);
  swiperContainer.appendChild(thumbnailsContainer);

  const heroSwiper = new Swiper(swiperContainer, {
    slidesPerView: 1,
    loop: false,
    pagination: {
      el: paginationEl,
      type: "fraction",
    },
    on: {
      slideChange: function () {
        const allThumbBtns =
          thumbnailsContainer.querySelectorAll(".hero-thumb-btn");
        allThumbBtns.forEach((btn, i) => {
          btn.classList.toggle("active", i === this.activeIndex);
        });
      },
    },
  });

  const allThumbBtns = thumbnailsContainer.querySelectorAll(".hero-thumb-btn");
  allThumbBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      heroSwiper.slideTo(index);
    });
  });
}
