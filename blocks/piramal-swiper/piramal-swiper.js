import { div } from '../../scripts/dom-helpers.js';
import Swiper1 from '../swiper/swiper.min.js';

export default function decorate(block) {
  const swiperEl = div(
    { class: 'swiper' },
    div(
      {
        class: 'swiper-wrapper',
      },
      ...Array.from(block.children).map((child) => {
        child.classList.add('swiper-slide');
        return child;
      }),
    ),
  );

  //   block.innerHTML = '';
  block.appendChild(swiperEl);
  //   console.log(block);
  Swiper1(swiperEl);
}
