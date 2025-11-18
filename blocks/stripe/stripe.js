import { div } from "../../scripts/dom-helpers.js";

export default async function decorate(block) {
   console.dir(block);
   Array.from(block.children).forEach((rowElm, rowIndex) => {
      rowElm.classList.add(`row-${rowIndex + 1}`);
      Array.from(rowElm.children).forEach((colElm, colIndex) => {
         colElm.classList.add(`col-${colIndex + 1}`);
      })
   })
}
