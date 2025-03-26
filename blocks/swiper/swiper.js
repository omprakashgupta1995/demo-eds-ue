import Swiper from './swiper-bundle-min.js';

export default function decorate(block) {
  block.classList.add('swiper');
  const swipperWrapper = document.createElement('div');
  swipperWrapper.classList.add('swiper-wrapper');
  Array.from(block.children).forEach((row) => {
    row.classList.add('swiper-slide');
    swipperWrapper.append(row);
  });
  block.append(swipperWrapper);

  const prevBtn = document.createElement('div');
  const nextBtn = document.createElement('div');
  prevBtn.classList.add('swiper-button-prev');
  nextBtn.classList.add('swiper-button-next');
  block.append(prevBtn);
  block.append(nextBtn);

  let slidesToShow;
  let slidesToScroll;
  let spaceBetweenn;

  switch (true) {
    case block.classList.contains('onecard'):
      slidesToShow = 1;
      slidesToScroll = 1;
      spaceBetweenn = 0;
      break;
    case block.classList.contains('twoCard'.toLowerCase()):
      slidesToShow = 2;
      slidesToScroll = 2;
      break;
    case block.classList.contains('threecard'):
      slidesToShow = 3;
      slidesToScroll = 3;
      break;
    default:
      slidesToShow = 1;
      slidesToScroll = 1;
  }

  Swiper(block, {
    direction: block.classList.contains('verticle') ? 'vertical' : 'horizontal',
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    slidesPerView: slidesToShow,
    slidesPerGroup: slidesToScroll,
    spaceBetween: spaceBetweenn,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}
