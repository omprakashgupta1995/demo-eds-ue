export default function decorate(block) {
  console.log(block.textContent);
  block.classList.add('whatsapp-banner-container');
  block.querySelectorAll('a').forEach((a) => {
    a.classList.add('whatsapp-banner-button');
  });
}
