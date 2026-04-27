import { loadCSS, loadScript } from '../../scripts/aem.js'; 

export default async function decorate(block) {
  // 1. Load Swiper Bundle directly from CDN (Guaranteed to work)
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

  const swiperContainer = document.createElement('div');
  swiperContainer.className = 'swiper hero-swiper';
  const swiperWrapper = document.createElement('div');
  swiperWrapper.className = 'swiper-wrapper';

  const thumbnails = [];

  // 2. Clone the original rows so we can safely manipulate them
  const rows = [...block.children];
  block.textContent = ''; // Clear the original block HTML

  rows.forEach((row, index) => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';

    // Set a fallback thumbnail just in case authoring is missing
    let thumbSrc = `https://via.placeholder.com/120x70?text=Slide+${index + 1}`; 

    // Find the video link (ends in .mp4) and any pictures in this row
    const videoLink = row.querySelector('a[href$=".mp4"]');
    const pictures = row.querySelectorAll('picture');

    if (videoLink) {
      // --- HANDLE VIDEO SLIDE ---
      const videoEl = document.createElement('video');
      videoEl.src = videoLink.href;
      videoEl.autoplay = true;
      videoEl.loop = true;
      videoEl.muted = true;
      videoEl.playsInline = true;
      slide.appendChild(videoEl);

      // Extract authored thumbnail (first picture authored with the video)
      if (pictures.length > 0) {
        const img = pictures[0].querySelector('img');
        if (img) thumbSrc = img.currentSrc || img.src; 
      }
    } else if (pictures.length > 0) {
      // --- HANDLE IMAGE SLIDE ---
      const mainPic = pictures[0];
      slide.appendChild(mainPic.cloneNode(true));

      // Use the main image as the thumbnail
      const img = mainPic.querySelector('img');
      if (img) thumbSrc = img.currentSrc || img.src; 
    }

    thumbnails.push(thumbSrc);

    // --- HANDLE "EXPLORE NOW" BUTTON ---
    // Look for any link in the row that is NOT the video link
    const btn = row.querySelector('a:not([href$=".mp4"])');
    if (btn) {
      btn.className = 'explore-btn button primary';
      
      // If AEM wrapped it in a paragraph, just extract the <a> tag cleanly
      slide.appendChild(btn.cloneNode(true)); 
    }

    swiperWrapper.appendChild(slide);
  });

  swiperContainer.appendChild(swiperWrapper);

  // 3. Build the Overlay and Pagination
  const overlayContainer = document.createElement('div');
  overlayContainer.className = 'hero-overlay-container';

  const fractionEl = document.createElement('div');
  fractionEl.className = 'hero-fraction';
  fractionEl.innerHTML = `<span class="current">1</span><span class="divider">/</span><span class="total">${thumbnails.length}</span>`;

  const thumbsEl = document.createElement('div');
  thumbsEl.className = 'hero-thumbs-pagination swiper-pagination';

  overlayContainer.appendChild(fractionEl);
  overlayContainer.appendChild(thumbsEl);
  swiperContainer.appendChild(overlayContainer);
  
  // Attach the whole structure to the block
  block.appendChild(swiperContainer);

  // 4. Initialize Swiper safely after the DOM is fully painted
  setTimeout(() => {
    if (typeof window.Swiper !== 'undefined') {
      new window.Swiper(swiperContainer, {
        slidesPerView: 1,
        loop: true,
        // Optional: Add auto-play if you want the carousel to move on its own
        // autoplay: { delay: 5000, disableOnInteraction: false }, 
        pagination: {
          el: thumbsEl,
          clickable: true,
          renderBullet: function (index, className) {
            return `<button class="${className} custom-thumb" aria-label="Go to slide ${index + 1}">
                      <img src="${thumbnails[index]}" alt="Thumbnail ${index + 1}" />
                    </button>`;
          },
        },
        on: {
          slideChange: function () {
            // Update the 1/4 text counter
            const currentEl = fractionEl.querySelector('.current');
            if (currentEl) currentEl.textContent = this.realIndex + 1;
          }
        }
      });
      console.log("✅ Swiper Initialized Successfully");
    } else {
      console.error("🚨 Swiper library did not load from CDN.");
    }
  }, 150); // 150ms delay to ensure EDS has painted the DOM
}