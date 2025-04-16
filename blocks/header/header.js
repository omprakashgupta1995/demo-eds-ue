// Modified header.js with fixed submenu toggle behavior
import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// Media query match that indicates desktop width
const isDesktop = window.matchMedia('(min-width: 900px)');

// Create a utility object to hold all our functions
const navUtils = {
  /**
   * Toggles all nav sections
   * @param {Element} sections The container element
   * @param {Boolean} expanded Whether the element should be expanded or collapsed
   */
  toggleAllNavSections(sections, expanded = false) {
    if (!sections) return;

    sections
      .querySelectorAll('.nav-sections .default-content-wrapper > ul > li')
      .forEach((section) => section.setAttribute('aria-expanded', expanded));
  },

  /**
   * Open navigation section on keydown
   * @param {Event} e The keyboard event
   */
  openOnKeydown(e) {
    const focused = document.activeElement;
    if (focused.className === 'nav-drop' && (e.code === 'Enter' || e.code === 'Space')) {
      const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
      navUtils.toggleAllNavSections(focused.closest('.nav-sections'));
      focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
    }
  },

  /**
   * Focus navigation section on focus
   */
  focusNavSection() {
    document.activeElement.addEventListener('keydown', navUtils.openOnKeydown);
  },

  /**
   * Close navigation on escape keypress
   * @param {Event} e The keyboard event
   */
  closeOnEscape(e) {
    if (e.code === 'Escape') {
      const nav = document.getElementById('nav');
      const navSections = nav.querySelector('.nav-sections');
      const navSectionExpanded = navSections?.querySelector('[aria-expanded="true"]');

      if (navSectionExpanded && isDesktop.matches) {
        navUtils.toggleAllNavSections(navSections);
        navSectionExpanded.focus();
      } else if (!isDesktop.matches) {
        navUtils.toggleMenu(nav, navSections);
        nav.querySelector('button')?.focus();
      }
    }
  },

  /**
   * Close navigation on focus lost
   * @param {Event} e The focusout event
   */
  closeOnFocusLost(e) {
    const nav = e.currentTarget;
    if (!nav.contains(e.relatedTarget)) {
      const navSections = nav.querySelector('.nav-sections');
      const navSectionExpanded = navSections?.querySelector('[aria-expanded="true"]');

      if (navSectionExpanded && isDesktop.matches) {
        navUtils.toggleAllNavSections(navSections, false);
      } else if (!isDesktop.matches) {
        navUtils.toggleMenu(nav, navSections, false);
      }
    }
  },

  /**
   * Toggles the entire nav
   * @param {Element} nav The container element
   * @param {Element} navSections The nav sections within the container element
   * @param {*} forceExpanded Optional param to force nav expand behavior when not null
   */
  toggleMenu(nav, navSections, forceExpanded = null) {
    if (!nav || !navSections) return;

    const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
    const button = nav.querySelector('.nav-hamburger button');
    document.body.style.overflowY = expanded || isDesktop.matches ? '' : 'hidden';
    nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');

    navUtils.toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
    if (button) {
      button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
    }

    const navDrops = navSections.querySelectorAll('.nav-drop');
    if (isDesktop.matches) {
      navDrops.forEach((drop) => {
        if (!drop.hasAttribute('tabindex')) {
          drop.setAttribute('tabindex', 0);
          drop.addEventListener('focus', navUtils.focusNavSection);
        }
      });
    } else {
      navDrops.forEach((drop) => {
        drop.removeAttribute('tabindex');
        drop.removeEventListener('focus', navUtils.focusNavSection);
      });
    }

    if (!expanded || isDesktop.matches) {
      window.addEventListener('keydown', navUtils.closeOnEscape);
      nav.addEventListener('focusout', navUtils.closeOnFocusLost);
    } else {
      window.removeEventListener('keydown', navUtils.closeOnEscape);
      nav.removeEventListener('focusout', navUtils.closeOnFocusLost);
    }
  },
  
  /**
   * Toggle submenu on arrow click (mobile view)
   * @param {Event} e The click event
   */
  toggleSubMenu(e) {
    if (!isDesktop.matches) {
      e.preventDefault();
      e.stopPropagation();
      
      // Find the parent li element
      let navItem = e.currentTarget.closest('li');
      
      if (navItem) {
        const expanded = navItem.getAttribute('aria-expanded') === 'true';
        navItem.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        
        // Toggle arrow direction
        const arrow = e.currentTarget;
        arrow.style.transform = expanded ? 'rotate(0deg)' : 'rotate(180deg)';
      }
    }
  }
};

