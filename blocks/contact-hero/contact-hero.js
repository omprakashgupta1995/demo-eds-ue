export default function decorate(block) {
    console.log(...block.children);
    let rows =[...block.children];
    if (rows.length < 2) return;
    let textwrapper = rows[0];
    textwrapper.classList.add('contact-hero-text');
    if (textWrapper) {
    const paragraphs = textWrapper.querySelectorAll('p');

    if (paragraphs[0]) {
      const heading = document.createElement('h1');
      heading.textContent = paragraphs[0].textContent;
      textwrapper.appendChild(heading);
    }

    if (paragraphs[1]) {
      const desc = document.createElement('p');
      desc.textContent = paragraphs[1].textContent;
      textwrapper.appendChild(desc);
    }
  }
    let imageWrapper = rows[1];
    imageWrapper.classList.add('contact-hero-image');
   
}