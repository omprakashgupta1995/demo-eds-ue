export default function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    row.classList.add('contact-card');
    row.children[0].classList.add('contact-card-imagewrapper');
    row.children[1].classList.add('contact-card-textwrapper');
  });
}
