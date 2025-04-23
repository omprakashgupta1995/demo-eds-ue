import sliderBlock from '../birla-slider/swiper-bundle.min.js';

export default async function decorate(block) { 
    block.classList.add('swiper');
      const swiperWrapper = document.createElement('div');
      swiperWrapper.classList.add('swiper-wrapper');
      Array.from(block.children).forEach((row) => {
        row.classList.add('swiper-slide');
        swiperWrapper.append(row);
      });
      block.append(swiperWrapper);
    
      sliderBlock(block);
}