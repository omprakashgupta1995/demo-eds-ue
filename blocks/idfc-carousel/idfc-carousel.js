import Swiper from '../../scripts/swiper-bundle.min.js';
import { div } from '../../scripts/domhelper.js';

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
  //   block.textContant = '';s
  block.appendChild(swiperEl);

  Swiper(swiperEl, {
    loop: true,
    autoplay: { delay: 2000 },
  });
}
