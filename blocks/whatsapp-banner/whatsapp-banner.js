import { div } from "../../scripts/dom-helpers.js";
export default async function decorate(block) {
    console.dir(block);
    Array.from(block.children).forEach((rowElm, rowIndex) => {
        rowElm.classList.add(`row-${rowIndex + 1}`);
        Array.from(rowElm.children).forEach((colElm, colIndex) => {
            colElm.classList.add(`col-${colIndex + 1}`);
        })
    })
    const row4 = block.querySelector(".row-4");
    const row5 = block.querySelector(".row-5")
    const parentDiv = div({ class: "parent_row4_row5", }, ...[row4, row5])
    block.appendChild(parentDiv)
}