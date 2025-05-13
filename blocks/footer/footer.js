/* eslint-disable */
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

  // === ADDING CLASSES TO .footer-address.block ===
  const footerAddressDivs = block.querySelectorAll('.footer-address.block > div > div');
  footerAddressDivs.forEach((div, index) => {
    div.classList.add(`footer-address-${index + 1}`);
    div.querySelectorAll('p').forEach((p, i) => {
      p.classList.add(`footer-address-para-${i + 1}`);
    });
    div.querySelectorAll('h3').forEach((h3, i) => {
      h3.classList.add(`footer-address-heading-${i + 1}`);
    });
    div.querySelectorAll('ul').forEach((ul, i) => {
      ul.classList.add(`footer-address-list-${i + 1}`);
    });
  });

  // === ADDING CLASSES TO .footer-link-accordion.block ===
  const accordionBlocks = block.querySelectorAll('.footer-link-accordion.block > div');
  accordionBlocks.forEach((accordionDiv, index) => {
    accordionDiv.classList.add('footer-accordion-section');
    if (index === 2) accordionDiv.classList.add('footer-accordion-extra');

    const subDivs = accordionDiv.querySelectorAll(':scope > div');
    subDivs.forEach((subDiv, subIndex) => {
      if (subIndex === 0) subDiv.classList.add('footer-accordion-question');
      else if (subIndex === 1) subDiv.classList.add('footer-accordion-answer');

      subDiv.querySelectorAll('p').forEach((p) => p.classList.add('footer-accordion-paragraph'));
      subDiv.querySelectorAll('ul').forEach((ul) => ul.classList.add('footer-accordion-list'));
    });
  });

  // === Set up accordion based on screen size ===
  function setupAccordion() {
    const isMobile = window.innerWidth < 900;
    const questions = block.querySelectorAll('.footer-accordion-question');

    questions.forEach((question) => {
      const answer = question.nextElementSibling;
      let arrow = question.querySelector('.accordion-arrow');

      if (isMobile) {
        // Add arrow if missing
        if (!arrow) {
          arrow = document.createElement('span');
          arrow.classList.add('accordion-arrow');
          arrow.textContent = '∨';
          question.appendChild(arrow);
        }

        // Collapse all answers initially
        answer.style.display = 'none';
        arrow.textContent = '∨';
        question.style.cursor = 'pointer';

        // Avoid double-binding event listeners
        if (!question.classList.contains('accordion-bound')) {
          question.addEventListener('click', () => {
            const isOpen = answer.style.display === 'block';

            // Close all answers
            block.querySelectorAll('.footer-accordion-answer').forEach((ans) => {
              ans.style.display = 'none';
            });

            block.querySelectorAll('.accordion-arrow').forEach((arw) => {
              arw.textContent = '∨';
            });

            if (!isOpen) {
              answer.style.display = 'block';
              arrow.textContent = '∧';
            }
          });

          question.classList.add('accordion-bound');
        }
      } else {
        // Remove accordion behavior on desktop
        answer.style.display = 'block'; // Always show
        if (arrow) arrow.remove();
        question.style.cursor = 'default';
      }
    });
  }

  // Initial setup
  setupAccordion();

  // Re-apply accordion logic on resize
  window.addEventListener('resize', () => {
    setupAccordion();
  });
  const firstDiv = document.querySelector('.fot-one-wrapper > div > div:nth-child(1)');
  const secondDiv = document.querySelector('.fot-one-wrapper > div > div:nth-child(2)');
  
  if (firstDiv) firstDiv.classList.add('one');
  if (secondDiv) secondDiv.classList.add('two');

  const fottwoFirstChild = document.querySelector('.fot-two-wrapper > div > div:nth-child(1)');
  const fotTwoSecond = document.querySelector('.fot-two-wrapper > div > div:nth-child(2)');
  const fotThreeSecond = document.querySelector('.fot-two-wrapper > div > div:nth-child(3)');
  
  if (fottwoFirstChild) fottwoFirstChild.classList.add('imp');
  if (fotTwoSecond) fotTwoSecond.classList.add('qrcode');
  if (fotThreeSecond) fotThreeSecond.classList.add('imgDiv');


  //footer section 3
  const fotThreeFirstChild = document.querySelector('.fot-three-wrapper > div > div:nth-child(1)');
const fotThreeSecondChild = document.querySelector('.fot-three-wrapper > div > div:nth-child(2)');
const listTitle = fotThreeFirstChild?.querySelector('div > div:nth-child(1)');
const UlTable = fotThreeFirstChild?.querySelector('div > div:nth-child(2)');

if (listTitle && UlTable) {
  listTitle.classList.add('listTitle');
  UlTable.classList.add('UlTable');

  // Create a span for the icon
  const toggleIcon = document.createElement('span');
  toggleIcon.classList.add('toggle-icon');
  toggleIcon.textContent = '−'; // Initially shown
  listTitle.firstChild.appendChild(toggleIcon);

  listTitle.style.cursor = 'pointer';

  listTitle.addEventListener('click', () => {
    const isVisible = UlTable.style.display !== 'none';
    UlTable.style.display = isVisible ? 'none' : 'flex';
    toggleIcon.textContent = isVisible ? '+' : '−';
  });
}

// Add general section classes
if (fotThreeFirstChild) fotThreeFirstChild.classList.add('textcontent');
if (fotThreeSecondChild) fotThreeSecondChild.classList.add('loccontent');
if (fotThreeSecondChild && listTitle) {
  listTitle.appendChild(fotThreeSecondChild);
}

const fotBtm = document.querySelector('.section.footer-btm');
const defaultWrapper = fotBtm?.querySelector('.default-content-wrapper');

if (defaultWrapper) {
  const allParagraphs = Array.from(defaultWrapper.querySelectorAll('p'));

  // Create containers
  const textDiv = document.createElement('div');
  const buttonDiv = document.createElement('div');

  textDiv.classList.add('text-div');
  buttonDiv.classList.add('button-div');

  allParagraphs.forEach(p => {
    if (p.classList.contains('button-container')) {
      buttonDiv.appendChild(p);
    } else {
      textDiv.appendChild(p);
    }
  });

  // Clear original content
  defaultWrapper.innerHTML = '';

  // Append new structured content
  defaultWrapper.appendChild(textDiv);
  defaultWrapper.appendChild(buttonDiv);
}

}