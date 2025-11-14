import swiper from "../../scripts/swiper.js"
import { div } from "../../scripts/dom-helper.js";

export default function decorate(block){
const swiperEl = div({class:"swiper"},div({class:"swiper-wrapper"},
    ...Array.from(block.children).map((child)=>{
        child.classList.add('swiper-slide');
        return child;
    })
));
block.appendChild(swiperEl);
swiper(swiperEl);
}