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

  // MOST ASKED PART
  const title = block.children[1];
  block.textContent = '';
  // btns code.
  block.append(ul(...list));
  block.append(title);
  // to get all data.
  buildAccordianBlock(accordianBlock);
  block.append(accordianBlock);

  const selectLi = document.querySelectorAll('li');
  selectLi.forEach((liElement) => {
    liElement.addEventListener('click', (event) => {
      const accordionItems = accordianBlock.querySelectorAll('.accordion-item');
      accordionItems.forEach((item) => {
        item.style.display = 'none';
      });

      if (event.currentTarget.textContent === 'All') {
        accordionItems.forEach((item) => {
          item.style.display = 'block';
        });
      } else {
        // Only show items matching the selected category
        data.forEach((elem, index) => {
          if (elem.category === event.currentTarget.textContent) {
            const matchingItem = accordionItems[index];
            matchingItem.style.display = 'block';
          }
        });
      }
    });
  });
}
