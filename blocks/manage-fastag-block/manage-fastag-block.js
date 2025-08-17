import Swiper from '../swiper/swiper.min.js';
// import '../swiper/swiper.min.css';

export default function decorate(block) {
  const childDivs = Array.from(block.children);

  block.classList.add('swiper');
  const wrapper = document.createElement('div');
  wrapper.classList.add('swiper-wrapper');

  childDivs.forEach((div, index) => {
    div.classList.add('swiper-slide', 'fastag-item', 'fi-' + (index + 1));
    wrapper.appendChild(div);
  });

  block.innerHTML = '';
  block.appendChild(wrapper);

  // add navigation buttons
  const next = document.createElement('div');
  next.classList.add('swiper-button-next');
  const prev = document.createElement('div');
  prev.classList.add('swiper-button-prev');
  block.appendChild(next);
  block.appendChild(prev);

  // init swiper
  new Swiper(block, {
    slidesPerView: 2,
    watchOverflow: true,
    navigation: {
      nextEl: next,
      prevEl: prev,
    },
  });
}
