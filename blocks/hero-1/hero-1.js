import swiper from "./swiper.min.js";
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
  // try {
  //   const response = await fetch(url, { method: "HEAD" });
  //   const contentType = response.headers.get("content-type");

  //   if (contentType?.startsWith("image/")) return "image";
  //   if (contentType?.startsWith("video/")) return "video";
  // } catch (e) {
  //   // silent fail → fallback below
  // }

  // :fire: fallback to extension check
  const ext = url.split(".").pop().toLowerCase().split("?")[0];
  if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext))
    return "image";
  if (["mp4", "webm", "ogg", "mov"].includes(ext)) return "video";

  return "unknown";
}
export default function decorate(block) {
  let blockParent = block.parentElement;
  blockParent.classList.add("swiper");
  block.classList.add("swiper-wrapper");
  let rows = [...block.children];
  rows.forEach((row) => {
    row.classList.add("swiper-slide");
    let image_wrapper = row.children?.[0];
    image_wrapper.classList.add("slide-image-wrapper");
    let main_slide_content = image_wrapper?.children[0];
    main_slide_content?.classList.add("main-slide-content");
    let bannerImage = main_slide_content.querySelector("img");
    bannerImage?.classList.add("hero-carousel-image");
    const anchor = image_wrapper.querySelector("a");
    if (anchor) {
      const url = resolveDamUrl(anchor.href);
      console.log(url);
      const type = getMediaTypeFromUrl(url);
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
    }
  });

  const mainSwiper = new swiper(blockParent, {
    // autoplay:{
    //     delay:3000,
    // }
  });
}
