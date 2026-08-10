export default function decorate(block){
  const cards = block.querySelectorAll(':scope > div');
    cards.forEach((card) => 
    card.classList.add('new-card')
  );
}