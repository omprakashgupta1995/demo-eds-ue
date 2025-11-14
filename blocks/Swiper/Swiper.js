import swiperMin from "../../scripts/swiper.min";
import { div } from "../../scripts/dom-helpers";

export default  function decorate(block) {
    console.log(block);
    const swiperEl = div({class:"swiper"},
        ...Array.from(block.children).map(child => {
            child.classList.add("swiper-slide")
            return child;
        })
    )

    block.appendChild(swiperEl);
    swiperMin(swiperEl,{
        direction:'vertical',
        loop:true
    });
}