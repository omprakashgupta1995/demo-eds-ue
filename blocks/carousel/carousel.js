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

  /* ---------------- PAGINATION ---------------- */

  const paginationEl = document.createElement('div');
  paginationEl.className = 'swiper-pagination';
  block.appendChild(paginationEl);

  /* ---------------- CONFIG ---------------- */

  const sliderConfigs = [
    {
      className: 'howtobuyspacing',
      slides: {
        mobile: 1.25,
        tablet: 2,
        desktop: 4
      }
    },
    {
      className: 'customerreviews',
      slides: {
        mobile: 1.2,
        tablet: 2,
        desktop: 3
      }
    },
    {
      className: 'carousel-container',
      slides: {
        mobile: 1.5,
        tablet: 2,
        desktop: 4
      }
    }
  ];

  let slidesConfig = {
    mobile: 1.75,
    tablet: 2,
    desktop: 4
  };

  for (const config of sliderConfigs) {
    if (block.closest(`.${config.className}`)) {
      slidesConfig = config.slides;
      break;
    }
  }

  /* ---------------- SWIPER INIT ---------------- */

  new Swiper(block, {
    slidesPerView: slidesConfig.desktop,
    spaceBetween: 24,
    loop: false,

    navigation: {
      nextEl: next,
      prevEl: prev,
    },

    pagination: {
      el: paginationEl,
      clickable: true,
      enabled: true,
    },

    breakpoints: {
      0: {
        slidesPerView: slidesConfig.mobile,
        spaceBetween: 16,
        pagination: {
          enabled: true,
        },
      },
      768: {
        slidesPerView: slidesConfig.tablet,
        spaceBetween: 20,
        pagination: {
          enabled: false,
        },
      },
      1024: {
        slidesPerView: slidesConfig.desktop,
        spaceBetween: 24,
        pagination: {
          enabled: false,
        },
      }
    }
  });
}