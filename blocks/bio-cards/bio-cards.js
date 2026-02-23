export default function decorate(block) {
  console.log("Block console", block);

  // Each direct child is a bio card (one per row)
  //   [...block.children].forEach((card) => {
  //     card.classList.add("bio-cards-slide");

  //     // Each card has two columns: image + content
  //     const [imgWrapper, contentWrapper] = [...card.children];
  //     if (!imgWrapper || !contentWrapper) return;

  //     imgWrapper.classList.add("bio-card-img");
  //     contentWrapper.classList.add("bio-card-content");

  //     // Content wrapper contains: name, designation, description, button
  //     const [name, designation, description, buttonContainer] = [
  //       ...contentWrapper.children,
  //     ];

  //     name?.classList.add("bio-card-name");
  //     designation?.classList.add("bio-card-designation");
  //     description?.classList.add("bio-card-description");
  //     buttonContainer?.classList.add("bio-card-btn-text");

  //     console.log("Card:", { name, designation, description });
  //   });
}
