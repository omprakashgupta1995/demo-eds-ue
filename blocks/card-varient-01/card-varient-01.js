export default function decorate(block) {
    let cardFlexConatiner;
    const finaldiv = [];
    Array.from(block.children).forEach((el,ind) => {
        cardFlexConatiner = document.createElement('div');
        const storeCardSection = [];
        if(ind==0){
            el.classList.add('heading');
            return;
        }else {
            el.classList.add('card');
            Array.from(el.children).forEach((el,ind) => {
                if(ind==0){
                    el.classList.add('card-image');
                }else{
                    el.classList.add('card-section');
                    // var cardSection = el;
                    // cardFlexConatiner.append(cardSection);
                    storeCardSection.push(el);
                    el.remove();
                }
            });
        }
    cardFlexConatiner.append(storeCardSection[0],storeCardSection[1]);
    finaldiv.push(cardFlexConatiner);
    });
    // console.log(block.children)
    Array.from(document.querySelectorAll('.card')).forEach((el,ind) => {
        el.append(finaldiv[ind]);
    });
}