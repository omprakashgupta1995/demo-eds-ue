export default async function decorate(block) {
    const children = block.children;  // Get the child elements of the block

    Array.from(children).forEach((child, index) => {
       
        
      
        child.classList.add(`child-${index + 1}`); 
        console.log(child);  
    });
}

