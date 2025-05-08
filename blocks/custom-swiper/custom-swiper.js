import loadEmbed from '../video/video.js';

export default function decorate(block) {
  const customSwiper = block.children;
  Array.from(customSwiper).forEach((element, index) => {
    element.classList.add('custom-swiper-slide');
    element.classList.add(`custom-swipper-slide-${index}`);
  });
  const childDivs = block.querySelectorAll('.custom-swiper-slide');
  childDivs.forEach((bannerDiv) => {
    const childs = bannerDiv.children;
    const firstChild = childs[0];
    firstChild.style.display = 'none';
  });

  const navContainer = document.createElement('div');
  navContainer.classList.add('custom-slider-nav');

  const prevButton = document.createElement('button');
  prevButton.classList.add('custom-slider-btn', 'prev-btn1');
  prevButton.innerHTML = '<';

  const nextButton = document.createElement('button');
  nextButton.classList.add('custom-slider-btn', 'next-btn2');
  nextButton.innerHTML = '>';

  const customSwiperWrapper = document.createElement('div');
  customSwiperWrapper.classList.add('custom-swiper-wrapper-item');

  navContainer.appendChild(prevButton);
  navContainer.appendChild(nextButton);

  if (!Array.from(block.classList).includes('custom-swiper-second')) {
    customSwiperWrapper.appendChild(navContainer);
  }

  const slides = block.querySelectorAll('.custom-swiper-slide');
  let currentIndex = 0;

  function setupAutoPlayVideos() {
    const videoAtr = document.querySelectorAll('video');

    Array.from(videoAtr).forEach((autoPlayVideo) => {
      // Set necessary attributes for autoplay
      autoPlayVideo.setAttribute('autoplay', true);
      autoPlayVideo.setAttribute('loop', true);
      autoPlayVideo.setAttribute('playsinline', true);
      autoPlayVideo.muted = true;

      autoPlayVideo.play().catch(() => {
        // console.error('Error playing video:', error);
        document.addEventListener(
          'click',
          () => {
            autoPlayVideo
              .play();
            // .catch((e) => console.error("Still can't play video:", e));
          },
          { once: true },
        );
      });
    });
  }
  function updateSliderForAll() {
    let slideWidth = 1440; // Use 'let' so you can reassign the value

    const listOfBlocks = block.classList;
    Array.from(listOfBlocks).forEach((ele) => {
      if (ele === 'zero-fee-banking') {
        slideWidth = 260;
        // chnages
      } else if (ele === 'our-funds') {
        slideWidth = 430;
      } else if (ele === 'moti-swiper') {
        slideWidth = 430;
      }
    });
    const transitionDuration = '0.5s'; // Duration for the transition effect
    slides.forEach((slidesChild) => {
      slidesChild.style.transition = `transform ${transitionDuration} ease-in-out`;
      slidesChild.style.transform = `translateX(-${
        currentIndex * slideWidth
      }px)`;
    });
  }

  // Function to go to the previous slide
  function prevSlide() {
    if (currentIndex > 0) {
      // eslint-disable-next-line no-plusplus
      currentIndex--;
      updateSliderForAll(); // Update the position of all slides
    }
  }

  // Function to go to the next slide
  function nextSlide() {
    if (currentIndex < slides.length - 1) {
      // eslint-disable-next-line no-plusplus
      currentIndex++;
      updateSliderForAll(); // Update the position of all slides
    }
  }

  // Add event listeners for the navigation buttons
  prevButton.addEventListener('click', prevSlide);
  nextButton.addEventListener('click', nextSlide);

  // Add keyboard navigation (left and right arrow keys)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });

  // Initialize the slider position
  updateSliderForAll(); // Ensure the position is set when the slider is first rendered

  Array.from(block.children).forEach((row) => {
    const typeEl = row.firstElementChild;
    const type = typeEl.textContent.trim().toLowerCase();
    typeEl.remove();
    if (type === 'embed') {
      loadEmbed(row);
    }
    row.classList.add('swiper-slide');
    customSwiperWrapper.appendChild(row);
  });
  if (Array.from(block.classList).includes('custom-swiper-second')) {
    customSwiperWrapper.appendChild(navContainer);
  }
  block.appendChild(customSwiperWrapper);
  setupAutoPlayVideos();
}
