import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
  // === ADDING CLASSES TO .footer-link-accordion.block ===
  const accordionBlocks = block.querySelectorAll('.footer-link-accordion.block > div');

  accordionBlocks.forEach((accordionDiv) => {
    accordionDiv.classList.add('footer-accordion-section');

    const subDivs = accordionDiv.querySelectorAll(':scope > div');

    subDivs.forEach((subDiv, index) => {
      if (index === 0) {
        subDiv.classList.add('footer-accordion-question');
      } else if (index === 1) {
        subDiv.classList.add('footer-accordion-answer');
      }

      subDiv.querySelectorAll('p').forEach((p) => {
        p.classList.add('footer-accordion-paragraph');
      });

      subDiv.querySelectorAll('ul').forEach((ul) => {
        ul.classList.add('footer-accordion-list');

        // Extra class to <ul> inside the second .accordion-section
        if (accordionDiv === accordionBlocks[1]) {
          ul.classList.add('footer-accordion-list-flex');
        }
      });
    });
  });
}
