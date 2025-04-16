/* eslint-disable */
export default function decorate(block) {
const childDivs = block.querySelectorAll(':scope > div');
// Add classes to the two direct child divs
if (childDivs.length >= 2) {
      childDivs[0].classList.add('banner-sec-child-1');
      childDivs[1].classList.add('banner-sec-child-2');
  
      // Add class to h3 inside second div
      const h3 = childDivs[1].querySelector('h3');
      if (h3) h3.classList.add('banner-sec-heading');
  
      // Add classes to all <p> elements inside second div
      const paragraphs = childDivs[1].querySelectorAll('p');
      paragraphs.forEach((p, i) => {
        p.classList.add(`banner-sec-para-${i + 1}`);
      });
    }
  }
  