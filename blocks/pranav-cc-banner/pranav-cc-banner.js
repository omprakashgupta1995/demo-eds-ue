import { div } from "../../scripts/dom-helpers.js";

export default function decorate(block) {
  const bannerImage = block.children[0].querySelector("picture").parentElement;
  bannerImage.classList.add("banner-image");
  const headingElement = bannerImage.parentNode.nextElementSibling;
  const subHeading = headingElement.nextElementSibling;
  const leftContent = div(
    { class: "left-content" },
    ...[headingElement, subHeading]
  );
  bannerImage.parentElement.remove();
  const rightContent = div(
    { class: "right-content" },
    ...Array.from(block.children)
  );
  block.appendChild(bannerImage);
  block.appendChild(leftContent);
  block.appendChild(rightContent);

  rightContent.querySelectorAll("picture").forEach((picture) => {
    picture.parentElement.classList.add("icon-image");
    picture.parentElement.nextElementSibling.classList.add("icon-text");
  });

  Array.from(rightContent.children).forEach((point) => {
    point.classList.add("banner-point");
  });
}
