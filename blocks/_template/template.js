import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children].filter((row) => {
    return row.textContent.trim() !== '' || row.querySelector('picture');
  });

  if (!rows.length) return;

  block.classList.add('template-block');

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length < 2) return;

    const contentCell = cells[1];

    const heading = contentCell.querySelector('p:first-of-type');
    const description = contentCell.querySelector('p:nth-of-type(2)');
    const ctaLink = contentCell.querySelector('a');

    const card = document.createElement('div');
    card.className = 'template-card';

    if (cells[0].querySelector('picture')) {
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'template-image';
      const picture = cells[0].querySelector('picture');
      moveInstrumentation(picture, imageWrapper);
      imageWrapper.appendChild(picture);
      card.appendChild(imageWrapper);
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'template-content';

    if (heading) {
      const h2 = document.createElement('h2');
      h2.className = 'template-heading';
      h2.textContent = heading.textContent;
      moveInstrumentation(heading, h2);
      contentWrapper.appendChild(h2);
    }

    if (description) {
      const p = document.createElement('p');
      p.className = 'template-description';
      p.textContent = description.textContent;
      moveInstrumentation(description, p);
      contentWrapper.appendChild(p);
    }

    if (ctaLink) {
      const cta = document.createElement('a');
      cta.className = 'template-cta button';
      cta.href = ctaLink.href;
      cta.textContent = ctaLink.textContent || 'Read More';
      moveInstrumentation(ctaLink, cta);
      contentWrapper.appendChild(cta);
    }

    card.appendChild(contentWrapper);
    block.appendChild(card);
  });

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