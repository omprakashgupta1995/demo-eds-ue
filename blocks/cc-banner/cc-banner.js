import { div } from '../../scripts/dom-helpers.js';

export default function decorate(block) {
    Array.from(block.children).forEach((el, ind) => {
        let item = ind == 0 ? el.classList.add('banner-image') : ind == 1 ? el.classList.add('banner-heading') : ind == 2 ? el.classList.add('banner-desc') : ind == 3 ? el.classList.add('banner-fea') : false;
        if (ind == 3) {
            Array.from(el.children).forEach((e, ind) => {
                let item = e.classList.add('feature-items');
                Array.from(e.children).forEach((el, ind) => {
                    console.log('inner-' +el.childList);
                });
                console.log(e.children);
            });
        }
        if (ind == 1) {
            let items = el.children[0].children;
            items[0].classList.add('p');
        }
        if (ind == 2) {
            let items = el.children[0].children;
            items[0].classList.add('h1');
        }
    });


}