import { toClassName } from '../../scripts/aem.js';

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

const createHeading = (fd) => {
  const fieldWrapper = createFieldWrapper(fd);
  const level = fd.Style && fd.Style.includes('sub-heading') ? 3 : 2;
  const heading = document.createElement(`h${level}`);
  heading.textContent = fd.Value || fd.Label;
  heading.id = fd.Id;
  fieldWrapper.append(heading);
  return { field: heading, fieldWrapper };
};

const createPlaintext = (fd) => {
  const fieldWrapper = createFieldWrapper(fd);
  const text = document.createElement('p');
  text.textContent = fd.Value || fd.Label;
  text.id = fd.Id;
  fieldWrapper.append(text);
  return { field: text, fieldWrapper };
};

const createSelect = async (fd) => {
  const select = document.createElement('select');
  setCommonAttributes(select, fd);
  const addOption = ({ text, value }) => {
    const option = document.createElement('option');
    option.text = text.trim();
    option.value = value.trim();
    if (option.value === fd.Value) option.setAttribute('selected', '');
    select.add(option);
    return option;
  };

  if (fd.Placeholder) {
    const ph = addOption({ text: fd.Placeholder, value: '' });
    ph.setAttribute('disabled', '');
  }

  if (fd.Options) {
    let options = [];
    if (fd.Options.startsWith('https://')) {
      const optionsUrl = new URL(fd.Options);
      const resp = await fetch(`${optionsUrl.pathname}${optionsUrl.search}`);
      const json = await resp.json();
      json.data.forEach((opt) => {
        options.push({ text: opt.Option, value: opt.Value || opt.Option });
      });
    } else {
      options = fd.Options.split(',').map((opt) => ({ text: opt.trim(), value: opt.trim() }));
    }
    options.forEach((opt) => addOption(opt));
  }

  const fieldWrapper = createFieldWrapper(fd);
  fieldWrapper.append(select);
  fieldWrapper.prepend(createLabel(fd));
  return { field: select, fieldWrapper };
};

const createConfirmation = (fd, form) => {
  form.dataset.confirmation = new URL(fd.Value).pathname;
  return {};
};

const createSubmit = (fd) => {
  const button = document.createElement('button');
  button.textContent = fd.Label || fd.Name || 'Submit';
  button.classList.add('button');
  button.type = 'submit';
  const fieldWrapper = createFieldWrapper(fd);
  fieldWrapper.append(button);
  return { field: button, fieldWrapper };
};

const createTextArea = (fd) => {
  const field = document.createElement('textarea');
  setCommonAttributes(field, fd);
  const fieldWrapper = createFieldWrapper(fd);
  const label = createLabel(fd);
  field.setAttribute('aria-labelledby', label.id);
  fieldWrapper.append(field);
  fieldWrapper.prepend(label);
  return { field, fieldWrapper };
};

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

const FIELD_CREATOR_FUNCTIONS = {
  select: createSelect,
  heading: createHeading,
  plaintext: createPlaintext,
  'text-area': createTextArea,
  submit: createSubmit,
  confirmation: createConfirmation,
};

// Removed export default from here so the decorate function can be the entry point
async function createField(fd, form) {
  fd.Id = fd.Id || generateFieldId(fd);
  const type = fd.Type ? fd.Type.toLowerCase() : 'text';
  const createFieldFunc = FIELD_CREATOR_FUNCTIONS[type] || createInput;
  const fieldElements = await createFieldFunc(fd, form);
  return fieldElements.fieldWrapper;
}

// Added export default to the block decorator
export default async function decorate(block) {
  // 1. Find the link to the JSON file authored in the document
  const formLink = block.querySelector('a[href$=".json"]');
  if (!formLink) {
    console.warn('No form definition link found in the block.');
    return;
  }

  const formUrl = formLink.href;

  try {
    // 2. Fetch the JSON data
    const resp = await fetch(formUrl);
    if (!resp.ok) throw new Error(`Failed to fetch form data: ${resp.status}`);
    const json = await resp.json();

    // 3. Create the actual <form> element
    const form = document.createElement('form');
    
    // Setup submit handler
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('Form submitted!');
      // Add your submission logic here (e.g., POST to an API)
    });

    // 4. Loop through the JSON data and build the fields
    if (json && json.data) {
      for (const fd of json.data) {
        const fieldWrapper = await createField(fd, form);
        if (fieldWrapper) {
          form.append(fieldWrapper);
        }
      }
    }

    // 5. Replace the original block content (the link) with the fully built form
    block.replaceChildren(form);

  } catch (error) {
    console.error('Error decorating form block:', error);
    block.innerHTML = '<p>Sorry, the form could not be loaded.</p>';
  }
}