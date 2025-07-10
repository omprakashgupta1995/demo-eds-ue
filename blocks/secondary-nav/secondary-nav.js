export default function decorate(block) {
  const nav = document.createElement('nav');
  nav.className = 'secondary-nav-menu';

  const items = [...block.children];
  let cta = null;

  items.forEach((item) => {
    const link = item.querySelector('a');
    const type = item.dataset?.type || 'link'; // type from metadata/model

    if (!link) return;

    link.classList.add('secondary-nav-item');

    if (type === 'button') {
      link.classList.add('secondary-nav-cta');
      cta = link;
    } else {
      nav.appendChild(link);
    }

    item.remove(); // clean old markup
  });

  block.innerHTML = ''; // clean block
  block.append(nav);
  if (cta) block.append(cta);
}
