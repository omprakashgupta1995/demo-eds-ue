/* eslint-disable */
import Swiper1 from './swiper-bundle.min.js';

export default function decorate(block) {
  block.classList.add('swiper');
  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  Array.from(block.children).forEach((row) => {
    row.classList.add('swiper-slide');
    swiperWrapper.appendChild(row);
    const pagination = document.createElement('div');
    pagination.classList.add('swiper-pagination');
    block.appendChild(pagination);
  });
  block.appendChild(swiperWrapper);
  Swiper1(block, {
    autoplay: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
}

/* export default function decorate(block) {
  block.classList.add('swiper');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  Array.from(block.children).forEach((row) => {
    row.classList.add('swiper-slide');
    swiperWrapper.appendChild(row);
  });

  block.appendChild(swiperWrapper);
  Swiper(block, {
    autoplay: false,
  });


} */