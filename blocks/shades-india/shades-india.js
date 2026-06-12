import { createOptimizedPicture, moveInstrumentation } from '../../scripts/aem.js';

export default function decorate(block) {
  const rows = [...block.children].filter((row) => {
    return row.textContent.trim() !== '' || row.querySelector('picture');
  });

  if (!rows.length) return;

  block.textContent = '';
  block.classList.add('shades-india');

  const introRow = rows[0];
  const introCells = introRow ? [...introRow.children] : [];

  const leftCol = document.createElement('div');
  leftCol.className = 'shades-india-left';

  const heading = introCells[0]?.querySelector('p, h2, h3');
  if (heading) {
    const h2 = document.createElement('h2');
    h2.className = 'shades-india-heading';
    h2.textContent = heading.textContent;
    moveInstrumentation(heading, h2);
    leftCol.appendChild(h2);
  }

  const description = introCells[1]?.querySelector('p');
  if (description) {
    const p = document.createElement('p');
    p.className = 'shades-india-description';
    p.textContent = description.textContent;
    moveInstrumentation(description, p);
    leftCol.appendChild(p);
  }

  const ctaLink = introCells[2]?.querySelector('a');
  if (ctaLink) {
    const cta = document.createElement('a');
    cta.className = 'shades-india-cta button';
    cta.href = ctaLink.href;
    cta.textContent = ctaLink.textContent || 'Discover';
    moveInstrumentation(ctaLink, cta);
    leftCol.appendChild(cta);
  }

  const rightCol = document.createElement('div');
  rightCol.className = 'shades-india-right';

  if (introCells[3]?.querySelector('picture') || introCells[3]?.querySelector('img')) {
    const featuredImg = document.createElement('div');
    featuredImg.className = 'shades-india-featured-image';
    const pic = introCells[3].querySelector('picture') || introCells[3].querySelector('img');
    moveInstrumentation(pic, featuredImg);
    featuredImg.appendChild(pic);
    rightCol.appendChild(featuredImg);
  }

  const featuredTitle = introCells[4]?.querySelector('p');
  if (featuredTitle) {
    const h3 = document.createElement('h3');
    h3.className = 'shades-india-featured-title';
    h3.textContent = featuredTitle.textContent;
    moveInstrumentation(featuredTitle, h3);
    rightCol.appendChild(h3);
  }

  const featuredCta = introCells[5]?.querySelector('a');
  if (featuredCta) {
    const link = document.createElement('a');
    link.className = 'shades-india-featured-cta button secondary';
    link.href = featuredCta.href;
    link.textContent = featuredCta.textContent || 'Read Article';
    moveInstrumentation(featuredCta, link);
    rightCol.appendChild(link);
  }

  const topSection = document.createElement('div');
  topSection.className = 'shades-india-top';
  topSection.appendChild(leftCol);
  topSection.appendChild(rightCol);
  block.appendChild(topSection);

  const regionRows = rows.slice(1);
  if (regionRows.length > 0) {
    const carouselWrapper = document.createElement('div');
    carouselWrapper.className = 'shades-india-carousel-wrapper';

    const carousel = document.createElement('div');
    carousel.className = 'shades-india-carousel';

    regionRows.forEach((row) => {
      const cells = [...row.children];
      const card = document.createElement('div');
      card.className = 'shades-india-card';

      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'shades-india-card-image';
      const pic = cells[0]?.querySelector('picture') || cells[0]?.querySelector('img');
      if (pic) {
        moveInstrumentation(pic, imageWrapper);
        imageWrapper.appendChild(pic);
      }

      const labelWrapper = document.createElement('div');
      labelWrapper.className = 'shades-india-card-label';
      const regionName = cells[1]?.textContent.trim();
      if (regionName) {
        const label = document.createElement('span');
        label.className = 'shades-india-card-region';
        const prefix = document.createElement('span');
        prefix.className = 'shades-india-card-prefix';
        prefix.textContent = 'COLOURS OF';
        const name = document.createElement('span');
        name.className = 'shades-india-card-name';
        name.textContent = regionName;
        label.appendChild(prefix);
        label.appendChild(name);
        labelWrapper.appendChild(label);
      }

      card.appendChild(imageWrapper);
      card.appendChild(labelWrapper);
      carousel.appendChild(card);
    });

    carouselWrapper.appendChild(carousel);

    if (regionRows.length > 1) {
      const prevBtn = document.createElement('button');
      prevBtn.className = 'shades-india-arrow shades-india-prev';
      prevBtn.setAttribute('aria-label', 'Previous');
      prevBtn.textContent = '\u2039';

      const nextBtn = document.createElement('button');
      nextBtn.className = 'shades-india-arrow shades-india-next';
      nextBtn.setAttribute('aria-label', 'Next');
      nextBtn.textContent = '\u203A';

      carouselWrapper.appendChild(prevBtn);
      carouselWrapper.appendChild(nextBtn);

      let scrollPos = 0;
      const cardWidth = 280;

      prevBtn.addEventListener('click', () => {
        scrollPos = Math.max(0, scrollPos - cardWidth);
        carousel.scrollTo({ left: scrollPos, behavior: 'smooth' });
      });

      nextBtn.addEventListener('click', () => {
        scrollPos = Math.min(carousel.scrollWidth - carousel.clientWidth, scrollPos + cardWidth);
        carousel.scrollTo({ left: scrollPos, behavior: 'smooth' });
      });
    }

    block.appendChild(carouselWrapper);
  }

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(
      img.src,
      img.alt || '',
      false,
      [{ width: '750' }]
    );
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}