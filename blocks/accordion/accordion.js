export default function decorate(block) {
  // Get all title and description pairs
  const titles = block.querySelectorAll('[data-field="title"]');
  const descriptions = block.querySelectorAll('[data-field="description"]');

  // Clear the block
  block.innerHTML = "";

  // Create accordion items
  for (let i = 0; i < titles.length; i++) {
    const details = document.createElement("details");
    details.className = "accordion-item";

    const summary = document.createElement("summary");
    summary.className = "accordion-item-label";
    summary.textContent = titles[i].textContent;

    const body = document.createElement("div");
    body.className = "accordion-item-body";
    body.innerHTML = descriptions[i].innerHTML;

    details.append(summary, body);
    block.append(details);
  }
}
