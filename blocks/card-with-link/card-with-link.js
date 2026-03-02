// ...existing code...
/**
 * Wraps each card in a link if it contains a valid <a href>
 * and adds the "link-cards" class.
 * @param {Element} container The container element
 */
// ...existing code...
function wrapImgsInLinks(container) {
  const cards = container.querySelectorAll('.card-with-link > div');
  cards.forEach((card) => {
    card.classList.add('link-cards');

    const link = card.querySelector('a[href]');
    const href = link?.getAttribute('href');
    if (href) {
      // Remove inner anchors to avoid nested <a>
      card.querySelectorAll('a').forEach((a) => {
        a.replaceWith(...a.childNodes);
      });

      const wrapper = document.createElement('a');
      wrapper.href = href;
      wrapper.classList.add('link-cards');

      card.replaceWith(wrapper);
      wrapper.appendChild(card);
    }
  });
}
// ...existing code...

export default function decorate(block) {
  wrapImgsInLinks(block);
}