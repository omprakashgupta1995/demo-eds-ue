export default function decorate(block) {
  const ul = block.querySelector('ul');
  const items = ul ? ul.querySelectorAll('li') : [];
  const toggleWrapper = block.children[2];
  const toggleBtn = toggleWrapper ? toggleWrapper.querySelector('p') : null;

  const limit = 14;
  let expanded = false;

  if (!ul || !toggleBtn || items.length <= limit) return;

  // hide items after 14
  items.forEach((item, index) => {
    if (index >= limit) {
      item.style.display = 'none';
    }
  });

  toggleBtn.addEventListener('click', () => {
    expanded = !expanded;

    items.forEach((item, index) => {
      if (index >= limit) {
        item.style.display = expanded ? 'list-item' : 'none';
      }
    });

    // change text
    toggleBtn.childNodes[0].textContent = expanded ? 'View Less ' : 'View All ';

    // rotate arrow
    block.classList.toggle('expanded', expanded);
  });
}