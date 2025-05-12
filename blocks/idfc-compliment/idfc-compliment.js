/*eslint-disable */
import Swiper from "../idfc-banner/swiper-bundle.min.js";

export default function decorate(block) {
  block.classList.add('swiper');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  const childDivs = Array.from(block.children);
  childDivs.forEach((div) => {
    div.classList.add('swiper-slide');
    swiperWrapper.appendChild(div);
  });

  block.innerHTML = '';
  block.appendChild(swiperWrapper);

  const navWrapper = document.createElement('div');
  navWrapper.classList.add('swiper-nav-wrapper');

  const prevButton = document.createElement('div');
  prevButton.classList.add('swiper-button-prev');
  prevButton.textContent = '<';
  navWrapper.appendChild(prevButton);

  const nextButton = document.createElement('div');
  nextButton.classList.add('swiper-button-next');
  nextButton.textContent = '>';
  navWrapper.appendChild(nextButton);

  block.appendChild(navWrapper);

  new Swiper(block, {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    spaceBetween: 20,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}