export default function decorate(block) {
  const childDivs = block.children;
  Array.from(childDivs).forEach((div, index) => {
    div.classList.add(`oona-container${index}`);
  });

  // const oonaContainer = document.querySelector('.oona-container0');
  // console.log(oonaContainer);
}
