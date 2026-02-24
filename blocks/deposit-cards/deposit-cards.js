const depClass = document.querySelectorAll('.deposit-cards > div');

export default function decorate(block) {
  depClass.forEach(child => {
    child.classList.add('dep-card');
    const depbod = document.querySelectorAll('.dep-card');
    depbod.forEach(child=>{
    const { children } = child;
    if(children[0]) children[0].classList.add('card-img');
    if(children[1]) children[1].classList.add('card-para');
})
});
}
