/* eslint-disable */

export default function decorate(block){
    const childDivs = Array.from(block.children);

  childDivs.forEach((div, index) => {
    div.classList.add(`spotlight-div`)
    div.classList.add(`spotlight-item-${index + 1}`);
  });
}