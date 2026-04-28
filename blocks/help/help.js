// export default function decorate(block) {
//   const heading = block.querySelector('p'); // or first child

//   const cards = [...block.querySelectorAll(':scope > div')].slice(1);

//   const container = document.createElement('div');
//   container.className = 'help-container';

//   // Heading
//   const title = document.createElement('h2');
//   title.textContent = heading.textContent;

//   // Cards wrapper
//   const cardsWrapper = document.createElement('div');
//   cardsWrapper.className = 'help-cards';

//   cards.forEach((card) => {
//     const img = card.querySelector('img');
//     const text = card.querySelector('p');

//     const cardEl = document.createElement('div');
//     cardEl.className = 'help-card';

//     cardEl.innerHTML = `
//       <img src="${img?.src}" />
//       <p>${text?.textContent}</p>
//     `;

//     cardsWrapper.appendChild(cardEl);
//   });

//   container.append(title, cardsWrapper);
//   block.replaceChildren(container);
// }
export default function decorate(block) {
  const heading = block.querySelector('p');
  const cards = [...block.querySelectorAll(':scope > div')].slice(1);

  const container = document.createElement('div');
  container.className = 'help-container';

  // Heading
  const title = document.createElement('h2');
  title.textContent = heading?.textContent || '';

  // Cards wrapper
  const cardsWrapper = document.createElement('div');
  cardsWrapper.className = 'help-cards';

  cards.forEach((card) => {
    const img = card.querySelector('img');
    const text = card.querySelector('p');

    const cardEl = document.createElement('div');
    cardEl.className = 'help-card';

    // ✅ NO innerHTML
    if (img) {
      const newImg = document.createElement('img');
      newImg.src = img.src;
      newImg.alt = img.alt || '';
      cardEl.appendChild(newImg);
    }

    if (text) {
      const p = document.createElement('p');
      p.textContent = text.textContent;
      cardEl.appendChild(p);
    }

    cardsWrapper.appendChild(cardEl);
  });

  container.append(title, cardsWrapper);

  // ✅ SAFE REPLACE
  block.replaceChildren(container);
}