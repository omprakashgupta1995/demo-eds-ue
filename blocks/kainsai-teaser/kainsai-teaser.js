/* eslint-disable */
export default function decorate(block) {
  const divs = Array.from(block.children);
  

  if (divs.length > 0) {
    divs[0].classList.add('mobile-Image');
    divs[1].classList.add('desktop-Image');
    divs[2].classList.add('teaser-content');
  }

/*   if (divs.length > 1 && divs[1].children.length > 0) {
    const parasContainer = Array.from(divs[1].children);
    const paras = parasContainer.flatMap((container) => Array.from(container.children));
    // console.log(paras);
    paras[0].classList.add('title');
    paras[1].classList.add('description');
    paras[2].classList.add('sub-title');
    paras[3].classList.add('btn-Container');
    paras[4].classList.add('color-n-sku');

    const colorsku = Array.from(paras[4].children);
    colorsku[0].classList.add('color-container');
    colorsku[1].classList.add('sku-container');

    paras[5].classList.add('get-btn-Container');
  } */
}
