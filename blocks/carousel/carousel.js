import Swiper from '../../scripts/swiper.min.js';
export default function decorate(block) {
  if (!block) return;

  /* ---------------- SWIPER STRUCTURE ---------------- */

  block.classList.add('swiper');

  const wrapper = document.createElement('div');
  wrapper.className = 'swiper-wrapper';

  const slides = Array.from(block.children);

  slides.forEach((slide) => {
    slide.classList.add('swiper-slide');
    wrapper.appendChild(slide);
  });

  block.innerHTML = '';
  block.appendChild(wrapper);

  /* ---------------- ARROWS ---------------- */

  const navWrapper = document.createElement('div');
  navWrapper.className = 'cards-nav';

  const prev = document.createElement('div');
  prev.className = 'swiper-button-prev';

  const next = document.createElement('div');
  next.className = 'swiper-button-next';

  navWrapper.append(prev, next);

  const container = block.closest('.carousel-container');
  const titleWrapper = container?.querySelector('.default-content-wrapper');

  if (titleWrapper) {
    titleWrapper.append(navWrapper);
  } else {
    block.parentElement.append(navWrapper);
  }
// pagination 
const paginationEl = document.createElement('div');
paginationEl.className = 'swiper-pagination';

// append inside slider
block.appendChild(paginationEl);
  /* ---------------- SWIPER INIT ---------------- */
const sliderConfigs = [
    // { className: 'howtobuyspacing', mobileSlides: 1.25 },
    // { className: 'carousel-container', mobileSlides: 1.5 },
    { className: 'howtobuyspacing', mobileSlides: 1.2 }
  ];

  let mobileSlides = 1.75; // default

  for (const config of sliderConfigs) {
    if (block.closest(`.${config.className}`)) {
      mobileSlides = config.mobileSlides;
      break; // stop at first match
    }
  }

  new Swiper(block, {
    slidesPerView: 4,
    spaceBetween: 24,
    loop: false,

    navigation: {
      nextEl: next,
      prevEl: prev,
    },
    pagination: {
    el: paginationEl,
    clickable: true,
    enabled: true, // default mobile ON
  },
     breakpoints: {
    0: {
      slidesPerView: mobileSlides,  
      spaceBetween: 16,
      pagination: {
        enabled: true,   // ✅ mobile ON
      },
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
      pagination: {
        enabled: false,   
      },
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 24,
      pagination: {
        enabled: false,   
      },
    }
  }
  });
}