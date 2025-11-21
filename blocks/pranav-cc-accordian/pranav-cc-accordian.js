import { div } from "../../scripts/dom-helpers.js";

export default function decorate(block) {
  block.children[0].classList.add("cc-info-card-right");

  const leftDiv = div(
    { class: "cc-info-card-left" },
    ...Array.from(block.children).slice(1)
  );
  block.appendChild(leftDiv);
  leftDiv.children[0].classList.add("open");
  Array.from(leftDiv.children).forEach((child) => {
    child.classList.add("cc-accordian-item");
    const title = child.children[0];
    title.classList.add("cc-accordian-title");
    const content = child.children[1];
    content.classList.add("cc-accordian-content");

    if (title.childNodes.length > 1) {
      title.children[0].classList.add("cc-accordian-title-subtext");
      title.children[1].classList.add("cc-accordian-title-text");
    }

    title.addEventListener("click", () => {
      const isOpen = child.classList.contains("open");
      Array.from(leftDiv.children).forEach((sibling) => {
        sibling.classList.remove("open");
      });
      if (!isOpen) {
        child.classList.add("open");
      }
    });
  });
}
