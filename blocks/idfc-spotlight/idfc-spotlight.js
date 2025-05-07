/* eslint-disable */
import Swiper from "../idfc-banner/swiper-bundle.min.js";
export default function decorate(block){
    const childDivs = Array.from(block.children);

  childDivs.forEach((div, index) => {
    div.classList.add(`spotlight-div`)
    div.classList.add(`spotlight-item-${index + 1}`);

    // Swiper
    // const swiperWrapper = document.createElement('div');
    //   swiperWrapper.classList.add('swiper-wrapper');
    
    //   // Make each child a swiper-slide
    //   [...block.children].forEach((child) => {
    //     child.classList.add('swiper-slide');
    //     swiperWrapper.appendChild(child);
    //   });
    
    //   block.innerHTML = ''; // Clear block
    //   const swiperContainer = document.createElement('div');
    //   swiperContainer.classList.add('swiper');
    //   swiperContainer.appendChild(swiperWrapper);
    //   block.appendChild(swiperContainer);
    
    //   // Add navigation buttons
    //   const nextBtn = document.createElement('div');
    //   nextBtn.className = 'swiper-button-next';
    //   nextBtn.textContent = '>';
    //   const prevBtn = document.createElement('div');
    //   prevBtn.className = 'swiper-button-prev';
    //   prevBtn.textContent = '<';
    //   block.appendChild(prevBtn);
    //   block.appendChild(nextBtn);
    
    //   // Initialize Swiper
    //   const swiper = new Swiper(swiperContainer, {
    //     slidesPerView: 4,
    //     slidesPerGroup: 1,
    //     spaceBetween: 20,
    //     navigation: {
    //       nextEl: nextBtn,
    //       prevEl: prevBtn,
    //     },
    //     loop: false,
    //     speed: 600,
    //     breakpoints: {
    //       1024: {
    //         slidesPerView: 4,
    //         slidesPerGroup: 1,
    //       },
    //       768: {
    //         slidesPerView: 2,
    //         slidesPerGroup: 1,
    //       },
    //       480: {
    //         slidesPerView: 1,
    //         slidesPerGroup: 1,
    //       },
    //     },
    //   });
  });
}