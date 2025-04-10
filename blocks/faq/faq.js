// import buildAccordianBlock from '../accordion/accordion.js';
// import {ul,li,div} from '../../scripts/domhelper.js';

// export default async function decorate(block) {
//     console.log(block);
//     const path = block.textContent.trim();
//     const resp = await fetch(path);
//     const respData = await resp.json();
//     const data = respData.data;
//     block.textContent = '';
//     const list = [li('All')];
//     const accordianBlock = div({class : 'block accordion'},
//       ...data.map(function (eachdata) {
//         list.push(li(eachdata.category));
//         return div(
//           div(eachdata.title),
//           div(eachdata.description)
//         )
//       })
//     )
//     block.append(ul(...list));
//     buildAccordianBlock(accordianBlock);
//     block.append(accordianBlock);

//     let selectLi = document.querySelectorAll('li');
//     console.log(selectLi)
//     selectLi.forEach((element,index)=> {
//         element.addEventListener('click',(event)=>{
//             console.log(event.currentTarget.textContent);
//             data.forEach((elem)=>{
//                 if(elem.category == event.currentTarget.textContent){
//                    console.log('abhay singh')

//                 }
//             })
//         })

//     });
//   }

import buildAccordianBlock from '../accordion/accordion.js';
import { ul, li, div } from '../../scripts/domhelper.js';

export default async function decorate(block) {
/*   console.log(block); */
  const a = block.querySelector('a');
  const path = a?.href.trim();
  const resp = await fetch(path);
  const respData = await resp.json();
  const { data } = respData;
  //   block.textContent = "";
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
  // console.log(selectLi);
  selectLi.forEach((liElement) => {
    liElement.addEventListener('click', (event) => {
      /*       console.log(event.currentTarget.textContent); */
      const accordionItems = accordianBlock.querySelectorAll('.accordion-item');
      accordionItems.forEach((item) => {
        // Hide all items initially
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
