import { IFLDomain } from '../../constants.js';

export default async function decorate(block) {
  

  const { footerHtml } = await import('../footer/footer-html-string.js');
  
  const footerDom = document.createElement('div');
  footerDom.innerHTML = footerHtml.replaceAll(/(["'])\/content\//g, `$1${IFLDomain}/content/`);
  block.innerHTML = '';
  block.append(footerDom);
  const { initFooterNav } = await import('./footer-nav.js');
  initFooterNav(block);
}