/*eslint-disable */
import loadEmbed from '../embed/embed.js';
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
    autoplay: true,
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

  const blockChild = block.children;
  console.log("child",blockChild);



}