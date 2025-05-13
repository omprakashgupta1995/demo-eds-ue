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
    if(type === 'embed'){
      loadEmbed(row);
    }
    row.classList.add('swiper-slide');
    swiperWrapper.appendChild(row);
  });
  block.appendChild(swiperWrapper);
  Swiper(block, {
    autoplay: {
        delay: 2000,
        disableOnInteraction: true,
      },
  },);
  const childDivs = Array.from(block.children);
  // Step 1: Add banner-1, banner-2, etc.
  childDivs.forEach((div, index) => {
    div.classList.add(`banner-${index + 1}`);
  });
  // Step 2: Remove empty inner divs from each .banner-* block
  childDivs.forEach((bannerDiv) => {
    const innerDivs = bannerDiv.querySelectorAll("div");
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
  block.querySelector(".slider-btn").addEventListener("click",()=>{
    if(block.querySelector(".swiper-slide-active video") != null){
        block.querySelector(".swiper-slide-active video").autoplayplay();
    }
  })
  const swiperInstance = new Swiper(block, {
    navigation: {
      nextEl: nextButton,
      prevEl: prevButton,
    },
    loop: true,
  });
const childCollection = Array.from(block.children?.[0]?.children || []);
childCollection.forEach(el => (el));
const listOfchilds = Array.from(childCollection?.[0]?.children || []);
listOfchilds.forEach((el, i) => el.classList.add(`child-${i}`));
}