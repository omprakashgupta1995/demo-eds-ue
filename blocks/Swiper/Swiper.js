import swiperMin from '../../scripts/swiper.min.js';
import { div } from '../../scripts/dom-helpers.js';

export default function decorate(block) {
  console.log(block);
  const swiperEl = div(
    { class: 'swiper' },
    div(
      { class: 'swiper-wrapper' },
      ...Array.from(block.children).map((child) => {
        child.classList.add('swiper-slide');
        return child;
      }),
    ),
  );

  block.appendChild(swiperEl);
  swiperMin(swiperEl);
}
