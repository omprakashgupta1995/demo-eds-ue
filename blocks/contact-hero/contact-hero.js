export default function decorate(block) {
    let rows =[...block.children];
    if (rows.length < 2) return;
    let textwrapper = rows[0];
    textwrapper.classList.add('contact-hero-text');
    textwrapper.children[0].classList.add('contact-hero-textwrapper');
    let imageWrapper = rows[1];
    let paragraph = textwrapper.querySelectorAll('p');
    paragraph[0].classList.add('contact-hero-title');
    paragraph[1].classList.add('contact-hero-description');
    imageWrapper.classList.add('contact-hero-imagewrapper');
}