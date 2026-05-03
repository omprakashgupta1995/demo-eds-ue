import { createOptimizedPicture } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";

export default function decorate(block) {
  /* change to ul, li */
  // const ul = document.createElement('ul');
  // [...block.children].forEach((row) => {
  //   const li = document.createElement('li');
  //   moveInstrumentation(row, li);
  //   while (row.firstElementChild) li.append(row.firstElementChild);
  //   [...li.children].forEach((div) => {
  //     if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
  //     else div.className = 'cards-card-body';
  //   });
  //   ul.append(li);
  // });
  // ul.querySelectorAll('picture > img').forEach((img) => {
  //   const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
  //   moveInstrumentation(img, optimizedPic.querySelector('img'));
  //   img.closest('picture').replaceWith(optimizedPic);
  // });
  // block.textContent = '';
  // block.append(ul);

  let cards_wrapper = block.parentElement;
  let cards_section = cards_wrapper.parentElement;

  if (
    cards_section?.classList.contains("bg-black") &&
    cards_section?.classList.contains("bg-edge")
  ) {
    let hero_card_wrapper = cards_section?.children?.[0];
    let hero_card_block = hero_card_wrapper?.children?.[0];

    // let card_list = hero_card_block?.children[0];
    // card_list.classList.add("card-wrapper");
    if (hero_card_block && hero_card_block.children) {
      Array.from(hero_card_block.children).forEach((row) => {
        let card = row;
        card.classList.add("card");
        if(card){
          card.children?.[0].classList.add('card-image-wrapper');
          card.children?.[1].classList.add('card-text-wrapper');
          let cardImage = card.querySelector('img');
          cardImage.classList.add('card-image');
        }
      });
    }
  }
}
