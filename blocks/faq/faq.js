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
        { class: 'accordion-item' },
        div({ class: 'accordion-title' }, eachdata.title),
        div({ class: 'accordion-description' }, eachdata.description),
      );
    }),
  );

  // MOST ASKED PART
  const title = block.children[1];
  block.textContent = '';
  block.append(ul(...list));
  block.append(title);
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
          item.style.display = '';
        });
      } else {
        // Only show items matching the selected category
        data.forEach((elem, index) => {
          if (elem.category === event.currentTarget.textContent) {
            const matchingItem = accordionItems[index];
            if (matchingItem) {
              matchingItem.style.display = ''; // Show matching item
            }
          }
        });
      }
    });
  });
}
