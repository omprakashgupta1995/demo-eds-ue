export default function decorate(block){ 
    // console.log(block);
    let firstChildBlock = block.children[0];
    let secondChildBlock = firstChildBlock.children[0];
    let paraSelect = secondChildBlock.querySelector('p');
    let classAddPara = paraSelect.classList.add('para-1');
    console.log(block);
}