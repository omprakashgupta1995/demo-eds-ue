import Swiper from '../../scripts/swiper-bundle.min.js';
import { div } from '../../scripts/dom-helpers.js';

export default function decorate(block) {
   const swiperContent = div(
      { class: 'swiper' },
      div(
         { class: 'swiper-wrapper' },
         ...Array.from(block.children).map((child) => {
            child.classList.add('swiper-slide');
            return child;
         }),
      ),
   );

   block.appendChild(swiperContent);

   Swiper(swiperContent);
}
