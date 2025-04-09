    import buildAccordianBlock from '../accordion/accordion.js'
    import {li, ul, div} from '../../scripts/domhelper.js'
    export default async function decorate(block) {
        console.log(block);
        const a = block.querySelector('a');
        const path = a?.href.trim();
        const resp = await fetch(path);
        const respData = await resp.json();
        const data = respData.data;
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
        const title = block.children[1];
        block.textContent = '';
        block.append(ul(...list));
        block.append(title);
        buildAccordianBlock(accordianBlock);
        block.append(accordianBlock);
      }
    
    
    
    
    
    
    