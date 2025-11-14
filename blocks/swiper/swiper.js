import Swiper from "../../scripts/swiper-bundle.min.js";
import { div } from "../../scripts/dom-helpers.js";


export default function decorate(block) {
   console.log("block", block);
   const swiperContent = div({ class: "swiper" },
      ...Array.from(block.children).map(child => {
         return div({ class: "swiper-slide" }, child)
      })
   )

   Swiper(swiperContent, {})

   block.appendChild(swiperContent);
}