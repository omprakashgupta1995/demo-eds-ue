export default function decorate(block) {
  const box = block.querySelector(".banner.dhnn.block p:first-child img");

  // gsap.registerPlugin(ScrollTrigger);
  gsap.set(box, { y: 0 });
  const myAnimation = () => {
    gsap.to(box, {
      y: 30,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  };
  if (box.complete) {
    myAnimation();
  } else {
    box.addEventListener("load", myAnimation);
  }
}
