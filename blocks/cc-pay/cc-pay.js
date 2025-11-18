import Swiper from '../../scripts/swiper-bundle-min.js';
import { div } from '../../scripts/dom-helpers.js';

export default function decorate(block) {
  console.log(block);
  const swiperCont = div(
    { class: 'swiper' },
    div(
      { class: 'swiper-wrapper' },
      ...Array.from(block.children).map((el) => {
        el.classList.add('swiper-slide');
        return el;
      }),
    ),
  );
  block.appendChild(swiperCont);
  console.log(swiperCont);
  Swiper(swiperCont);
}
