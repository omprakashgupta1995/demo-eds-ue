// eslint-disable-next-line import/no-unresolved
import { toClassName } from '../../scripts/aem.js';

let instanceCount = 0;

export default function decorate(block) {
  const instanceId = `tabs-${instanceCount}`;
  instanceCount += 1;

  const tablist = document.createElement('div');
  tablist.className = 'tabs-list';
  tablist.setAttribute('role', 'tablist');

  const rows = [...block.children];
  const buttons = rows.map((panel, index) => {
    const labelCell = panel.firstElementChild;
    const title = labelCell?.textContent.trim() || `Tab ${index + 1}`;
    const id = `${instanceId}-${toClassName(title) || index + 1}`;

    panel.classList.add('tabs-panel');
    panel.id = `tabpanel-${id}`;
    panel.hidden = index !== 0;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', `tab-${id}`);
    panel.tabIndex = 0;
    labelCell?.remove();

    const button = document.createElement('button');
    button.className = 'tabs-tab';
    button.id = `tab-${id}`;
    button.textContent = title;
    button.setAttribute('aria-controls', panel.id);
    button.setAttribute('aria-selected', String(index === 0));
    button.setAttribute('role', 'tab');
    button.setAttribute('type', 'button');
    button.tabIndex = index === 0 ? 0 : -1;

    const activate = () => {
      rows.forEach((row, rowIndex) => {
        row.hidden = rowIndex !== index;
      });
      buttons.forEach((tab, tabIndex) => {
        const selected = tabIndex === index;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
      });
    };

    button.addEventListener('click', activate);
    button.addEventListener('keydown', (event) => {
      let nextIndex;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % buttons.length;
      if (event.key === 'ArrowLeft') nextIndex = (index - 1 + buttons.length) % buttons.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = buttons.length - 1;
      if (nextIndex !== undefined) {
        event.preventDefault();
        buttons[nextIndex].focus();
        buttons[nextIndex].click();
      }
    });

    tablist.append(button);
    return button;
  });

  block.prepend(tablist);
}
