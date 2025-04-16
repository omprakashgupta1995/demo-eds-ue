/* eslint-disable*/
/* document.addEventListener("DOMContentLoaded", function () {
    const carouselWrapper = document.querySelector('.carousel-2-wrapper');
    const block = document.querySelector('.carousel-2.block');
    const children = document.querySelectorAll('.carousel-2-child');
  });
  document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector('.carousel-2.block');
  }); */

  document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll('.four-card.block');
  
    cards.forEach(card => {
      // Example: add a class or style
      card.classList.add('text-overlay');
  
      // OR if you want to change the <p> text, overlay, etc.
      const text = card.querySelector('p');
      if (text) {
        text.style.color = 'white'; // just an example
      }
    });
  });

  /* eslint-disable */
document.addEventListener('DOMContentLoaded', () => {
  // Find all four-card-wrapper elements (acts like carousel slides)
  const wrappers = document.querySelectorAll('.four-card-wrapper');
  if (!wrappers.length) return;

  // Add parent wrapper class to mimic carousel-2
  const parent = wrappers[0].parentElement;
  parent.classList.add('carousel-2');

  // Add class to parent for styling/scrolling wrapper if needed
  parent.classList.add('carousel-2-wrapper');

  // Add class to each child block inside wrapper
  wrappers.forEach((wrapper, index) => {
    wrapper.classList.add(`carousel-2-child`);

    // Add a slide wrapper to the inner divs inside .four-card.block
    const block = wrapper.querySelector('.four-card.block');
    if (!block) return;

    const innerDivs = block.querySelectorAll(':scope > div > div');
    innerDivs.forEach((div) => {
      div.classList.add('carousel-slide-wrapper');
    });
  });
});

// Optional advanced carousel logic can go here
document.addEventListener("DOMContentLoaded", function () {
  const carouselWrapper = document.querySelector('.carousel-2-wrapper');
  const block = document.querySelector('.carousel-2');
  const children = document.querySelectorAll('.carousel-2-child');

  // Example: log children count
  console.log(`Carousel contains ${children.length} slides`);

  // Scroll to next slide logic, just as an example:
  // block.scrollBy({ left: 300, behavior: 'smooth' });
});
