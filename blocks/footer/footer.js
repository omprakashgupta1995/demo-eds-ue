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

  // === ADDING CLASSES DYNAMICALLY ===
  const innerDivs = block.querySelectorAll('.footer-address.block > div > div');

  innerDivs.forEach((div, index) => {
    div.classList.add(`footer-inner-${index + 1}`); // Add class like footer-inner-1, footer-inner-2

    // Add class to <p>, <h3>, and <ul> inside each div
    div.querySelectorAll('p').forEach((p, i) => {
      p.classList.add(`footer-paragraph-${i + 1}`);
    });

    div.querySelectorAll('h3').forEach((h3, i) => {
      h3.classList.add(`footer-heading-${i + 1}`);
    });

    div.querySelectorAll('ul').forEach((ul, i) => {
      ul.classList.add(`footer-list-${i + 1}`);
    });
  });
} 