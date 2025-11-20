import { moveInstrumentation } from '../../scripts/scripts.js';
import { loadEmbed } from '../embed/embed.js';
import { createModal } from '../modal/modal.js';

export default function decorate(block) {
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  block.textContent = '';
  block.append(ul);

  ul.querySelectorAll('li').forEach((card) => {
    const cardBody = card.querySelector('.cards-card-body');
    let link = null;

    const linkElement = cardBody.querySelector('a');
    if (linkElement) {
      link = linkElement.href;
    } else {
      const pElement = cardBody.querySelector('p');
      if (pElement) {
        const textContent = pElement.textContent.trim();
        if (textContent.includes('youtu.be') || textContent.includes('youtube.com') || textContent.includes('vimeo.com')) {
          link = textContent;
        }
      }
    }

    if (link) {
      // removed the link text
      if (linkElement) linkElement.remove();
      else if (cardBody.querySelector('p')) cardBody.querySelector('p').textContent = '';

      // Added visual cue that it's clickable
      card.classList.add('card-with-video');
      card.style.cursor = 'pointer';

      // Added the Click Event Listener
      card.addEventListener('click', async (e) => {
        e.preventDefault();

        // Create a temporary container for the video
        const videoContainer = document.createElement('div');

        loadEmbed(videoContainer, link, true);

        // Create the modal using this new video container
        const { showModal } = await createModal([videoContainer]);

        showModal();
      });
    }
  });
}
