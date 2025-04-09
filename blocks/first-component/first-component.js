export default async function decorate(block) {

    console.log(block.children);

    let blockFirstDiv = block.children[0];
    blockFirstDiv.classList.add('flex-block-container');

    Array.from(blockFirstDiv.children).forEach((divElement, index)=>
    {
        divElement.classList.add(`flex-block-container-${index+1}`)
    })

    let section = document.querySelector('.first-component-container');
    console.log('section',section);

    let thirdDivChild = section.children;
    // console.log("dec",thirdDivChild)
    let thirdDivFirstChild = thirdDivChild[1];
    console.log('Abhay',thirdDivFirstChild);
    let backgroundChild = thirdDivFirstChild.children[0]
    let backgroundColor = backgroundChild.children[0]
    backgroundColor.classList.add('background');

     
    const children = block.children; 
    
  
    Array.from(children).forEach((child, index) => {
        child.classList.add(`child-${index + 1}`); 
        console.log(child);  
    }); 


    
}

