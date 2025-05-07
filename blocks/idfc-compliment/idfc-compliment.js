/*eslint-disable */
import Swiper from "../idfc-banner/swiper-bundle.min.js";

export default function decorate(block) {
    block.classList.add('swiper');
  
    // Create swiper-wrapper
    const swiperWrapper = document.createElement('div');
    swiperWrapper.classList.add('swiper-wrapper');
  
    // Move each direct child div into swiper-wrapper and add a class
    const childDivs = Array.from(block.children);
    childDivs.forEach((div) => {
      div.classList.add('swiper-slide'); // Add both Swiper and custom class
      swiperWrapper.appendChild(div);
    });
  
    // Clear the block and append the new wrapper
    block.innerHTML = '';
    block.appendChild(swiperWrapper);

    const prevButton = document.createElement('div');
    prevButton.classList.add('swiper-button-prev');
    prevButton.textContent = "<";
    navWrapper.appendChild(prevButton);
  
    const nextButton = document.createElement('div');
    nextButton.classList.add('swiper-button-next');
    nextButton.textContent = ">";
    navWrapper.appendChild(nextButton);

    Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        spaceBetween: 20,
        slidesPerView: "auto",
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
      });
    //   Swiper(block,{

    //   })
  }
  
  