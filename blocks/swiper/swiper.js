import Swiper from "../../scripts/swiper-bundle.min.js";
import { div } from "../../scripts/dom-helpers.js";


export default function decorate(block) {
   console.log("block", block);
   const swiperContent = div({ class: "swiper" },
      ...Array.from(block.children).map(child => {
         child.classList.add("swiper-slide")
         return child;
      })
   )

   block.appendChild(swiperContent);

   Swiper(swiperContent, {})
}