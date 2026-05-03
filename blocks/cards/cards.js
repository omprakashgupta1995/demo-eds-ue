export default function decorate(block) {
  // 1. Guard clause: Exit immediately if the block or its parents don't exist
  if (!block || !block.parentElement || !block.parentElement.parentElement) {
     console.error('block parent elements or block does not exist ');
    return;
  }

  const cards_wrapper = block.parentElement;
  const cards_section = cards_wrapper.parentElement;

  // 2. Verify we are in the correct section
  if (
    cards_section.classList.contains("bg-black") &&
    cards_section.classList.contains("bg-edge")
  ) {
    const hero_card_wrapper = cards_section.children[1];
    const hero_card_block = hero_card_wrapper?.children?.[0];

    // Verify the block and its children exist
    if (hero_card_block && hero_card_block.children) {
      
      Array.from(hero_card_block.children).forEach((card) => {
        card.classList.add("card");

        // 3. Safely target wrappers by saving them to variables first
        const imageWrapper = card.children[0];
        const textWrapper = card.children[1];

        // Only add classes if those specific children actually exist
        if (imageWrapper) {
          imageWrapper.classList.add('card-image-wrapper');
        }
        
        if (textWrapper) {
          textWrapper.classList.add('card-text-wrapper');
        }

        // 4. Safely check for the image before adding the class
        const cardImage = card.querySelector('img');
        if (cardImage) {
          cardImage.classList.add('card-image');
        }
      });
    }
  }
}