import Glider from './glider.min.js';

export default function decorate(block) {
  block.innerHTML = `
    <div class="glider-container">
      <div class="glider">
        ${[...block.children].map((child) => `<div class="glide-slide">${child.innerHTML}</div>`).join('')}
      </div>
      <div class="dots"></div>
    </div>
  `;

  // Wait for DOM to update
  window.requestAnimationFrame(() => {
    Glider(block.querySelector('.glider'), {
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: true,
      dots: block.querySelector('.dots'),
      arrows: {
        prev: block.querySelector('.glider-prev'),
        next: block.querySelector('.glider-next'),
      },
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
          },
        },
      ],
    });

    // glider.js file  is not use ;

    // Glider(document.querySelector('.glider'), {
    //   slidesToShow: 5,
    //   slidesToScroll: 1,
    //   draggable: true,
    //   dots: '.dots',
    //   arrows: {
    //     prev: '.glider-prev',
    //     next: '.glider-next',
    //   },
    // });
  });
}
