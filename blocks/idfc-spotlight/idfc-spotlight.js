/*eslint-disable */
import Swiper from "../idfc-slider/swiper-bundle.min.js";

export default function decorate(block) {
    console.log("Hello 123 4321");
    
  console.log(`spotlight block is ${block.children}`)
  const childDivs = Array.from(block.children);

  // Add required Swiper classes to each child
  childDivs.forEach((div, index) => {
    div.classList.add('spotlight-div', `spotlight-item-${index + 1}`, 'swiper-slide');
  });

  // Create Swiper markup
  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('swiper');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  childDivs.forEach((child) => {
    swiperWrapper.appendChild(child);
  });

  swiperContainer.appendChild(swiperWrapper);

  // Clear existing content and insert Swiper
  block.innerHTML = '';
  block.appendChild(swiperContainer);

  // Add navigation buttons
  const prevBtn = document.createElement('div');
  prevBtn.className = 'swiper-button-prev';
  prevBtn.textContent = '<';

  const nextBtn = document.createElement('div');
  nextBtn.className = 'swiper-button-next';
  nextBtn.textContent = '>';

  block.appendChild(prevBtn);
  block.appendChild(nextBtn);

  // Init Swiper
  new Swiper(swiperContainer, {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: nextBtn,
      prevEl: prevBtn,
    },
    loop: false,
    speed: 600,
    breakpoints: {
      1024: { slidesPerView: 4 },
      768: { slidesPerView: 2 },
      480: { slidesPerView: 1 },
    },
  });
}