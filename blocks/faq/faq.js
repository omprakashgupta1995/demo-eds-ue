import buildAccordianBlock from '../accordion/accordion.js'
// import {ul,li,div} form
import { ul,li,div } from '../../scripts/domhelper.js';

export default async function decorate(block) {
    console.log(block);
    const path = block.textContent.trim();
    const resp = await fetch(path);
    const respData = await resp.json();
    const data = respData.data;
    block.textContent = '';
    const list = [li('All')];
    const accordianBlock = div({class : 'block accordion'},
      ...data.map(function (eachdata) {
        list.push(li(eachdata.category));
        return div(
          div(eachdata.title),
          div(eachdata.description)
        )
      })
    )
    block.append(ul(...list));
    buildAccordianBlock(accordianBlock);
    block.append(accordianBlock);
  }