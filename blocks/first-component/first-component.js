export default async function decorate(block) {
  // console.log(block.children);

  const blockFirstDiv = block.children[0];
  blockFirstDiv.classList.add('flex-block-container');

  Array.from(blockFirstDiv.children).forEach((divElement, index) => {
    divElement.classList.add(`flex-block-container-${index + 1}`);
  });

  const section = document.querySelector('.first-component-container');
  // console.log('section',section);

  const thirdDivChild = section.children;
  // console.log("dec",thirdDivChild)
  const thirdDivFirstChild = thirdDivChild[1];
  // console.log('Abhay',thirdDivFirstChild);
  const backgroundChild = thirdDivFirstChild.children[0];
  const backgroundColor = backgroundChild.children[0];
  backgroundColor.classList.add('background');
  const { children } = block;

  Array.from(children).forEach((child, index) => {
    child.classList.add(`child-${index + 1}`);
    // console.log(child);
  });
}
