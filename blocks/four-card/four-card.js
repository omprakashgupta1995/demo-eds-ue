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