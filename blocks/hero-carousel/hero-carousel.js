export default function decorate(block) {
  const slidesData = [...block.querySelectorAll(':scope > div')];

  // Create Swiper structure
  const swiperEl = document.createElement('div');
  swiperEl.className = 'swiper';

  const wrapper = document.createElement('div');
  wrapper.className = 'swiper-wrapper';

  const thumbsWrapper = document.createElement('div');
  thumbsWrapper.className = 'thumbs';

  slidesData.forEach((row, index) => {
    const cells = [...row.children];

    const mediaType = cells[0]?.textContent.trim();
    const bgImg = cells[1]?.querySelector('img')?.src;
    const videoUrl = cells[2]?.textContent.trim();
    const thumb = cells[3]?.querySelector('img')?.src;
    const alt = cells[4]?.textContent.trim();
    const ctaText = cells[5]?.textContent.trim();
    const ctaLink = cells[6]?.textContent.trim();

    // MAIN SLIDE
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';

    if (mediaType === 'video') {
      const video = document.createElement('video');
      video.src = videoUrl;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;

      slide.appendChild(video);
    } else {
      slide.style.backgroundImage = `url(${bgImg})`;
    }

    // CTA
    if (ctaText) {
      const btn = document.createElement('a');
      btn.href = ctaLink || '#';
      btn.className = 'cta';
      btn.textContent = ctaText;
      slide.appendChild(btn);
    }

    wrapper.appendChild(slide);

    // THUMBNAIL
    const thumbEl = document.createElement('img');
    thumbEl.src = thumb;
    thumbEl.alt = alt || '';
    thumbEl.className = 'thumb';

    thumbEl.addEventListener('click', () => {
      swiper.slideTo(index);
    });

    thumbsWrapper.appendChild(thumbEl);
  });

  swiperEl.appendChild(wrapper);
  block.innerHTML = '';
  block.append(swiperEl, thumbsWrapper);

  // INIT SWIPER
  const swiper = new Swiper(swiperEl, {
    loop: true,
    speed: 800,
    autoplay: {
      delay: 5000
    }
  });

  // VIDEO CONTROL
  swiper.on('slideChange', () => {
    document.querySelectorAll('.swiper-slide video').forEach((v) => {
      v.pause();
      v.currentTime = 0;
    });

    const activeSlide = swiper.slides[swiper.activeIndex];
    const activeVideo = activeSlide.querySelector('video');

    if (activeVideo) {
      activeVideo.play();
    }
  });
}