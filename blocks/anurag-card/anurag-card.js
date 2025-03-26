/* eslint-disable no-plusplus */
export default function decorate() {
  // block.children[0].classList.add('anurag-row-1');
  // block.children[0].children[0].classList.add('anurag-row-1-col-1');
  // block.children[1].classList.add("anurag-row-2");
  // block.children[1].children[0].classList.add('anurag-row-2-col-1');
  // block.children[1].children[1].classList.add('anurag-row-2-col-2');
  // block.children[2].classList.add("anurag-row-3");
  // block.children[2].children[0].classList.add("anurag-row-3-col-1");
  const a = document.querySelector('.anurag-block').children;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < a.length; i++) {
    a[i].classList.add(`anurag-row-${i + 1}`);
    for (let j = 0; j < a[i].children.length; j++) {
      a[i].children[j].classList.add(`anurag-row-${i + 1}-col-${j + 1}`);
    }
  }
}
