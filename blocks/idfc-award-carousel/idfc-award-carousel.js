/* eslint-disable */
import Swiper from "../idfc-slider/swiper-bundle.min.js";

export default function decorate(block) {
  block.classList.add('swiper');
  // Create swiper-wrapper
  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  // Create navigation
  const navWrapper = document.createElement('div');
  navWrapper.classList.add('swiper-nav-wrapper');
  
  const prevButton = document.createElement('div');
  prevButton.classList.add('swiper-button-prev');
  prevButton.textContent = "<";
  navWrapper.appendChild(prevButton);

  const nextButton = document.createElement('div');
  nextButton.classList.add('swiper-button-next');
  nextButton.textContent = ">";
  navWrapper.appendChild(nextButton);

  Array.from(block.children).forEach((slide) => {
    slide.classList.add('swiper-slide');
    swiperWrapper.appendChild(slide);
  });
  block.innerHTML = '';
  block.appendChild(swiperWrapper);
  block.appendChild(navWrapper);
  
  Swiper(block, {
    slidesPerView: 'auto',
    watchOverflow: true,
    slideClass: 'swiper-slide',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

}