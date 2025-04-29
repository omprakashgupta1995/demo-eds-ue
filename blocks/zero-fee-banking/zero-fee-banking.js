import swiper from '../custom-swiper/custom-swiper.js';

export default function decorate(block) {
  const blockChild = block.children;
  const freeBankingChild = blockChild;
  Array.from(freeBankingChild).forEach((data) => {
    data.classList.add('background');
  });

  swiper(block);
}
