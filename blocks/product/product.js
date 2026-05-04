export default function decorate(block) {
  // =========================================
  // GET VALID ROWS
  // =========================================

  const rows = [...block.children];

  const validRows = rows.filter((row) => {
    return row.textContent.trim() !== '' || row.querySelector('picture');
  });

  // =========================================
  // HEADER
  // =========================================

  const headerRow = validRows[0];

  if (headerRow) {
    headerRow.classList.add('product-header');

    // Existing authored columns
    const taglineWrapper = headerRow.children[0];
    const titleWrapper = headerRow.children[1];
    const ctaWrapper = headerRow.children[2];

    // =========================================
    // TAGLINE
    // =========================================

    const tagline =
      taglineWrapper?.querySelector('p');

    if (tagline) {
      tagline.classList.add('product-tagline');
    }

    // =========================================
    // TITLE CONTAINER
    // =========================================

    const productTitleWrapper =
      document.createElement('div');

    productTitleWrapper.classList.add('product-title');

    // Title text
    const title =
      titleWrapper?.querySelector('p');

    if (title) {
      productTitleWrapper.appendChild(title);
    }

    // =========================================
    // CTA
    // =========================================

    const ctaText =
      ctaWrapper?.querySelector('p');

    if (ctaText) {
      const cta = document.createElement('a');

      cta.classList.add('product-cta');

      // CTA Text
      const ctaLabel =
        document.createElement('span');

      ctaLabel.classList.add('product-cta-text');

      ctaLabel.textContent =
        ctaText.textContent;

      // CTA Arrow
      const ctaArrow =
        document.createElement('span');

      ctaArrow.classList.add('product-cta-arrow');

      const arrowImg =
        document.createElement('img');

      arrowImg.src = '/icons/arrow.svg';
      arrowImg.alt = 'arrow';

      ctaArrow.appendChild(arrowImg);

      // Assemble CTA
      cta.append(
        ctaLabel,
        ctaArrow
      );

      // Add CTA to title wrapper
      productTitleWrapper.appendChild(cta);
    }

    // =========================================
    // CLEAN TITLE WRAPPER
    // =========================================

    if (titleWrapper) {
      titleWrapper.replaceChildren(
        productTitleWrapper
      );
    }

    // Remove empty CTA column safely
    ctaWrapper?.remove();
  }

  // =========================================
  // CARD CONTAINER
  // =========================================

  const cardContainer =
    document.createElement('div');

  cardContainer.classList.add(
    'product-card-container'
  );

  // =========================================
  // CARDS
  // =========================================

  const cards = validRows.slice(1);

  cards.forEach((card) => {
    card.classList.add('product-card');

    const imageWrapper = card.children[0];
    const contentWrapper = card.children[1];

    // =========================================
    // IMAGE
    // =========================================

    imageWrapper?.classList.add(
      'product-image'
    );

    // =========================================
    // CONTENT
    // =========================================

    const newContentWrapper =
      document.createElement('div');

    newContentWrapper.classList.add(
      'product-content'
    );

    // Label
    const label =
      contentWrapper?.querySelector(
        'p:first-child'
      );

    if (label) {
      label.classList.add(
        'product-label'
      );

      newContentWrapper.appendChild(label);
    }

    // =========================================
    // ARROW
    // =========================================

    const arrow =
      contentWrapper?.querySelector('.icon');

    if (arrow) {
      const arrowWrapper =
        document.createElement('div');

      arrowWrapper.classList.add(
        'product-arrow'
      );

      arrowWrapper.appendChild(arrow);

      card.appendChild(arrowWrapper);
    }

    // Replace old content wrapper safely
    contentWrapper?.replaceWith(
      newContentWrapper
    );

    // Add card into container
    cardContainer.appendChild(card);
  });

  // =========================================
  // APPEND CARD CONTAINER
  // =========================================

  block.appendChild(cardContainer);

  // Move cards into container
  cards.forEach((card) => {
    cardContainer.appendChild(card);
  });
}