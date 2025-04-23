import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Loads and decorates the header, mainly the nav.
 * Only loads the fragment and appends it without any mobile-specific JS.
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // Load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  // Decorate nav DOM
  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  const classes = ['head', 'brand', 'sections', 'tools'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  const navBrand = nav.querySelector('.nav-brand');
  const brandLink = navBrand?.querySelector('.button');
  if (brandLink) {
    brandLink.className = '';
    brandLink.closest('.button-container').className = '';
  }

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);

  // Move nav-head to nav-wrapper if it exists
  const navHead = document.querySelector('.nav-head');
  if (navHead) {
    navWrapper.insertBefore(navHead, navWrapper.firstChild);
  }

  navWrapper.classList.add('nav-block');
  const childNav = navWrapper.children[1];
  childNav.classList.add('logo-nav-block');
  const navChild = childNav.children;
  Array.from(navChild).forEach((navElement, index) => {
    navElement.classList.add(`logo-nav-block-child-${index + 1}`);
  });

  const dropDownList = document.querySelector('.nav-drop ul');
  Array.from(dropDownList?.children || []).forEach((liElement) => {
    liElement.classList.add('flex-list');
  });
}
