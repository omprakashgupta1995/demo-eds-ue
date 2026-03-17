import { IFLDomain } from '../../constants.js';

export default async function decorate(block) {

  const { headerHtml } = await import('../header/header-html-string.js');
  
  const headerDom = document.createElement('div');
  headerDom.innerHTML = headerHtml.replaceAll(/(["'])\/content\//g, `$1${IFLDomain}/content/`);
  block.innerHTML = '';
  block.append(headerDom);
  const { initHeaderNav } = await import('./header-nav.js');
  initHeaderNav(block);
  // loadScript(`${window.hlx.codeBasePath}/blocks/header/header-nav.js`);
}