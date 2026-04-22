export default function decorate(block){
    document.querySelectorAll('.contact-cards.block > div')
    .forEach((card) => {
        card.classList.add('contact-card');
    });
}