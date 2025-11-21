import { div } from "../../scripts/dom-helpers.js";

export default function decorate(block) {
  Array.from(block.children).forEach((card) => {
    card.classList.add("discover-card");
    const hr = document.createElement("hr");
    card.children[0].appendChild(hr);
    card.children[1].classList.add("discover-card-content");
    const cardLinks = div(
      { class: "discover-card-links" },
      ...Array.from(card.querySelectorAll(".button-container"))
    );
    card.children[1].appendChild(cardLinks);

    Array.from(
      cardLinks.querySelectorAll(".button-container .button")
    )[0].classList.add("btn-red");
    Array.from(
      cardLinks.querySelectorAll(".button-container .button")
    )[1].classList.add("btn-link");
  });
}
