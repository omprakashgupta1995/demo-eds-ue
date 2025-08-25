export default function decorate(block) {
  const faqItems = [...block.children];

  // Extract categories
  const categories = [
    'All',
    ...new Set(faqItems.map((item) => item.children[0].innerText.trim())),
  ];

  // Create tab list
  const tabList = document.createElement('div');
  tabList.className = 'faq-tabs';

  categories.forEach((cat, index) => {
    const btn = document.createElement('button');
    btn.className = 'faq-tab';
    btn.textContent = cat;
    btn.setAttribute('data-category', cat);
    if (index === 0) btn.classList.add('active');
    tabList.appendChild(btn);
  });

  // Create accordion container
  const accordion = document.createElement('div');
  accordion.className = 'faq-accordion';

  // Build accordion items
  faqItems.forEach((item) => {
    const category = item.children[0].innerText.trim();
    const question = item.children[1].innerText.trim();
    const answer = item.children[2].innerText.trim();

    const accItem = document.createElement('div');
    accItem.className = 'faq-item';
    accItem.setAttribute('data-category', category);

    const q = document.createElement('button');
    q.className = 'faq-question';
    q.textContent = question;

    const a = document.createElement('div');
    a.className = 'faq-answer';
    a.innerHTML = `<p>${answer}</p>`;

    accItem.appendChild(q);
    accItem.appendChild(a);
    accordion.appendChild(accItem);
  });

  // Clear block and append tabs + accordion
  block.innerHTML = '';
  block.appendChild(tabList);
  block.appendChild(accordion);

  // Tab functionality
  tabList.addEventListener('click', (e) => {
    if (e.target.classList.contains('faq-tab')) {
      const selectedCat = e.target.getAttribute('data-category');

      // update active tab
      [...tabList.children].forEach((btn) => btn.classList.remove('active'));
      e.target.classList.add('active');

      // filter accordion
      [...accordion.children].forEach((item) => {
        if (selectedCat === 'All' || item.dataset.category === selectedCat) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    }
  });

  // Accordion functionality
  accordion.addEventListener('click', (e) => {
    if (e.target.classList.contains('faq-question')) {
      const ans = e.target.nextElementSibling;
      e.target.classList.toggle('open');
      ans.classList.toggle('open');
    }
  });
}
