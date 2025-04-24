/* eslint-disable */
import Swiper from './swiper-bundle.min.js';

export default function decorate(block) {
  block.classList.add('swiper');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  const detailsContainer = document.createElement('div');
  detailsContainer.classList.add('card-details');

/*   Array.from(block.children).forEach((row,rowIn) => {
    row.classList.add('swiper-slide');

    const pictures = row.getElementsByTagName('picture');
    Array.from(pictures).forEach((picture) => {
      picture.classList.add('card-img');
      const img = picture.querySelector('img');
      if (img) img.classList.add('card-img__img');
    });

    const paragraphs = row.getElementsByTagName('p');
    Array.from(paragraphs).forEach((p, i) => {
      p.classList.add(i === 0 ? 'card-title' : 'card-link');
    });

    const ul = row.querySelector('ul');
    if (ul) {
      ul.classList.add('card-details__info');
      ul.classList.add(`detail-${rowIn+1}`)
      // Find 'Apply Now' and 'Read less' list items
      const applyNowLi = ul.querySelector('li a[href*="Apply"]')?.closest('li');
      const readLessLi = Array.from(ul.children).find(li => li.textContent.trim().toLowerCase() === 'read less');

      // Move 'Read less' after 'Apply Now'
      if (applyNowLi && readLessLi && applyNowLi.nextSibling !== readLessLi) {
        ul.removeChild(readLessLi);
        applyNowLi.insertAdjacentElement('afterend', readLessLi);
      }

      detailsContainer.appendChild(ul); // move ul to the Card-details container
    }

    swiperWrapper.appendChild(row);
  }); */
  Array.from(block.children).forEach((row, rowIn) => {
    row.classList.add('swiper-slide');
  
    const pictures = row.getElementsByTagName('picture');
    Array.from(pictures).forEach((picture) => {
      picture.classList.add('card-img');
      const img = picture.querySelector('img');
      if (img) img.classList.add('card-img__img');
    });
  
    const paragraphs = row.getElementsByTagName('p');
    Array.from(paragraphs).forEach((p, i) => {
      p.classList.add(i === 0 ? 'card-title' : 'card-link');
    });
  
    const ul = row.querySelector('ul');
    if (ul) {
      ul.classList.add('card-details__info');
      ul.classList.add(`detail-${rowIn + 1}`);
  
      const applyNowLi = ul.querySelector('li a[href*="Apply"]')?.closest('li');
      const readLessLi = Array.from(ul.children).find(li => li.textContent.trim().toLowerCase() === 'read less');
  
      if (applyNowLi && readLessLi && applyNowLi.nextSibling !== readLessLi) {
        ul.removeChild(readLessLi);
        applyNowLi.insertAdjacentElement('afterend', readLessLi);
      }
  
      detailsContainer.appendChild(ul);
    }
  
    // ✅ Add click handler for card toggle
    row.addEventListener('click', () => {
      const allDetails = detailsContainer.querySelectorAll('.card-details__info');
      allDetails.forEach((d) => d.classList.remove('active'));
  
      const targetDetail = detailsContainer.querySelector(`.detail-${rowIn + 1}`);
      if (targetDetail) targetDetail.classList.add('active');
    });
  
    swiperWrapper.appendChild(row);
  });
  
  block.appendChild(swiperWrapper);
  block.appendChild(detailsContainer);

  const navWrapper = document.createElement('div');
  navWrapper.classList.add('swiper-nav-wrapper');

  const prevButton = document.createElement('div');
  prevButton.classList.add('swiper-button-prev');
  navWrapper.appendChild(prevButton);

  const nextButton = document.createElement('div');
  nextButton.classList.add('swiper-button-next');
  navWrapper.appendChild(nextButton);

  block.appendChild(navWrapper);

  Swiper(block, {
    slidesPerView: 'auto',
    watchOverflow: true,
    slideClass: 'swiper-slide',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}
