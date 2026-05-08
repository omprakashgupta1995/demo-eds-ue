
/**
 * Utility to easily create DOM elements with classes and text content */
function createEl(tag, classNames = '', textContent = '') {
  const el = document.createElement(tag);
  if (classNames) {
    classNames.split(' ').forEach((cls) => el.classList.add(cls));
  }
  if (textContent) el.textContent = textContent;
  return el;
}

export default function decorate(block) {
  const container = block.firstElementChild?.firstElementChild;
  if (!container) return;

  container.classList.add('fund-card');

  // --- 1. Style Header Elements ---
  const iconH3 = container.querySelector('h3:first-of-type');
  if (iconH3) iconH3.classList.add('fund-icon');

  const titleH3 = container.querySelectorAll('h3')[1];
  if (titleH3) titleH3.classList.add('fund-title');

  const desc = container.querySelector('p:not(.button-container)');
  if (desc) desc.classList.add('fund-desc');

  // Identify the tags vs data lists
  const allUls = Array.from(container.querySelectorAll('ul'));
  const tagsUl = allUls.find((ul) => !ul.querySelector('ul')); 

  if (tagsUl) {
    tagsUl.classList.add('fund-tags');
    tagsUl.querySelectorAll('li').forEach((li) => li.classList.add('fund-tag-pill'));
  }

  // Find all remaining data lists
  const dataUls = allUls.filter((ul) => ul !== tagsUl);
  // if (dataUls.length === 0) return; 

  // --- 2. Parse Data Lists into a JS Object ---
  const fundData = {};
  
  dataUls.forEach((dataUl) => {
    [...dataUl.children].forEach((planLi) => {
      const planNameP = planLi.querySelector('p strong') || planLi.querySelector('p');
      if (!planNameP) return;
      
      const planName = planNameP.textContent.trim();
      fundData[planName] = { returns: {}, nav: { label: 'NAV', value: '-', trend: '' } };


      const detailsUl = planLi.querySelector('ul');
      if (detailsUl) {
        [...detailsUl.children].forEach((detailLi) => {
          const clone = detailLi.cloneNode(true);
          const innerUl = clone.querySelector('ul');
          if (innerUl) innerUl.remove();
          
          const rawLabel = clone.textContent.replace(/\u00A0/g, ' ').trim();
          const valueNode = detailLi.querySelector('ul li');
          const valueText = valueNode ? valueNode.textContent.trim() : '';

          if (rawLabel.toLowerCase().includes('return')) {
            const durationLabel = rawLabel.replace(/Return/i, '').trim();
            fundData[planName].returns[durationLabel] = valueText.replace('%', '').trim();
            
          } else if (rawLabel.toLowerCase().includes('nav')) {
            fundData[planName].nav.label = rawLabel;
            const navParts = valueText.split('%');
            fundData[planName].nav.value = navParts[0].trim();
            if (navParts.length > 1 && navParts[1].trim()) {
              fundData[planName].nav.trend = navParts[1].trim(); 
            }
          }
        });
      }
    });
    
    dataUl.style.display = 'none'; // Hide raw EDS list
  });

  // --- Helper to Build Custom Div/Ul Dropdowns ---
  function buildCustomSelect(optionsArray, extraClass, onChange) {
    const wrapper = createEl('div', `custom-select ${extraClass}`);
    wrapper.dataset.value = optionsArray[0]; 

    // The visible button
    const trigger = createEl('div', 'custom-select-trigger', optionsArray[0]);
    trigger.setAttribute('tabindex', '0'); // Make it keyboard accessible
    
    // The hidden list
    const list = createEl('ul', 'custom-select-list');
    
    optionsArray.forEach((opt) => {
      const li = createEl('li', 'custom-select-option', opt);
      if (opt === optionsArray[0]) li.classList.add('selected');
      
      li.addEventListener('click', (e) => {
        e.stopPropagation();
        trigger.textContent = opt;
        wrapper.dataset.value = opt;
        
        // Update selected class
        list.querySelectorAll('li').forEach(el => el.classList.remove('selected'));
        li.classList.add('selected');
        
        list.classList.remove('open');
        trigger.classList.remove('active');
        onChange(); // Fire the UI update!
      });
      list.append(li);
    });

    // Toggle open/close on click
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      // Close any other open dropdowns first
      document.querySelectorAll('.custom-select-list.open').forEach(l => {
        if (l !== list) {
          l.classList.remove('open');
          l.previousElementSibling.classList.remove('active');
        }
      });
      list.classList.toggle('open');
      trigger.classList.toggle('active');
    });

    wrapper.append(trigger, list);
    return wrapper;
  }

  // Global click listener to close dropdowns when clicking outside
  document.addEventListener('click', () => {
    document.querySelectorAll('.custom-select-list.open').forEach(l => {
      l.classList.remove('open');
      l.previousElementSibling.classList.remove('active');
    });
  });

  // --- 3. Build Interactive Stats DOM ---
  const statsContainer = createEl('div', 'fund-stats-container');
  const statsGrid = createEl('div', 'fund-stats-grid');
  
  // Return Column
  const returnCol = createEl('div', 'stat-col return-col');
  const returnHeader = createEl('div', 'stat-header');
  returnHeader.append(createEl('span', 'stat-label', 'Return'));

  const returnValue = createEl('div', 'stat-value highlight');
  const returnTextNode = document.createTextNode('');
  returnValue.append(returnTextNode, createEl('span', '', '%'));
  returnCol.append(returnHeader, returnValue);

  // NAV Column
  const navCol = createEl('div', 'stat-col nav-col');
  const navHeader = createEl('div', 'stat-header');
  const navLabel = createEl('span', 'stat-label');
  navHeader.append(navLabel);

  const navValue = createEl('div', 'stat-value');
  const navTextNode = document.createTextNode('');
  const navTrend = createEl('span', 'trend up');
  
  navValue.append(navTextNode, createEl('span', '', '% '), navTrend);
  navCol.append(navHeader, navValue);

  statsGrid.append(returnCol, navCol);

  // --- 4. Interactivity Logic & Custom Dropdown Injection ---
  let planSelectWrapper, durationSelectWrapper;

  const updateUI = () => {
    const selectedPlan = planSelectWrapper.dataset.value;
    const selectedDuration = durationSelectWrapper.dataset.value;
    const currentData = fundData[selectedPlan];

    if (!currentData) return;

    returnTextNode.textContent = currentData.returns[selectedDuration] || '--';

    if (currentData.nav.value && currentData.nav.value !== '-') {
      navCol.style.visibility = 'visible';
      navLabel.textContent = currentData.nav.label;
      navTextNode.textContent = currentData.nav.value;
      
      if (currentData.nav.trend) {
        navTrend.textContent = `↗ ${currentData.nav.trend}`;
        navTrend.style.display = 'inline-flex';
      } else {
        navTrend.style.display = 'none';
      }
    } else {
      navCol.style.visibility = 'hidden'; 
    }
  };

  // Build the Plan Select 
  const planOptions = Object.keys(fundData);
  planSelectWrapper = buildCustomSelect(planOptions, 'plan-select-wrapper', updateUI);
  
  // Build the Duration Select
  const durationOptions = Object.keys(fundData[planOptions[0]].returns);
  durationSelectWrapper = buildCustomSelect(durationOptions, 'duration-select-wrapper', updateUI);

  // Inject into DOM
  statsContainer.append(planSelectWrapper, statsGrid);
  returnHeader.append(durationSelectWrapper);
  
  const btnContainer = container.querySelector('.button-container');
  if (btnContainer) {
    container.insertBefore(statsContainer, btnContainer);
  } else {
    container.append(statsContainer);
  }

  updateUI();

  // --- 5. Clean up metadata & Style Footer ---
  if (btnContainer) {
    btnContainer.classList.add('fund-action');
  }

  const allPs = container.querySelectorAll('p');
  if (allPs.length > 0) {
    const footerP = allPs[allPs.length - 1];
    footerP.classList.add('fund-footer');
  }
}