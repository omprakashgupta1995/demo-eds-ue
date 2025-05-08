/* eslint-disable */

export default function decorate(block) {
    const cardDivs = block.querySelectorAll(':scope > div');
    cardDivs.forEach((card) => {
      card.classList.add('card');
  
      const innerDivs = card.querySelectorAll('div');
      if (innerDivs.length >= 2) {
        innerDivs[0].classList.add('card-img');
        innerDivs[1].classList.add('card-context');
  
        const pictureWrapper = innerDivs[0].querySelector('p');
        if (pictureWrapper) {
          pictureWrapper.classList.add('card-img_img');
        }
      }
    });
  }
  