/*eslint-disable */
import loadEmbed from '../video/video.js';
import Swiper from './swiper-bundle.min.js';

export default function decorate(block) {
  block.classList.add('swiper');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  Array.from(block.children).forEach((row) => {
    const typeEl = row.firstElementChild;
    const type = typeEl.textContent.trim().toLowerCase();
    typeEl.remove();
    if (type === 'embed') {
      loadEmbed(row);
    }
    row.classList.add('swiper-slide');
    swiperWrapper.appendChild(row);
  });

  block.appendChild(swiperWrapper);

  const childDivs = Array.from(block.children);

  childDivs.forEach((div, index) => {
    div.classList.add(`banner-${index + 1}`);
  });

  childDivs.forEach((bannerDiv) => {
    const innerDivs = bannerDiv.querySelectorAll('div');
    innerDivs.forEach((innerDiv) => {
      if (innerDiv.innerHTML.trim() === '') {
        // innerDiv.remove();
      }
    });
  });

  const navContainer = document.createElement('div');
  navContainer.classList.add('slider-nav');

  const prevButton = document.createElement('button');
  prevButton.classList.add('slider-btn', 'prev-btn');
  prevButton.innerHTML = '<';

  const nextButton = document.createElement('button');
  nextButton.classList.add('slider-btn', 'next-btn');
  nextButton.innerHTML = '>';

  navContainer.appendChild(prevButton);
  navContainer.appendChild(nextButton);
  block.appendChild(navContainer);

  document.querySelector('video').autoplay = true;
  document.querySelector('video').play();

  const swiperInstance = new Swiper(block, {
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: nextButton,
      prevEl: prevButton,
    },
    loop: true,
    slidesPerView: 1, 
    spaceBetween: 0, 
    speed: 500, 
    watchSlidesVisibility: true, 
    on: {
      slideChangeTransitionStart: function () {
        
        this.slides.forEach((slide) => {
          slide.style.visibility = 'hidden';
          slide.style.opacity = '0';
        });
        this.slides[this.activeIndex].style.visibility = 'visible';
        this.slides[this.activeIndex].style.opacity = '1';
      },
    },
  });
}