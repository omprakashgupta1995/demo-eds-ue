/* eslint-disable */
import Swiper from './swiper-bundle.min.js';

export default function decorate(block) {
  const swiperWrapper = block.classList.add('swiper-wrapper');
  // const swiperWrapper = document.createElement('div');
  // swiperWrapper.classList.add('swiper-wrapper');
  Array.from(block.children).forEach((row) => {
    row.classList.add('swiper-slide');
    swiperWrapper.appendChild(row);
  });
  block.appendChild(swiperWrapper);
  Swiper(block, {
    autoplay: true,
  });
}
