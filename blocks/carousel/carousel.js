import SwiperInit from "./swiper-bundle.min.js";
import { div } from "../../scripts/dom-helpers.js";
import loadEmbed from '../embed/embed.js';
export default function decorate(block) {
    console.log(block);
    const swiper = div({class : 'swiper' , id: 'sss'},
        div({class : 'swiper-wrapper'} ,
            ...Array.from(block.children).map(function (blockItem) {
                blockItem.classList.add('swiper-slide')
                if(blockItem.firstElementChild.textContent.includes('youtu')){
                    loadEmbed(blockItem.firstElementChild);
                }
                return blockItem;
            })
        )
    )
    block.textContent = '';
    block.append(swiper);   
    SwiperInit(swiper);
}