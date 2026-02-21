export default function decorate(block) {
  // Each direct child is a bio card (one per row)
  [...block.children].forEach((card) => {
    card.classList.add('bio-cards-slide');

    // Each card has two columns: image + content
    const [imgWrapper, contentWrapper] = [...card.children];
    if (!imgWrapper || !contentWrapper) return;

    // Check if first cell contains classes (text content like "bio-card, featured")
    const classText = imgWrapper.textContent.trim();
    if (classText && !imgWrapper.querySelector('img, picture')) {
      // Extract classes and apply them to the card
      const classes = classText.split(',').map(c => c.trim()).filter(c => c);
      classes.forEach((cls) => card.classList.add(cls));
      // Remove the class text cell
      imgWrapper.remove();
      // Reassign wrappers after removal
      const [newImgWrapper, newContentWrapper] = [...card.children];
      newImgWrapper?.classList.add('bio-card-img');
      newContentWrapper?.classList.add('bio-card-content');

      // Content wrapper contains: name, designation, description, button
      const [name, designation, description, buttonContainer] = [
        ...newContentWrapper.children,
      ];

      name?.classList.add('bio-card-name');
      designation?.classList.add('bio-card-designation');
      description?.classList.add('bio-card-description');
      buttonContainer?.classList.add('bio-card-btn-text');
    } else {
      // No classes, proceed normally
      imgWrapper.classList.add('bio-card-img');
      contentWrapper.classList.add('bio-card-content');

      // Content wrapper contains: name, designation, description, button
      const [name, designation, description, buttonContainer] = [
        ...contentWrapper.children,
      ];

      name?.classList.add('bio-card-name');
      designation?.classList.add('bio-card-designation');
      description?.classList.add('bio-card-description');
      buttonContainer?.classList.add('bio-card-btn-text');
    }

    console.log('Card:', { card });
  });
}
