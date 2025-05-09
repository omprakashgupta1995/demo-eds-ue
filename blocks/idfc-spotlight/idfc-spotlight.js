/* eslint-disable */
// import Swiper from "../idfc-banner/swiper-bundle.min.js";
// export default function decorate(block){
//     const childDivs = Array.from(block.children);

//   childDivs.forEach((div, index) => {
//     div.classList.add(`spotlight-div`)
//     div.classList.add(`spotlight-item-${index + 1}`);

//     const swiperWrapper = document.createElement('div');
//       swiperWrapper.classList.add('swiper-wrapper');
    
//       [...block.children].forEach((child) => {
//         child.classList.add('swiper-slide');
//         swiperWrapper.appendChild(child);
//       });
    
//       // block.innerHTML = ''; 
//       // const swiperContainer = document.createElement('div');
//       // swiperContainer.classList.add('swiper');
//       // swiperContainer.appendChild(swiperWrapper);
//       // block.appendChild(swiperContainer);
    
//       const nextBtn = document.createElement('div');
//       nextBtn.className = 'swiper-button-next';
//       nextBtn.textContent = '>';
//       const prevBtn = document.createElement('div');
//       prevBtn.className = 'swiper-button-prev';
//       prevBtn.textContent = '<';
//       block.appendChild(prevBtn);
//       block.appendChild(nextBtn);
    
//       const swiper = new Swiper(swiperContainer, {
//         slidesPerView: 4,
//         slidesPerGroup: 1,
//         spaceBetween: 20,
//         navigation: {
//           nextEl: nextBtn,
//           prevEl: prevBtn,
//         },
//         loop: false,
//         speed: 600,
//         breakpoints: {
//           1024: {
//             slidesPerView: 4,
//             slidesPerGroup: 1,
//           },
//           768: {
//             slidesPerView: 2,
//             slidesPerGroup: 1,
//           },
//           480: {
//             slidesPerView: 1,
//             slidesPerGroup: 1,
//           },
//         },
//       });
//   });
// }

/* eslint-disable */
import Swiper from "../idfc-banner/swiper-bundle.min.js";

export default function decorate(block) {
  const childDivs = Array.from(block.children);

  // Add custom classes to each child
  childDivs.forEach((div, index) => {
    div.classList.add('spotlight-div', `spotlight-item-${index + 1}`);
    div.classList.add('swiper-slide');
  });

  // Create Swiper container and wrapper
  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('swiper');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  // Move all children into the wrapper
  childDivs.forEach((child) => {
    swiperWrapper.appendChild(child);
  });

  swiperContainer.appendChild(swiperWrapper);
  block.innerHTML = ''; // Clear existing content
  block.appendChild(swiperContainer);

  // Create navigation buttons
  const nextBtn = document.createElement('div');
  nextBtn.className = 'swiper-button-next';
  nextBtn.textContent = '>';

  const prevBtn = document.createElement('div');
  prevBtn.className = 'swiper-button-prev';
  prevBtn.textContent = '<';

  block.appendChild(prevBtn);
  block.appendChild(nextBtn);

  // Initialize Swiper
  const swiper = new Swiper(swiperContainer, {
    slidesPerView: 4,
    slidesPerGroup: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: nextBtn,
      prevEl: prevBtn,
    },
    loop: false,
    speed: 600,
    breakpoints: {
      1024: {
        slidesPerView: 4,
        slidesPerGroup: 1,
      },
      768: {
        slidesPerView: 2,
        slidesPerGroup: 1,
      },
      480: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
    },
  });
}
