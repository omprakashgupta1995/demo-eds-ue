export default function decorate(block) {
  block.parentElement.previousElementSibling.classList.add(
    "pranav-cc-services-header"
  );
  const servicesCards = Array.from(block.children);
  servicesCards.forEach(function (el) {
    let toggle = el.children[0];
    el.classList.add("cc-services-card");
    toggle.classList.add("cc-services-card-toggle");
    el.children[1].classList.add("cc-services-card-image");
    el.children[2].classList.add("cc-services-card-content");

    if (toggle.textContent === "" ? null : toggle.textContent === "true") {
      el.classList.add("cc-services-reverse");
    }
  });
}
