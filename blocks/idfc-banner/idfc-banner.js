/* eslint-disable */
import loadEmbed from '../video/video.js';
import Swiper from "../idfc-slider/swiper-bundle.min.js";

export default function decorate(block) {
  block.classList.add('swiper');
  console.log("hello js is loading on idfc banner");
  
  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  Array.from(block.children).forEach((row, index) => {
    const typeEl = row.firstElementChild;
    const type = typeEl.textContent.trim().toLowerCase();
    typeEl.remove();

    if (type === 'embed') loadEmbed(row);

    row.classList.add('swiper-slide', `banner-${index + 1}`);
    swiperWrapper.appendChild(row);
  });

  block.innerHTML = '';
  block.appendChild(swiperWrapper);

  // Create nav buttons
  const navContainer = document.createElement('div');
  navContainer.classList.add('slider-nav');

  const prevButton = document.createElement('button');
  prevButton.classList.add('slider-btn', 'prev-btn');
  prevButton.innerHTML = '&lt;';

  const nextButton = document.createElement('button');
  nextButton.classList.add('slider-btn', 'next-btn');
  nextButton.innerHTML = '&gt;';

  navContainer.append(prevButton, nextButton);
  block.appendChild(navContainer);

  const swiperInstance = new Swiper(block, {
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: nextButton,
      prevEl: prevButton,
    },
  });

  swiperInstance.on('slideChange', () => {
    // Pause all videos
    document.querySelectorAll('.swiper-slide video').forEach(v => v.pause());

    // Play video in active slide
    const activeVideo = block.querySelector('.swiper-slide-active video');
    if (activeVideo) activeVideo.play();
  });

  // Add child-* classes to each inner element of the first slide
  const firstSlideChildren = Array.from(swiperWrapper.children[0]?.children || []);
  firstSlideChildren.forEach((el, i) => el.classList.add(`child-${i}`));
}
