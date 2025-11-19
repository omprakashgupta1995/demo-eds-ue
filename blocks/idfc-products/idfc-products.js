export default function decorate(block) {
    const idfcProductCards = Array.from(block.children);

    idfcProductCards.map(card => {
        card.className += ' idfc-product__card';
        const [cardImageEl, cardContentEl, cardButtonsEl] = card.children;
        cardImageEl.className += ' idfc-product__card-image';
        cardContentEl.className += ' idfc-product__card-content';
        cardButtonsEl.className += ' idfc-product__card-buttons';
    });
}