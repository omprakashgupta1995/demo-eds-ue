export default function decorate(block) {
  block.classList.add("banner-root");

  // First two children
  const [imageSection, contentSection] = block.children;

  imageSection.classList.add("banner-image");
  contentSection.classList.add("banner-content");

  // Inner content container
  const contentWrapper = contentSection.querySelector("div");
  contentWrapper.classList.add("banner-text");

  // Now detect feature icons & text
  const elements = Array.from(contentWrapper.children);

  const features = [];
  for (let i = 3; i < elements.length; i += 2) {
    const iconWrapper = elements[i];
    const textWrapper = elements[i + 1];

    if (!iconWrapper || !textWrapper) break;

    const feature = document.createElement("div");
    feature.classList.add("banner-feature");

    iconWrapper.classList.add("banner-feature-icon");
    textWrapper.classList.add("banner-feature-text");

    feature.appendChild(iconWrapper);
    feature.appendChild(textWrapper);

    features.push(feature);
  }

  // Create features container
  const featuresContainer = document.createElement("div");
  featuresContainer.classList.add("banner-features");

  features.forEach((f) => featuresContainer.appendChild(f));

  contentWrapper.appendChild(featuresContainer);
}