/**
 * Loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';

  // Append fragment elements to the nav
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  // Apply classes to nav sections
  ['head', 'brand', 'sections', 'tools'].forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  // Clean up brand link
  const navBrand = nav.querySelector('.nav-brand');
  const brandLink = navBrand?.querySelector('.button');
  if (brandLink) {
    brandLink.className = '';
    const buttonContainer = brandLink.closest('.button-container');
    if (buttonContainer) buttonContainer.className = '';
  }

  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    // Process main menu items
    navSections
      .querySelectorAll(':scope .default-content-wrapper > ul > li')
      .forEach((navSection) => {
        if (navSection.querySelector('ul')) {
          navSection.classList.add('nav-drop');
          
          // Create the arrow element
          const arrowElement = document.createElement('span');
          arrowElement.className = 'nav-arrow';
          arrowElement.innerHTML = '&#9662;'; // Down arrow Unicode
          arrowElement.setAttribute('tabindex', '0');
          arrowElement.setAttribute('role', 'button');
          arrowElement.setAttribute('aria-label', 'Toggle submenu');
          
          // Make arrow only toggle the submenu on click, not the entire menu item
          arrowElement.addEventListener('click', navUtils.toggleSubMenu);
          
          // Add the arrow to the menu item
          navSection.appendChild(arrowElement);
        }

        // Handle hover for desktop
        navSection.addEventListener('mouseover', () => {
          if (isDesktop.matches) {
            const expanded = navSection.getAttribute('aria-expanded') === 'true';
            navUtils.toggleAllNavSections(navSections);
            navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
          }
        });
        
        // Prevent the link from toggling the submenu
        const navLink = navSection.querySelector('a');
        if (navLink && !isDesktop.matches) {
          navLink.addEventListener('click', (e) => {
            // Only prevent default if we have submenus
            if (navSection.querySelector('ul')) {
              e.stopPropagation();
            }
          });
        }
      });
      
    // Process all submenu items (inside dropdown menus)
    navSections.querySelectorAll('.nav-drop ul li').forEach((subNavItem) => {
      if (subNavItem.querySelector('ul')) {
        // Add arrow to submenu items that have their own nested submenus
        const subArrowElement = document.createElement('span');
        subArrowElement.className = 'nav-arrow submenu-arrow';
        subArrowElement.innerHTML = '&#9662;'; // Down arrow Unicode
        subArrowElement.setAttribute('tabindex', '0');
        subArrowElement.setAttribute('role', 'button');
        subArrowElement.setAttribute('aria-label', 'Toggle submenu');
        
        // Make arrow only toggle its nested submenu
        subArrowElement.addEventListener('click', navUtils.toggleSubMenu);
        
        // Add the arrow to the submenu item
        subNavItem.appendChild(subArrowElement);
        
        // Prevent the link from toggling the nested submenu
        const subLink = subNavItem.querySelector('a');
        if (subLink && !isDesktop.matches) {
          subLink.addEventListener('click', (e) => {
            // Only prevent default if we have nested submenus
            if (subNavItem.querySelector('ul')) {
              e.stopPropagation();
            }
          });
        }
      }
    });
  }

  // Hamburger for mobile
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');

  // Get logo for hamburger button in mobile view
  const existingLogo = navBrand ? navBrand.querySelector('img') : null;
  const logoHtml = existingLogo ? `<img class="hamburger-logo" src="${existingLogo.src}" alt="${existingLogo.alt || 'Logo'}">` : '';
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
      ${logoHtml}
    </button>`;

  hamburger.addEventListener('click', () => navUtils.toggleMenu(nav, navSections));
  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');

  // Set initial state based on screen size
  navUtils.toggleMenu(nav, navSections, isDesktop.matches);
  isDesktop.addEventListener('change', () => navUtils.toggleMenu(nav, navSections, isDesktop.matches));

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);

  // Move nav-head to nav-wrapper
  const navHead = document.querySelector('.nav-head');
  if (navHead) {
    navWrapper.insertBefore(navHead, navWrapper.firstChild);
  }

  // Add classes to nav wrapper
  navWrapper.classList.add('nav-block');
  const childNav = navWrapper.children[1];
  if (childNav) {
    childNav.classList.add('logo-nav-block');

    // Add classes to each child nav element
    Array.from(childNav.children).forEach((navElement, index) => {
      navElement.classList.add(`logo-nav-block-child-${index + 1}`);
    });
  }

  // Add classes to dropdown list items
  const navDrops = document.querySelectorAll('.nav-drop ul');
  navDrops.forEach((dropDownList) => {
    if (dropDownList) {
      Array.from(dropDownList.children).forEach((liElement) => {
        liElement.classList.add('flex-list');
      });
    }
  });

  // Add classes to navigation list items
  const navList = document.querySelector('.logo-nav-block-child-3 ul');
  if (navList) {
    Array.from(navList.children).forEach((ulChildElement, index) => {
      ulChildElement.classList.add(`li-width-${index + 1}`);
      ulChildElement.classList.add(`liContent`);
    });
  }
}