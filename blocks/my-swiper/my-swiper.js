import Swiper from '../../scripts/swiper-bundle.min.js';
import { div } from '../../scripts/dom-helper.js';

export default function decorate(block) {
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
  Swiper(swiperEl, {
  // Optional parameters
    direction: 'vertical',
    loop: true,

  });
}
