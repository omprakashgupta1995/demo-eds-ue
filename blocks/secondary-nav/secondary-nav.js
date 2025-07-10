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
  const ul = block.querySelector('ul');
  const ctaHeading = block.querySelector('h6');

  // Wrap links
  if (ul) {
    ul.classList.add('secondary-nav-menu');
    [...ul.querySelectorAll('a')].forEach((link) => {
      link.classList.add('secondary-nav-item');
    });
  }

  // Transform <h6> into CTA <a>
  if (ctaHeading) {
    const cta = document.createElement('a');
    cta.textContent = ctaHeading.textContent;
    cta.href = '#apply'; // hardcoded, or fetch from metadata if needed
    cta.className = 'secondary-nav-cta';
    ctaHeading.replaceWith(cta);
  }

  block.classList.add('secondary-nav');
}

