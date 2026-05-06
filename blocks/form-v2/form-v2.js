import { toClassName } from '../../scripts/aem.js';

// --- Field Creation Utilities ---

function createFieldWrapper(fd) {
  const fieldWrapper = document.createElement('div');
  if (fd.Style) fieldWrapper.className = fd.Style;
  fieldWrapper.classList.add('field-wrapper', `${fd.Type}-wrapper`);
  fieldWrapper.dataset.fieldset = fd.Fieldset || '';
  return fieldWrapper;
}

const ids = [];
function generateFieldId(fd, suffix = '') {
  const name = fd.Name || 'field';
  const slug = toClassName(`form-${name}${suffix}`);
  ids[slug] = ids[slug] || 0;
  const idSuffix = ids[slug] ? `-${ids[slug]}` : '';
  ids[slug] += 1;
  return `${slug}${idSuffix}`;
}

function createLabel(fd) {
  const label = document.createElement('label');
  label.id = generateFieldId(fd, '-label');
  label.textContent = fd.Label || fd.Name;
  label.setAttribute('for', fd.Id);

  if (fd.Required && (fd.Required.toLowerCase() === 'true' || fd.Required.toLowerCase() === 'x')) {
    label.dataset.required = true;
  }
  return label;
}

function setCommonAttributes(field, fd) {
  field.id = fd.Id;
  field.name = fd.Name;
  field.required = fd.Required && (fd.Required.toLowerCase() === 'true' || fd.Required.toLowerCase() === 'x');
  field.placeholder = fd.Placeholder || '';
  field.value = fd.Value || '';
}

const createInput = (fd) => {
  const field = document.createElement('input');
  field.type = fd.Type || 'text';
  setCommonAttributes(field, fd);
  
  const fieldWrapper = createFieldWrapper(fd);
  const label = createLabel(fd);
  field.setAttribute('aria-labelledby', label.id);
  
  fieldWrapper.append(field);
  
  if (fd.Type === 'radio' || fd.Type === 'checkbox') {
    fieldWrapper.append(label);
  } else {
    fieldWrapper.prepend(label);
  }
  return { field, fieldWrapper };
};

const createSubmit = (fd) => {
  const button = document.createElement('button');
  button.textContent = fd.Label || fd.Name || 'Submit';
  button.classList.add('button', 'primary');
  button.type = 'submit';
  const fieldWrapper = createFieldWrapper(fd);
  fieldWrapper.append(button);
  return { field: button, fieldWrapper };
};

const FIELD_CREATOR_FUNCTIONS = {
  submit: createSubmit,
  button: createSubmit,
};

async function createField(fd, form) {
  fd.Id = fd.Id || generateFieldId(fd);
  const type = fd.Type ? fd.Type.toLowerCase() : 'text';
  const createFieldFunc = FIELD_CREATOR_FUNCTIONS[type] || createInput;
  const fieldElements = await createFieldFunc(fd, form);
  return fieldElements.fieldWrapper;
}

// --- Helper to extract a nice Tab Name from the URL ---
function formatTabName(url) {
  try {
    const path = new URL(url).pathname;
    const filename = path.split('/').pop().replace('.json', '');
    // e.g., "motorcycles-form" -> "Motorcycles Form"
    return filename.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  } catch (e) {
    return 'Tab';
  }
}

// --- Main Block Decorator ---

export default async function decorate(block) {
  // 1. Gather all authored rows (formV2-items)
  const rows = [...block.children];
  if (rows.length === 0) return;

  // 2. Create Tab UI Containers
  const tabList = document.createElement('div');
  tabList.className = 'form-v2-tabs';
  
  const tabPanelsContainer = document.createElement('div');
  tabPanelsContainer.className = 'form-v2-panels';

  // 3. Process each authored form item
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    
    // Extract Form URL and API URL from the block's columns
    const formLink = row.querySelector('a[href$=".json"]');
    // Assuming the API URL is in the second column/div if authored that way
    const apiUrlDiv = row.children.length > 1 ? row.children[1] : null;
    const apiUrl = apiUrlDiv ? apiUrlDiv.textContent.trim() : '';

    if (!formLink) continue;
    const formUrl = formLink.href;

    // --- Create Tab Button ---
    const tabName = formatTabName(formUrl); // Converts /motorcycles.json to "Motorcycles"
    const tabBtn = document.createElement('button');
    tabBtn.className = `form-tab-btn ${i === 0 ? 'active' : ''}`;
    tabBtn.textContent = tabName;
    tabBtn.dataset.target = `panel-${i}`;
    tabList.append(tabBtn);

    // --- Create Tab Panel & Form ---
    const panel = document.createElement('div');
    panel.className = `form-tab-panel ${i === 0 ? 'active' : ''}`;
    panel.id = `panel-${i}`;

    try {
      const resp = await fetch(formUrl);
      if (!resp.ok) throw new Error(`Failed to fetch form data: ${resp.status}`);
      const json = await resp.json();

      const form = document.createElement('form');
      form.dataset.apiUrl = apiUrl; // Store API URL for submission
      
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(`Submitting form to: ${form.dataset.apiUrl}`);
        // Handle custom submit logic here
      });

      // Build fields
      if (json && json.data) {
        for (const fd of json.data) {
          const fieldWrapper = await createField(fd, form);
          if (fieldWrapper) {
            form.append(fieldWrapper);
          }
        }
      }
      
      panel.append(form);
    } catch (error) {
      console.error('Error decorating form block:', error);
      panel.innerHTML = '<p>Error loading form.</p>';
    }

    tabPanelsContainer.append(panel);
  }

  // 4. Add Tab Switching Logic
  tabList.addEventListener('click', (e) => {
    if (e.target.classList.contains('form-tab-btn')) {
      // Remove active class from all buttons and panels
      tabList.querySelectorAll('.form-tab-btn').forEach(btn => btn.classList.remove('active'));
      tabPanelsContainer.querySelectorAll('.form-tab-panel').forEach(p => p.classList.remove('active'));

      // Add active class to clicked button and target panel
      e.target.classList.add('active');
      const targetPanel = tabPanelsContainer.querySelector(`#${e.target.dataset.target}`);
      if (targetPanel) targetPanel.classList.add('active');
    }
  });

  // 5. Replace block content with our new Tabbed UI
  block.replaceChildren(tabList, tabPanelsContainer);
}