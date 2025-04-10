import buildAccordianBlock from '../accordion/accordion.js';
import { ul, li, div } from '../../scripts/domhelper.js';

export default async function decorate(block) {
  const a = block.querySelector('a');
  const path = a?.href.trim();

  const resp = await fetch(path);
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
  buildAccordianBlock(accordianBlock);
  block.append(accordianBlock);
}
