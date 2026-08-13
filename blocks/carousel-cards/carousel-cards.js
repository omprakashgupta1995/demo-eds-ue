import Swiper from '../vehicle-carousel/swiper.min.js';

export default function decorate(block) {
  const cards = [...block.children];

  // 1. Setup Swiper DOM structure
  block.classList.add('swiper');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  // 2. Structure the cards
  cards.forEach((row) => {
    row.classList.add('swiper-slide'); // Swiper slide class
    const [imgCol, titleCol, contentCol] = row.children;

    // Top Section
    const topSection = document.createElement('div');
    topSection.classList.add('card-top');
    imgCol.classList.add('card-image');
    titleCol.classList.add('card-title');

    const titleP = titleCol.querySelector('p');
    if (titleP && titleP.innerHTML.includes('<br>')) {
      const [mainTitle, subTitle] = titleP.innerHTML.split('<br>');
      titleCol.innerHTML = `<h3>${mainTitle}</h3><p>${subTitle}</p>`;
    }
    topSection.append(imgCol, titleCol);

    // Bottom Section
    contentCol.classList.add('card-bottom');
    const paragraphs = contentCol.querySelectorAll('p');
    const lastP = paragraphs[paragraphs.length - 1];

    if (lastP && lastP.innerHTML.includes('<br><br>')) {
      const [textPart, buttonPart] = lastP.innerHTML.split('<br><br>');
      lastP.innerHTML = textPart;

      const button = document.createElement('a');
      button.classList.add('card-button');
      button.href = '#';
      button.innerHTML = buttonPart;
      contentCol.append(button);
    }

    row.textContent = '';
    row.append(topSection, contentCol);
    swiperWrapper.append(row); // Move card into the wrapper
  });

  // Clear the original block and append the newly structured wrapper
  block.textContent = '';
  block.append(swiperWrapper);

  // 3. Build Swiper Controls (Dots & Arrow)
  const controlsContainer = document.createElement('div');
  controlsContainer.classList.add('carousel-controls');

  const pagination = document.createElement('div');
  pagination.classList.add('swiper-pagination');

  const nextBtn = document.createElement('div');
  nextBtn.classList.add('swiper-button-next', 'custom-next');
  // Injecting an SVG that closely matches your design arrow
  nextBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;

  controlsContainer.append(pagination, nextBtn);
  block.append(controlsContainer);
  
  // 4. Initialize Swiper from local module import
  new Swiper(block, {
    slidesPerView: 1,
    centeredSlides: true,
    pagination: {
      el: pagination,
      clickable: true,
    },
    navigation: {
      nextEl: nextBtn,
    },
  });
}