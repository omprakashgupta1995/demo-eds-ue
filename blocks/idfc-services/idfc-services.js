export default function decorate(block) {
    const idfcServiceCards = Array.from(block.children);

    idfcServiceCards.map(card => {
        card.className += ' idfc-services__card';
        const [cardImageEl, cardContentEl] = card.children;
        cardImageEl.className += ' idfc-services__card-image';
        cardContentEl.className += ' idfc-services__card-content';
    });
}