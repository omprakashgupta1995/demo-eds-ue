import Swiper from '../swiper/swiper.min.js';
// import '../swiper/swiper.min.css';

export default function decorate(block) {
  block.classList.add('swiper', 'custom-swiper');

  // Create wrapper
  const wrapper = document.createElement('div');
  wrapper.classList.add('swiper-wrapper');

  // Add swiper-slide to each child
  [...block.children].forEach((child) => {
    child.classList.add('swiper-slide');
    wrapper.appendChild(child);
  });

  // Clear and rebuild structure
  block.innerHTML = '';
  block.appendChild(wrapper);

  // Add pagination
  const pagination = document.createElement('div');
  pagination.classList.add('swiper-pagination');
  block.appendChild(pagination);

  // Initialize Swiper
  Swiper(block, {
    loop: true,
    spaceBetween: 24,
    slidesPerView: 1, // default mobile
    pagination: {
      el: pagination,
      clickable: true,
      renderBullet: (index, className) => `
        <span class="${className}">
          <img src="/path-to-your-slider-image.png" alt="indicator">
        </span>
      `,
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
}
