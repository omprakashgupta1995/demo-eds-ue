import swiper from "./swiper.min.js";
function resolveDamUrl(path) {
  try {
    const url = new URL(path, window.location.origin);
    if (url.pathname.startsWith("/content/dam")) {
      return `https://publish-p48457-e1275402.adobeaemcloud.com${url.pathname}`;
    }
    return path;
  } catch (e) {
    return path;
  }
}

async function getMediaTypeFromUrl(url) {
  // try {
  //   const response = await fetch(url, { method: "HEAD" });
  //   const contentType = response.headers.get("content-type");

  //   if (contentType?.startsWith("image/")) return "image";
  //   if (contentType?.startsWith("video/")) return "video";
  // } catch (e) {
  //   // silent fail → fallback below
  // }

  // fallback to extension check
  const ext = url.split(".").pop().toLowerCase().split("?")[0];
  if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext))
    return "image";
  if (["mp4", "webm", "ogg", "mov"].includes(ext)) return "video";

  return "unknown";
}

export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;
  block.parentElement.classList.add("swiper");
  const blockParent = block.parentElement;
  // create thumbs container
  const thumbsContainer = document.createElement("div");
  thumbsContainer.classList.add("hero-thumbs-swiper", "swiper");
  const thumbsWrapper = document.createElement("div");
  thumbsWrapper.classList.add("swiper-wrapper", "thumbs-swiper-wrapper");
  thumbsContainer.appendChild(thumbsWrapper);
  blockParent.appendChild(thumbsContainer);
  block.classList.add("swiper-wrapper");

//  process all rows in parallel
  await Promise.all(
    rows.map(async (row) => {
      row.classList.add("hero-carousel-slide", "swiper-slide");
      const wrapper = row.children?.[0];
      const ctaWrapper = row.children?.[1];
      ctaWrapper.classList.add('ctaWrapper');
      if(ctaWrapper.querySelector('p')){
          let ctaButton =ctaWrapper?.children?.[0];
          ctaButton.classList.add('cta-button');
      }
      const thumbnailNode = row.children?.[2]; // your 3rd column
      const thumbNail_img = thumbnailNode?.querySelector("img");
      if (thumbNail_img) {
        const thumbSlide = document.createElement("div");
        thumbSlide.classList.add("hero-thumb-swiper-slide", "swiper-slide");
        const thumbImg = document.createElement("img");
        thumbImg.src = thumbNail_img.src;
        thumbImg.classList.add("hero-thumb-image");
        thumbSlide.appendChild(thumbImg);
        thumbsWrapper.appendChild(thumbSlide);
      }
      thumbnailNode?.remove();
      if (!wrapper) return;
      wrapper.classList.add("slide-image-wrapper");
      const anchor = wrapper.querySelector("a");
      if (anchor) {
        const url = resolveDamUrl(anchor.href);
        console.log(url);
        const type = await getMediaTypeFromUrl(url);
        console.log(type);
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
        } else {
          return;
        }
        anchor.parentNode.insertBefore(mediaElement, anchor);
        anchor.remove();
        // anchor.replaceWith(mediaElement);
      } else {
        const heroCarouselImage = wrapper.querySelector("img");
        if (heroCarouselImage) {
          console.log("IMAGE FOUND");
          heroCarouselImage.classList.add("hero-carousel-image");
        }
      }
    }),
  );
  const thumbsSwiper = new swiper(thumbsContainer, {
    slidesPerView: 'auto',
    spaceBetween: 12,
    watchSlidesProgress: true,
    slideToClickedSlide: true,
  });
  const mainSwiper = new swiper(blockParent, {
  loop: true,
  loopedSlides: rows.length,
  watchSlidesProgress: true,
  thumbs: {
    swiper: thumbsSwiper,
  },
});
 
}
