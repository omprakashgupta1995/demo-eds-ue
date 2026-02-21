// blocks/bio-cards/bio-cards.js
/* eslint-disable */

import {
  div, a, label, input, span, button, ul, li, img,
} from '../../scripts/dom-helpers.js';


export default function decorate(block) {
  console.log('Bio Cards block loaded!');
  console.log('Block element:', block);
  console.log('Children (cards):', block.children);

  const data = [...block.children].map((card) => {
    const name = card.querySelector('h3') ? card.querySelector('h3').textContent : '';
    const title = card.querySelector('p') ? card.querySelector('p').textContent : '';
    const image = card.querySelector('img') ? card.querySelector('img').src : '';
    return { name, title, image };
  });

  console.log('Extracted data:', data);
}
