export default function decorate(block) {
  const items = block.querySelectorAll(".item");

  items.forEach((item) => {
    const label = item.querySelector(".title");
    const body = item.querySelector(".description");

    if (!label || !body) return;

    const summary = document.createElement("summary");
    summary.className = "accordion-item-label";
    summary.append(...label.childNodes);

    const content = document.createElement("div");
    content.className = "accordion-item-body";
    content.append(...body.childNodes);

    const details = document.createElement("details");
    details.className = "accordion-item";

    details.append(summary, content);

    item.replaceWith(details);
  });
}
