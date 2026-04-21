export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 2) return;
  const textwrapper = rows[0];
  textwrapper.classList.add('contact-hero-text');
  textwrapper.children[0].classList.add('contact-hero-textwrapper');
  const imageWrapper = rows[1];
  const paragraph = textwrapper.querySelectorAll('p');
  paragraph[0].classList.add('contact-hero-title');
  paragraph[1].classList.add('contact-hero-description');
  imageWrapper.classList.add('contact-hero-imagewrapper');
}
