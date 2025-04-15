/* eslint-disable*/
  document.addEventListener('DOMContentLoaded', () => {
    const carouselBlock = document.querySelector('.carousel-2');
    if (!carouselBlock) return;
  
    const innerDivs = carouselBlock.querySelectorAll(':scope > div > div');
    innerDivs.forEach(div => {
      div.classList.add('carousel-slide-wrapper');
    });
  });

  let childDiv = document.querySelector('.carousel-2').children;
  Array.from(childDiv).forEach((childDivElement,index) =>{
    childDivElement.classList.add(`carousel-2-child`);
  })

  // OPTIONAL: If you want to add navigation buttons, this is where you’d do it.
// Otherwise, native scroll/swipe works perfectly with the CSS above.
document.addEventListener("DOMContentLoaded", function () {
    const carouselWrapper = document.querySelector('.carousel-2-wrapper');
    const block = document.querySelector('.carousel-2.block');
    const children = document.querySelectorAll('.carousel-2-child');
  
    // You can hook into any advanced behavior here if needed
    // For example: auto-scroll, arrows, snapping, etc.
  });
  document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector('.carousel-2.block');
  
    // Example: Scroll to next slide
    // carousel.scrollBy({ left: 300, behavior: 'smooth' });
  });
  