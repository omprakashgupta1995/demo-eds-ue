export default async function decorate(block) {
    // If block is a single DOM element
    
        const children = block.children;  // This will give you a live HTMLCollection

        // Optionally, convert HTMLCollection to an array and log each child element
        Array.from(children).forEach(child => {
            console.log(child);  
        });
    
}

