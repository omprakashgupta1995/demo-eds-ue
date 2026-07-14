import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function loadSwiper() {
  return new Promise((resolve) => {
    if (window.Swiper) return resolve();
    const script = document.createElement('script');
    script.src = '/blocks/shades-india/swiper-bundle.min.js';
    script.onload = resolve;
    document.head.appendChild(script);
  });
}

export default async function decorate(block) {
  const items = [...block.children];
  if (!items.length) return;

  block.textContent = '';
  block.classList.add('shades-india');
  block.classList.add('swiper');

  const wrapper = document.createElement('div');
  wrapper.className = 'swiper-wrapper';

  items.forEach((item) => {
    const cells = [...item.children];

    const slide = document.createElement('div');
    slide.className = 'swiper-slide';

    const leftCol = document.createElement('div');
    leftCol.className = 'slide-left';

    const headingText = cells[0]?.textContent.trim();
    if (headingText) {
      const h2 = document.createElement('h2');
      h2.className = 'slide-heading';
      h2.textContent = headingText;
      moveInstrumentation(cells[0], h2);
      leftCol.appendChild(h2);
    }

    const descText = cells[1]?.textContent.trim();
    if (descText) {
      const p = document.createElement('p');
      p.className = 'slide-description';
      p.textContent = descText;
      moveInstrumentation(cells[1], p);
      leftCol.appendChild(p);
    }

    const ctaText = cells[2]?.textContent.trim();
    const ctaLink = cells[3]?.textContent.trim();
    if (ctaText) {
      const a = document.createElement('a');
      a.className = 'slide-cta button';
      a.href = ctaLink || '#';
      a.textContent = ctaText;
      leftCol.appendChild(a);
    }

    const rightCol = document.createElement('div');
    rightCol.className = 'slide-right';

    const pic = cells[4]?.querySelector('picture') || cells[4]?.querySelector('img');
    if (pic) {
      const imgWrapper = document.createElement('div');
      imgWrapper.className = 'slide-image';
      moveInstrumentation(pic, imgWrapper);
      imgWrapper.appendChild(pic);
      rightCol.appendChild(imgWrapper);
    }

    slide.appendChild(leftCol);
    slide.appendChild(rightCol);
    wrapper.appendChild(slide);
  });

  const pagination = document.createElement('div');
  pagination.className = 'swiper-pagination';

  const prevBtn = document.createElement('div');
  prevBtn.className = 'swiper-button-prev';
  prevBtn.setAttribute('aria-label', 'Previous');

  const nextBtn = document.createElement('div');
  nextBtn.className = 'swiper-button-next';
  nextBtn.setAttribute('aria-label', 'Next');

  block.appendChild(wrapper);
  block.appendChild(pagination);
  block.appendChild(prevBtn);
  block.appendChild(nextBtn);

  await loadSwiper();

  new Swiper(block, {
    loop: true,
    speed: 800,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(
      img.src,
      img.alt || '',
      false,
      [{ width: '1920' }]
    );
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
