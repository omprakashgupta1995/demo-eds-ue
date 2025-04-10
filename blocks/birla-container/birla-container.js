import Swiper1 from './swipper-bundle.min.js';

export default function decorate(block) {
  block.classList.add('swiper');
  // Create the swiper wrapper
  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  // Wrap all children in swiper-slide
  Array.from(block.children).forEach((row) => {
    row.classList.add('swiper-slide');
    swiperWrapper.appendChild(row);
  });
  block.appendChild(swiperWrapper);
  // Create navigation buttons
  const prevButton = document.createElement('div');
  prevButton.classList.add('swiper-button-prev');
  block.appendChild(prevButton);
  const nextButton = document.createElement('div');
  nextButton.classList.add('swiper-button-next');
  block.appendChild(nextButton);
  // Initialize Swiper with navigation and pagination
  Swiper1(block, {
    // autoplay: true,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}
