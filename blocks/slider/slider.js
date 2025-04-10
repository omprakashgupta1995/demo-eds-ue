import Swipper from './swiper-bundle.min.js';

export default function decorate(block) {
  block.classList.add('slider');
  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  Array.from(block.children).forEach((row) => {
    row.classList.add('swiper-slide');
    swiperWrapper.appendChild(row);
  });
  block.appendChild(swiperWrapper);
  Swipper(block, {
    autoplay: true,
  });
}
