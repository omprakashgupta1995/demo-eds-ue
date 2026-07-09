/**
 * Testimonials Block - Featured projects portfolio section with alternating layout
 * Displays project cards with image and content in alternating positions
 * @param {HTMLElement} block - The block element
 */
export default function decorate(block) {
  // Get all rows in the block
  const rows = [...block.children];

  // Process the introduction section (first row - title and description)
  if (rows.length > 0) {
    const introRow = rows[0];
    introRow.classList.add('testimonials-intro-section');

    const intCells = [...introRow.children];
    if (intCells[0]) {
      intCells[0].classList.add('testimonials-intro-left');
    }
    if (intCells[1]) {
      intCells[1].classList.add('testimonials-intro-right');
    }
  }

  // Process project cards (remaining rows - alternating layout)
  if (rows.length > 1) {
    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('testimonials-cards-container');

    for (let i = 1; i < rows.length; i++) {
      const cardRow = rows[i];
      cardRow.classList.add('testimonials-card', `card-position-${i % 2 === 1 ? 'even' : 'odd'}`);

      const cells = [...cardRow.children];

      // First cell - image
      if (cells[0]) {
        cells[0].classList.add('card-image-cell');
        const picture = cells[0].querySelector('picture');
        if (picture) {
          picture.classList.add('card-image');
        }
      }

      // Second cell - content
      if (cells[1]) {
        cells[1].classList.add('card-content-cell');
      }

      block.appendChild(cardRow);
    }
  }
}
