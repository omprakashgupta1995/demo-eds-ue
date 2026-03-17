// import { IFLDomain } from '../../constants.js';

// export default async function decorate(block) {

//   const { headerHtml } = await import('../header/header-html-string.js');
  
//   const headerDom = document.createElement('div');
//   headerDom.innerHTML = headerHtml.replaceAll(/(["'])\/content\//g, `$1${IFLDomain}/content/`);
//   block.innerHTML = '';
//   block.append(headerDom);
//   const { initHeaderNav } = await import('./header-nav.js');
//   initHeaderNav(block);
//   // loadScript(`${window.hlx.codeBasePath}/blocks/header/header-nav.js`);
// }
// import { IFLDomain } from '../../constants.js';

// export default async function decorate(block) {
//   const { headerHtml } = await import('../header/header-html-string.js');

//   const headerDom = document.createElement('div');
//   headerDom.innerHTML = headerHtml;

//   // Fix /content URLs
//   headerDom.querySelectorAll('[src^="/content"], [href^="/content"]').forEach((el) => {
//     const attr = el.hasAttribute('src') ? 'src' : 'href';
//     el.setAttribute(attr, `${IFLDomain}${el.getAttribute(attr)}`);
//   });

//   block.innerHTML = '';
//   block.append(headerDom);

//   const { initHeaderNav } = await import('./header-nav.js');
//   initHeaderNav(block);
// }