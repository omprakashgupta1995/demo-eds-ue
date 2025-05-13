/* eslint-disable */
import Swiper from './swiper-bundle.min.js';

export default function decorate(block) {
  block.classList.add('swiper');

  // Create swiper-wrapper
  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  // Create navigation
  const navWrapper = document.createElement('div');
  navWrapper.classList.add('swiper-nav-wrapper');

  const prevButton = document.createElement('div');
  prevButton.classList.add('swiper-button-prev');
  prevButton.textContent = "<"
  navWrapper.appendChild(prevButton);

  const nextButton = document.createElement('div');
  nextButton.classList.add('swiper-button-next');
  nextButton.textContent = ">"

  navWrapper.appendChild(nextButton);

  // Handle slider-one
  if (block.classList.contains('slider-one')) {
    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('card-details');

    Array.from(block.children).forEach((row, rowIn) => {
      row.classList.add('swiper-slide');
      row.firstElementChild.classList.add('img-container')
      row.children[1].classList.add('card-context');

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
        ul.classList.add('card-details__info', `detail-${rowIn + 1}`);
        ul.firstElementChild.textContent = `card ${rowIn + 1}, ${ul.firstElementChild.textContent}`;
        const applyNowLi = ul.querySelector('li a[href*="Apply"]')?.closest('li');
        const readLessLi = Array.from(ul.children).find(
          (li) => li.textContent.trim().toLowerCase() === 'read less'
        );

        if (applyNowLi && readLessLi && applyNowLi.nextSibling !== readLessLi) {
          ul.removeChild(readLessLi);
          applyNowLi.insertAdjacentElement('afterend', readLessLi);
        }

        detailsContainer.appendChild(ul);
      }

      row.addEventListener('click', () => {
        detailsContainer.querySelectorAll('.card-details__info')
          .forEach((d) => d.classList.remove('active'));

        const targetDetail = detailsContainer.querySelector(`.detail-${rowIn + 1}`);
        if (targetDetail) targetDetail.classList.add('active');
      });

      swiperWrapper.appendChild(row);
    });

    block.innerHTML = '';
    block.appendChild(swiperWrapper);
    block.appendChild(detailsContainer);
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

  // Handle slider-two
  else if (block.classList.contains('slider-two')) {
    Array.from(block.children).forEach((slide) => {
      slide.classList.add('swiper-slide');
      swiperWrapper.appendChild(slide);
    });

    block.innerHTML = '';
    block.appendChild(swiperWrapper);
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
}
