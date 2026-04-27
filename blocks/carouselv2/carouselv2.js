import swiper from "../shared/swiper.min.js";

export default function decorate(block) {
  // Create wrapper
  const container = document.createElement("div");
  container.classList.add("carouselv2-container", "swiper");

  block.parentNode.insertBefore(container, block);
  container.appendChild(block);

  block.classList.add("swiper-wrapper");

  const items = Array.from(block.children);

  // Store thumbnails for pagination
  const thumbnails = [];

  items.forEach((slide, index) => {
    slide.classList.add("swiper-slide");

    // Detect media type via authoring (data attribute fallback)
    const mediaType = slide.dataset.mediatype || "image";

    if (mediaType === "video") {
      const videoUrl = slide.dataset.videourl;

      slide.innerHTML = `
        <video muted playsinline loop>
          <source src="${videoUrl}" type="video/mp4" />
        </video>
      `;
    } else {
      const img = slide.querySelector("img");
      if (img) {
        slide.innerHTML = "";
        slide.appendChild(img);
      }
    }

    // Thumbnail (fallback to image/video poster)
    const thumb =
      slide.dataset.thumbnail ||
      slide.querySelector("img")?.src ||
      "";

    thumbnails.push(thumb);
  });

  // Pagination container
  const pagination = document.createElement("div");
  pagination.classList.add("swiper-pagination");
  container.appendChild(pagination);

  // Init Swiper
  const swiperInstance = new swiper(container, {
    pagination: {
      el: pagination,
      clickable: true,
      renderBullet: function (index, className) {
        return `
          <span class="${className}">
            <img src="${thumbnails[index]}" />
          </span>
        `;
      },
    },

    on: {
      init: function () {
        handleVideo(this);
      },
      slideChange: function () {
        handleVideo(this);
      },
    },
  });

  // 🎥 Video control logic
  function handleVideo(swiper) {
    const videos = container.querySelectorAll("video");

    videos.forEach((video) => {
      video.pause();
    });

    const activeSlide = container.querySelector(
      ".swiper-slide-active video"
    );

    if (activeSlide) {
      activeSlide.play().catch(() => {});
    }
  }
}