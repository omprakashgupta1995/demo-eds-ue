export default async function decorate(block) {

    let section = document.querySelector('.first-component-container');
    console.log('section',section);

    let thirdDivChild = section.children[2];
    let thirdDivFirstChild = thirdDivChild.children[0];
    console.log('Abhay',thirdDivFirstChild);
    thirdDivFirstChild.classList.add('background');
    // console.log(thirdDivChild);
    
     
    const children = block.children; 
    
  
    Array.from(children).forEach((child, index) => {
        child.classList.add(`child-${index + 1}`); 
        console.log(child);  
    }); 


    
}

