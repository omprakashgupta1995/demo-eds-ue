// export default function decorate(block) {
//   const rows = [...block.children];

//   // =========================================
//   // REMOVE EMPTY EDS ROWS
//   // =========================================

//   const validRows = rows.filter((row) => {
//     return row.textContent.trim() !== '' || row.querySelector('picture');
//   });

//   // Clear block completely
//   block.replaceChildren();

//   // =========================================
//   // HEADER
//   // =========================================

//   const headerRow = validRows[0];

//   if (headerRow) {
//     const taglineText =
//       headerRow.children[0]?.querySelector('p');

//     const titleText =
//       headerRow.children[1]?.querySelector('p');

//     const ctaText =
//       headerRow.children[2]?.querySelector('p');

//     // Main Header Wrapper
//     const productHeader = document.createElement('div');
//     productHeader.classList.add('product-header');

//     // Tagline
//     const tagline = document.createElement('p');
//     tagline.classList.add('product-tagline');

//     if (taglineText) {
//       tagline.textContent = taglineText.textContent;
//     }

//     // Title Wrapper
//     const titleWrapper = document.createElement('div');
//     titleWrapper.classList.add('product-title');

//     // Title
//     const title = document.createElement('p');

//     if (titleText) {
//       title.textContent = titleText.textContent;
//     }

//     // CTA
//     const cta = document.createElement('a');
//     cta.classList.add('product-cta');

//     if (ctaText) {
//       cta.textContent = ctaText.textContent;
//     }

//     // Append Title + CTA
//     titleWrapper.append(title, cta);

//     // Append everything
//     productHeader.append(tagline, titleWrapper);

//     // Add header to block
//     block.append(productHeader);
//   }

//   // =========================================
//   // PRODUCT CARD CONTAINER
//   // =========================================

//   const cardContainer = document.createElement('div');
//   cardContainer.classList.add('product-card-container');

//   // =========================================
//   // CARDS
//   // =========================================

//   const cards = validRows.slice(1);

//   cards.forEach((row) => {
//     const imageWrapper = row.children[0];
//     const contentWrapper = row.children[1];

//     const picture = imageWrapper?.querySelector('picture');

//     const label =
//       contentWrapper?.querySelector('p:first-child');

//     const arrow =
//       contentWrapper?.querySelector('.icon');

//     // Main Card
//     const card = document.createElement('div');
//     card.classList.add('product-card');

//     // Image Wrapper
//     const cardImage = document.createElement('div');
//     cardImage.classList.add('product-image');

//     if (picture) {
//       cardImage.appendChild(picture);
//     }

//     // Content Wrapper
//     const cardContent = document.createElement('div');
//     cardContent.classList.add('product-content');

//     // Label
//     const cardLabel = document.createElement('p');
//     cardLabel.classList.add('product-label');

//     if (label) {
//       cardLabel.textContent = label.textContent;
//     }

//     // Arrow
//     const cardArrow = document.createElement('div');
//     cardArrow.classList.add('product-arrow');

//     if (arrow) {
//       cardArrow.appendChild(arrow);
//     }

//     // Assemble Card
//     cardContent.append(cardLabel);

//     card.append(
//       cardImage,
//       cardContent,
//       cardArrow
//     );

//     // Add card to container
//     cardContainer.append(card);
//   });

//   // Add cards container to block
//   block.append(cardContainer);
// }

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