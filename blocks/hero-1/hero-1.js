import { loadCSS, loadScript } from "../../scripts/aem.js";

// Prevent multiple initializations
const SWIPER_CDN =
  "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
const SWIPER_CSS =
  "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css";

// IMAGE
function resolveDamUrl(path) {
  try {
    const url = new URL(path, window.location.origin);
    if (url.pathname.startsWith("/content/dam")) {
      return `https://publish-p48457-e1275402.adobeaemcloud.com${url.pathname}`;
    }
    return path;
  } catch {
    return path;
  }
}

// Wait for Swiper safely
async function ensureSwiper() {
  if (window.Swiper) return;

  await loadCSS(SWIPER_CSS);
  await loadScript(SWIPER_CDN);

  if (!window.Swiper) {
    throw new Error("Swiper failed to load");
  }
}

export default async function decorate(block) {
  // Avoid re-initialization
  if (block.dataset.swiperInitialized === "true") return;
  block.dataset.swiperInitialized = "true";

  try {
    await ensureSwiper();
  } catch (e) {
    console.error("🚨 Swiper load failed:", e);
    return;
  }

  const rows = [...block.children];
  if (!rows.length) return;

  // Wrapper (do NOT destroy original content yet)
  const wrapper = document.createElement("div");
  wrapper.className = "hero-swiper-wrapper";

  const swiperContainer = document.createElement("div");
  swiperContainer.className = "swiper hero-swiper";

  const swiperWrapper = document.createElement("div");
  swiperWrapper.className = "swiper-wrapper";

  const thumbnails = [];

  rows.forEach((row, index) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";

    let thumbSrc = `https://via.placeholder.com/120x70?text=Slide+${index + 1}`;

    const videoLink = row.querySelector('a[href$=".mp4"]');
    const pictures = row.querySelectorAll("picture");

    // ---- VIDEO ----
    if (videoLink) {
      const videoEl = document.createElement("video");
      videoEl.src = resolveDamUrl(videoLink.href);
      videoEl.autoplay = true;
      videoEl.loop = true;
      videoEl.muted = true;
      videoEl.playsInline = true;

      slide.appendChild(videoEl);

      const img = pictures[0]?.querySelector("img");
      if (img) thumbSrc = img.currentSrc || img.src;
    }

    // ---- IMAGE ----
    else if (pictures.length > 0) {
      const mainPic = pictures[0].cloneNode(true);
      slide.appendChild(mainPic);

      const img = pictures[0].querySelector("img");
      if (img) thumbSrc = img.currentSrc || img.src;
    }

    thumbnails.push(thumbSrc);

    // ---- CTA BUTTON ----
    const btn = row.querySelector('a:not([href$=".mp4"])');
    if (btn) {
      const btnClone = btn.cloneNode(true);
      btnClone.classList.add("explore-btn", "button", "primary");
      slide.appendChild(btnClone);
    }

    swiperWrapper.appendChild(slide);
  });

  swiperContainer.appendChild(swiperWrapper);

  // ---- OVERLAY ----
  const overlay = document.createElement("div");
  overlay.className = "hero-overlay-container";

  const fraction = document.createElement("div");
  fraction.className = "hero-fraction";
  fraction.innerHTML = `
    <span class="current">1</span>
    <span class="divider">/</span>
    <span class="total">${thumbnails.length}</span>
  `;

  const pagination = document.createElement("div");
  pagination.className = "hero-thumbs-pagination swiper-pagination";

  overlay.appendChild(fraction);
  overlay.appendChild(pagination);
  swiperContainer.appendChild(overlay);

  wrapper.appendChild(swiperContainer);

  // Replace ONLY after everything is ready (safe for Universal Editor)
  block.innerHTML = "";
  block.appendChild(wrapper);

  // ---- INIT SWIPER ----
  try {
    new window.Swiper(swiperContainer, {
      slidesPerView: 1,
      loop: thumbnails.length > 1,

      pagination: {
        el: pagination,
        clickable: true,
        renderBullet: (index, className) => `
          <button class="${className} custom-thumb" aria-label="Go to slide ${index + 1}">
            <img src="${thumbnails[index]}" alt="Thumbnail ${index + 1}" />
          </button>
        `,
      },

      on: {
        slideChange() {
          const currentEl = fraction.querySelector(".current");
          if (currentEl) {
            currentEl.textContent = this.realIndex + 1;
          }
        },
      },
    });

    console.log("✅ Swiper initialized");
  } catch (e) {
    console.error("🚨 Swiper init error:", e);
  }
}
