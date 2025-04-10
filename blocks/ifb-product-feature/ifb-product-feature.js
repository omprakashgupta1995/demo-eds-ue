export default function decorate(block) {
  const blockChildren = block.children;
  Array.from(blockChildren).forEach(
    (divElement, index) => {
      divElement.classList.add(`div-container-${index + 1}`);
    },
  );

  const ifbProductFeatureSection = document.getElementsByClassName(
    'ifb-product-feature-container',
  );
  Array.from(ifbProductFeatureSection).forEach((divElement, index) => {
    divElement.classList.add(`ifb-product-feature-container-${index + 1}`);
  });

  // IFB-Hero-Banner
  const ifbHeroBannerContainer = document.querySelector(
    '.ifb-hero-banner div',
  ).children;
  ifbHeroBannerContainer[0].classList.add('ifb-hero-image');
  ifbHeroBannerContainer[1].classList.add('ifb-hero-heading-text');
  ifbHeroBannerContainer[2].classList.add('ifb-hero-btn-text-info');
  ifbHeroBannerContainer[3].classList.add('ifb-hero-btn');
}
