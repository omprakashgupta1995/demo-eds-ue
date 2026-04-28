function loadSwiper() {
  return new Promise((resolve) => {
    if (window.Swiper) return resolve();

    const script = document.createElement('script');
    script.src = '/blocks/hero-1/swiper-bundle.min.js';
    script.onload = resolve;
    document.head.appendChild(script);
  });
}

const AEM_PUBLISH_DOMAIN = 'https://publish-p48457-e1275402.adobeaemcloud.com';

function resolveMediaUrl(url) {
  if (!url) return '';

  // If already absolute → use as is
  if (url.startsWith('http')) return url;

  // If DAM path → prepend publish domain
  if (url.startsWith('/content/dam')) {
    return `${AEM_PUBLISH_DOMAIN}${url}`;
  }

  return url;
}

export default async function decorate(block) {
  await loadSwiper();

  const rows = [...block.children];

  const swiperEl = document.createElement('div');
  swiperEl.className = 'swiper';

  const wrapper = document.createElement('div');
  wrapper.className = 'swiper-wrapper';

  const thumbsWrapper = document.createElement('div');
  thumbsWrapper.className = 'thumbs';

  const counter = document.createElement('div');
  counter.className = 'counter';

  rows.forEach((row, index) => {
    const content = row.querySelector(':scope > div');
    const children = content.children;

    const type = children[0]?.textContent.trim();

    const mediaEl = children[1];
    const thumbEl = children[2];

    let mediaSrc = '';
    let thumbSrc = '';

    // IMAGE
    if (type === 'Image') {
      const rawImg = mediaEl.querySelector('img')?.getAttribute('src');
      mediaSrc = resolveMediaUrl(rawImg);
    }

    // VIDEO
    if (type === 'Video') {
      const rawHref = mediaEl.querySelector('a')?.getAttribute('href');
      mediaSrc = resolveMediaUrl(rawHref);
    }

    // THUMBNAIL
    const rawThumb = thumbEl?.querySelector('img')?.getAttribute('src');
    thumbSrc = resolveMediaUrl(rawThumb);

    // CREATE SLIDE
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';

    if (type === 'Video') {
      const video = document.createElement('video');
      video.src = mediaSrc;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'none';

      slide.appendChild(video);
    } else {
      slide.style.backgroundImage = `url(${mediaSrc})`;
    }

    // CTA BUTTON
    if (type === 'Video') {
    const btn = document.createElement('a');
    btn.className = 'cta';
    btn.textContent = 'EXPLORE NOW';
    btn.href = '#';

    slide.appendChild(btn);
  }

    wrapper.appendChild(slide);

    // THUMBNAIL
    if (thumbSrc) {
      const thumb = document.createElement('img');
      thumb.src = thumbSrc;
      thumb.className = 'thumb';

      thumb.addEventListener('click', () => {
        swiper.slideToLoop(index);
      });

      thumbsWrapper.appendChild(thumb);
    }
  });

  swiperEl.appendChild(wrapper);

  swiperEl.appendChild(thumbsWrapper);
  swiperEl.appendChild(counter);

  block.innerHTML = '';
  block.append(swiperEl);

  const swiper = new Swiper(swiperEl, {
    loop: true,
    speed: 800,
  });

  // UI UPDATE FUNCTION
  function updateUI() {
    const realIndex = swiper.realIndex;
    const total = rows.length;

    counter.textContent = `${realIndex + 1}/${total}`;

    // Pause all videos
    swiperEl.querySelectorAll('video').forEach((v) => {
      v.pause();
      v.currentTime = 0;
    });

    // Play active video
    const activeSlide = swiper.slides[swiper.activeIndex];
    const activeVideo = activeSlide.querySelector('video');

    if (activeVideo) activeVideo.play();

    // Active thumbnail
    [...thumbsWrapper.children].forEach((t, i) => {
      t.classList.toggle('active', i === realIndex);
    });
  }
  swiper.on('slideChange', updateUI);
  updateUI();
}