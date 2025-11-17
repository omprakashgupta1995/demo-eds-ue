import Swiper from '../../scripts/swiper-bundle.min.js';
import { div } from '../../scripts/dom-helpers.js';

export default function decorate(block) {
  const slides = [...block.children];
  if (!slides.length) return;

  // Build swiper structure
  const swiperEl = div(
    { class: 'swiper' },
    div(
      { class: 'swiper-wrapper' },
      ...slides.map((slide) => {
        slide.classList.add('swiper-slide');
        return slide;
      }),
    ),
  );

  // Append the final swiper into the block
  block.replaceChildren(swiperEl);

  // Init swiper
  Swiper(swiperEl, {
    loop: true,
    autoplay: { delay: 2000, disableOnInteraction: true },
  });
}
