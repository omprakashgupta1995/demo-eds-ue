import swiper from './swiper.min.js';

export default function decorate(block) {
  block.parentElement.classList.add('swiper');
  const blockParent = block.parentElement;
  block.classList.add('swiper-wrapper');
  Array.from([...block.children]).forEach((item) => {
    item.classList.add('swiper-slide');
  });
  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination');
  blockParent.appendChild(swiperPagination);
  swiper(blockParent, {
    pagination: {
      el: '.swiper-pagination',

    },
  });
}
