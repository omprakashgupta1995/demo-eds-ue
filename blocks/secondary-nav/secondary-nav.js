/*eslint-disable*/
// export default function decorate(block) {
//   const nav = document.createElement('nav');
//   nav.className = 'secondary-nav-menu';

//   const items = [...block.children];
//   let cta = null;

//   items.forEach((item) => {
//     const link = item.querySelector('a');
//     const type = item.dataset?.type || 'link'; // type from metadata/model

//     if (!link) return;

//     link.classList.add('secondary-nav-item');

//     if (type === 'button') {
//       link.classList.add('secondary-nav-cta');
//       cta = link;
//     } else {
//       nav.appendChild(link);
//     }

//     item.remove(); // clean old markup
//   });

//   block.innerHTML = ''; // clean block
//   block.append(nav);
//   if (cta) block.append(cta);
// }
export default function decorate(block) {
  const nav = document.createElement('nav');
  nav.className = 'secondary-nav-menu';

  [...block.children].forEach((row) => {
    const link = row.querySelector('a');
    if (link) {
      link.classList.add('secondary-nav-item');
      nav.appendChild(link);
    }
  });

  block.innerHTML = '';
  block.append(nav);

  // Inject CTA Button
  const cta = document.createElement('a');
  cta.href = '#apply'; // or update via config/metadata if dynamic
  cta.textContent = 'Apply Now';
  cta.className = 'secondary-nav-cta';
  block.append(cta);
}
