export default function decorate(block) {
  block.classList.add('whatsapp-banner-container');
  block.querySelectorAll('a').forEach((a) => {
    a.classList.add('whatsapp-banner-button');
  });
}
