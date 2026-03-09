// add delayed functionality here
export default function decorate(block) {
  const list = block.querySelector('.mostsearchedterms ul');
  const items = [...list.querySelectorAll('li')];

  const visibleCount = 14;

  if (items.length <= visibleCount) return;

  // hide items after 14
  items.slice(visibleCount).forEach((li) => {
    li.style.display = 'none';
  });

  // create button wrapper
  const btnWrapper = document.createElement('div');
  btnWrapper.className = 'view-toggle';

  const btn = document.createElement('button');
  btn.textContent = 'View All';

  btnWrapper.append(btn);
  block.append(btnWrapper);

  let expanded = false;

  btn.addEventListener('click', () => {
    expanded = !expanded;

    items.slice(visibleCount).forEach((li) => {
      li.style.display = expanded ? 'list-item' : 'none';
    });

    btn.textContent = expanded ? 'View Less' : 'View All';
  });
}