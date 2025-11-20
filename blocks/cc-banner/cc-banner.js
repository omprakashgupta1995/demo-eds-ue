import { div } from '../../scripts/dom-helpers.js';

export default function decorate(block) {
    Array.from(block.children).forEach((el,ind) => {
        let item = ind == 0 ? el.classList.add('banner-image') : ind == 1 ? el.classList.add('banner-heading') : ind ==2 ? el.classList.add('banner-desc') : ind == 3 ? el.classList.add('banner-fea') : false;
        if(ind == 3){
            console.log(el);
        }
    });


}