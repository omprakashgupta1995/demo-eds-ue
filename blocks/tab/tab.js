// eslint-disable-next-line import/no-unresolved
import { toClassName } from '../../scripts/aem.js';

export default async function decorate(block) {
  // build tablist
  const tablist = document.createElement('div');
  tablist.className = 'tab-list';
  tablist.setAttribute('role', 'tablist');

  // decorate tab and tabpanels
  const tab = [...block.children].map((child) => child.firstElementChild);
  tab.forEach((eachtab, i) => {
    const id = toClassName(eachtab.textContent);

    // decorate tabpanel
    const tabpanel = block.children[i];
    tabpanel.className = 'tab-panel';
    tabpanel.id = `tabpanel-${id}`;
    tabpanel.setAttribute('aria-hidden', !!i);
    tabpanel.setAttribute('aria-labelledby', `tab-${id}`);
    tabpanel.setAttribute('role', 'tabpanel');

    // build tab button
    const button = document.createElement('button');
    button.className = 'tab-tab';
    button.id = `tab-${id}`;
    button.innerHTML = eachtab.innerHTML;
    button.setAttribute('aria-controls', `tabpanel-${id}`);
    button.setAttribute('aria-selected', !i);
    button.setAttribute('role', 'tab');
    button.setAttribute('type', 'button');
    button.addEventListener('click', () => {
      block.querySelectorAll('[role=tabpanel]').forEach((panel) => {
        panel.setAttribute('aria-hidden', true);
      });
      tablist.querySelectorAll('button').forEach((btn) => {
        btn.setAttribute('aria-selected', false);
      });
      tabpanel.setAttribute('aria-hidden', false);
      button.setAttribute('aria-selected', true);
    });
    tablist.append(button);
    eachtab.remove();
  });

  block.prepend(tablist);
}


// function myNew(constructor, ...args) {
//   // Step 1: create an empty object
//   const obj = {};

//   // Step 2: set its prototype
//   Object.setPrototypeOf(obj, constructor.prototype);

//   // Step 3: execute the constructor
//   const result = constructor.apply(obj, args);

//   // Step 4: return the constructed object (if not returning an object)
//   return result && typeof result === "object" ? result : obj;
// }

// const p2 = myNew(Person, "Suraj");

