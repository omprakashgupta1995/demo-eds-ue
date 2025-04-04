export default async function decorate(block) {
    block.forEach((element) => {
        console.log(element);

        const children = element.children;  
        Array.from(children).forEach((child) => {
            console.log(child);  // Log each child
        });
    });
}
