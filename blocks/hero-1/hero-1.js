import Swiper from "./swiper.min.js";

function resolveDamUrl(path) {
  try {
    const url = new URL(path, window.location.origin);

    // Only keep the DAM path
    if (url.pathname.startsWith("/content/dam")) {
      return `https://publish-p48457-e1275402.adobeaemcloud.com${url.pathname}`;
    }
    return path;
  } catch (e) {
    return path;
  }
}

function getMediaTypeFromUrl(url) {
  const ext = url.split(".").pop().toLowerCase().split("?")[0];
  if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext)) {
    return "image";
  }
  if (["mp4", "webm", "ogg", "mov"].includes(ext)) return "video";

  return "unknown";
}

function updateSlideState(swiper, thumbnails, exploreButtons) {
  const activeIndex = swiper.activeIndex || 0;
  thumbnails.forEach((thumb, index) => {
    if (!thumb) return;
    thumb.classList.toggle("active", index === activeIndex);
  });
  exploreButtons.forEach((button, index) => {
    if (!button) return;
    button.style.display =
      index > 0 && index === activeIndex ? "inline-flex" : "none";
  });
}

function getExistingThumbnailElement(row, bannerImage) {
  const images = Array.from(row.querySelectorAll("img")).filter(
    (img) => img !== bannerImage,
  );
  if (!images.length) return null;
  const thumbnailImage = images[0];
  const thumbnailAnchor = thumbnailImage.closest("a");
  return thumbnailAnchor || thumbnailImage.parentElement || thumbnailImage;
}

export default function decorate(block) {
  const blockParent = block.parentElement;
  blockParent.classList.add("swiper", "hero-1-swiper");
  block.classList.add("swiper-wrapper");

  const rows = [...block.children];
  const thumbnails = [];
  const exploreButtons = [];
  let swiper = null;

  const thumbnailsBar = document.createElement("div");
  thumbnailsBar.classList.add("hero-1-thumbnails");
  blockParent.appendChild(thumbnailsBar);

  const swiperPagination = document.createElement("div");
  swiperPagination.classList.add("swiper-pagination");
  blockParent.appendChild(swiperPagination);

  rows.forEach((row, index) => {
    row.classList.add("swiper-slide");
    row.dataset.slideIndex = index;

    const imageWrapper = row.children?.[0];
    imageWrapper?.classList.add("slide-image-wrapper");
    const mainSlideContent = imageWrapper?.children[0];
    mainSlideContent?.classList.add("main-slide-content");
    const bannerImage = mainSlideContent?.querySelector("img");
    bannerImage?.classList.add("hero-carousel-image");

    const anchor = imageWrapper?.querySelector("a");
    if (anchor) {
      const url = resolveDamUrl(anchor.href);
      const type = getMediaTypeFromUrl(url);
      let mediaElement;

      if (type === "image") {
        mediaElement = document.createElement("img");
        mediaElement.src = url;
        mediaElement.classList.add("hero-carousel-image");
      } else if (type === "video") {
        mediaElement = document.createElement("video");
        mediaElement.src = url;
        mediaElement.classList.add("hero-carousel-video");
        mediaElement.autoplay = true;
        mediaElement.loop = true;
        mediaElement.muted = true;
        mediaElement.playsInline = true;
      }

      if (mediaElement) {
        anchor.parentNode.insertBefore(mediaElement, anchor);
        anchor.remove();
      }
    }

    const thumbnailElement = getExistingThumbnailElement(row, bannerImage);
    if (thumbnailElement) {
      thumbnailElement.classList.add("hero-carousel-thumb");
      thumbnailElement.dataset.slideIndex = index;
      thumbnailElement.setAttribute("role", "button");
      thumbnailElement.style.cursor = "pointer";
      thumbnailElement.addEventListener("click", (event) => {
        event.preventDefault();
        if (swiper) swiper.slideTo(index);
      });
      thumbnailsBar.appendChild(thumbnailElement);
      thumbnails.push(thumbnailElement);
    } else {
      thumbnails.push(null);
    }

    const allAnchors = Array.from(row.querySelectorAll("a"));
    const ctaAnchor = allAnchors.find(
      (anchorElement) => !anchorElement.closest(".hero-carousel-thumb"),
    );
    if (ctaAnchor && index > 0) {
      const exploreButton = document.createElement("a");
      exploreButton.href = ctaAnchor.href;
      exploreButton.textContent = "EXPLORE NOW";
      exploreButton.classList.add("hero-explore-button");
      exploreButton.target = ctaAnchor.target || "_self";
      exploreButton.setAttribute(
        "aria-label",
        ctaAnchor.textContent.trim() || "Explore now",
      );
      row.appendChild(exploreButton);
      ctaAnchor.remove();
      exploreButtons.push(exploreButton);
    } else {
      exploreButtons.push(null);
    }
  });

  swiper = new Swiper(blockParent, {
    slideToClickedSlide: true,
    pagination: {
      el: swiperPagination,
      type: "fraction",
      clickable: true,
    },
  });

  swiper.on("slideChange", () =>
    updateSlideState(swiper, thumbnails, exploreButtons),
  );
  updateSlideState(swiper, thumbnails, exploreButtons);

  return swiper;
}
