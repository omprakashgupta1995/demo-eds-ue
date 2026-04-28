import { loadCSS, loadScript } from '../../scripts/aem.js'; 

export default function decorate(block) {
  // Notice: The function is no longer "async". We do not block AEM from loading.

  // 1. Build Swiper structure
  const swiperContainer = document.createElement('div');
  swiperContainer.className = 'swiper hero-swiper';
  
  const swiperWrapper = document.createElement('div');
  swiperWrapper.className = 'swiper-wrapper';

  const thumbnails = [];

  // 2. PRESERVE AEM INSTRUMENTATION
  // Instead of destroying the original rows, we will convert the authored rows directly into slides.
  // This keeps all data-aue-* attributes intact for the Content Tree.
  const rows = [...block.children];

  rows.forEach((row, index) => {
    // Turn the authored row itself into the slide
    row.classList.add('swiper-slide');

    let thumbSrc = `https://via.placeholder.com/120x70?text=Slide+${index + 1}`; 
    const videoLink = row.querySelector('a[href$=".mp4"]');
    const pictures = row.querySelectorAll('picture');

    // Extract thumbnail
    if (pictures.length > 0) {
      const img = pictures[0].querySelector('img');
      if (img) thumbSrc = img.currentSrc || img.src || img.getAttribute('src'); 
    }
    thumbnails.push(thumbSrc);

    if (videoLink) {
      // Replace the text link with the actual video player safely
      const videoEl = document.createElement('video');
      videoEl.src = videoLink.href;
      videoEl.autoplay = true;
      videoEl.loop = true;
      videoEl.muted = true;
      videoEl.playsInline = true;
      videoEl.poster = thumbSrc; 
      
      videoLink.replaceWith(videoEl);
    }

    // Safely style the button without removing it from its AEM container
    const btn = row.querySelector('a:not([href$=".mp4"])');
    if (btn) {
      btn.classList.add('explore-btn', 'button', 'primary');
    }

    // Move the intact row into the Swiper wrapper
    swiperWrapper.appendChild(row);
  });

  // 3. Build the Overlay and Pagination
  const overlayContainer = document.createElement('div');
  overlayContainer.className = 'hero-overlay-container';

  const fractionEl = document.createElement('div');
  fractionEl.className = 'hero-fraction';
  fractionEl.innerHTML = `<span class="current">1</span><span class="divider">/</span><span class="total">${thumbnails.length}</span>`;

  const thumbsEl = document.createElement('div');
  thumbsEl.className = 'hero-thumbs-pagination swiper-pagination';

  // Assemble the DOM nodes
  overlayContainer.append(fractionEl, thumbsEl);
  swiperContainer.append(swiperWrapper, overlayContainer);
  
  // Append to block. Because we used appendChild on the rows earlier, 
  // they were safely moved here without destroying their AEM data attributes.
  block.appendChild(swiperContainer);

  // 4. Load Swiper Asynchronously (Does not crash AEM if it 404s)
  Promise.all([
    loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css'),
    loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js')
  ]).then(() => {
    // Only initialize if Swiper successfully downloaded
    if (typeof window.Swiper !== 'undefined') {
      new window.Swiper(swiperContainer, {
        slidesPerView: 1,
        loop: true,
        pagination: {
          el: thumbsEl,
          clickable: true,
          renderBullet: (index, className) => {
            return `<button class="${className} custom-thumb" aria-label="Go to slide ${index + 1}">
                      <img src="${thumbnails[index]}" alt="Thumbnail ${index + 1}" loading="lazy" />
                    </button>`;
          },
        },
        on: {
          slideChange: function () {
            const currentEl = fractionEl.querySelector('.current');
            if (currentEl) currentEl.textContent = this.realIndex + 1;
          }
        }
      });
    }
  }).catch((err) => {
    console.warn('🚨 Swiper failed to load, but the AEM Content Tree will remain intact.', err);
  });
}