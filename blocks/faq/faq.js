import { fetchPlaceholders } from '../../scripts/aem.js';
import { div, li, ul } from '../../scripts/dom-helpers.js';
import buildAccordianBlock from '../accordion/accordion.js';

export default async function decorate(block) {
//   console.log(block);
  const a = block.querySelector('a');
  const path = a?.href.trim();
  // a.remove();
  const placeholders = await fetchPlaceholders();
  console.log(placeholders);
  
  const resp = await fetch(placeholders.faqUrl);
  const respData = await resp.json();
  const { data } = respData;
  const list = [li('All')];
  const accordianBlock = div(
    { class: 'block accordion' },
    ...data.map((eachdata) => {
      list.push(li(eachdata.category));
      return div(
        div(eachdata.title),
        div(eachdata.description),
      );
    }),
  );
  const title = block.children[1];
  block.textContent = '';
  block.append(ul(...list));
  block.append(title);
  // block.append(ul(...list));
  buildAccordianBlock(accordianBlock);
  block.append(accordianBlock);
}
