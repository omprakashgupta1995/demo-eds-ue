export default function decorate(block) {
    let blockChildren = block.children;
    let childrenClassName = Array.from(blockChildren).forEach((divElement,index) =>
    {
        divElement.classList.add(`div-container-${index+1}`);
    })  
    console.log(childrenClassName);
    
}