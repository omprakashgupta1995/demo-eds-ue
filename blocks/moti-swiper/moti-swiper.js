/* eslint-disable*/
//  import swiperFirst from '../custom-swiper/custom-swiper.js';
//  export default function decorate(block) {
//    swiperFirst(block);
//  }

import swiper from '../custom-swiper/custom-swiper.js';

export default function decorate(block) {
    const slide = document.querySelectorAll(".our-funds");
    Array.from(slide).forEach((data,index)=>{
        data.classList.add(`show-data-${index}`)
    })

  const blockChild = block.children;
  const freeBankingChild = blockChild;
  Array.from(freeBankingChild).forEach((data) => {
    data.classList.add('border');
  });
  swiper(block);
}

