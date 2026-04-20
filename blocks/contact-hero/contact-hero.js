export default function decorate(block) {
    console.log(...block.children);
    let rows =[...block.children];
    if (rows.length < 2) return;
    let textwrapper = rows[0];
    textwrapper.classList.add('contact-hero-text');
    let imageWrapper = rows[1];
    imageWrapper.classList.add('contact-hero-image');
   
}