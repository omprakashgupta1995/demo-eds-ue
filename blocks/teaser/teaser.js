export default function decorate(block) {
  const teaserImage = block.querySelector("picture img");

  // If no image is found, stop here
  if (!teaserImage) return;

  // CRITICAL CHECK: Is GSAP actually loaded on the page?
  if (typeof gsap === "undefined") {
    return;
  }

  gsap.set(teaserImage, { x: 0, opacity: 1 });

  const animateIn = () => {
    gsap.to(teaserImage, {
      x: 1000,
      duration: 3,
      ease: "power1.inOut",
      delay: 0.2,
      repeat: -1,
      yoyo: true,
    });
  };

  if (teaserImage.complete) {
    animateIn();
  } else {
    teaserImage.addEventListener("load", animateIn);
  }
}
