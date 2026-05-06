import { toClassName } from '../../scripts/aem.js';

function createFieldWrapper(fd) {
  const fieldWrapper = document.createElement('div');
  if (fd.style) fieldWrapper.className = fd.style;
  fieldWrapper.classList.add('field-wrapper', `${toClassName(fd.type || 'text')}-wrapper`);
  fieldWrapper.dataset.fieldset = fd.fieldset || '';
  return fieldWrapper;
}

const ids = {};
function generateFieldId(fd, suffix = '') {
  const name = fd.name || fd.type || 'field';
  const slug = toClassName(`form-${name}${suffix}`);
  ids[slug] = ids[slug] || 0;
  const idSuffix = ids[slug] ? `-${ids[slug]}` : '';
  ids[slug] += 1;
  return `${slug}${idSuffix}`;
}

function createLabel(fd) {
  const label = document.createElement('label');
  label.id = generateFieldId(fd, '-label');
  label.textContent = fd.label || fd.name;
  label.setAttribute('for', fd.id);
  
  const isRequired = fd.required && (fd.required.toString().toLowerCase() === 'true' || fd.required.toString().toLowerCase() === 'x');
  if (isRequired) {
    label.dataset.required = true;
  }
  return label;
}

function setCommonAttributes(field, fd) {
  field.id = fd.id;
  field.name = fd.name;
  field.required = fd.required && (fd.required.toString().toLowerCase() === 'true' || fd.required.toString().toLowerCase() === 'x');
  field.placeholder = fd.placeholder || '';
  field.value = fd.value || '';
}

const createHeading = (fd) => {
  const fieldWrapper = createFieldWrapper(fd);
  const level = fd.style && fd.style.includes('sub-heading') ? 3 : 2;
  const heading = document.createElement(`h${level}`);
  heading.textContent = fd.value || fd.label;
  heading.id = fd.id;
  fieldWrapper.append(heading);
  return { field: heading, fieldWrapper };
};

const createPlaintext = (fd) => {
  const fieldWrapper = createFieldWrapper(fd);
  const text = document.createElement('p');
  text.textContent = fd.value || fd.label;
  text.id = fd.id;
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
    if (option.value === fd.value) option.setAttribute('selected', '');
    select.add(option);
    return option;
  };

  if (fd.placeholder) {
    const ph = addOption({ text: fd.placeholder, value: '' });
    ph.setAttribute('disabled', '');
  }

  if (fd.options) {
    let options = [];
    if (fd.options.startsWith('https://')) {
      const optionsUrl = new URL(fd.options);
      const resp = await fetch(`${optionsUrl.pathname}${optionsUrl.search}`);
      const json = await resp.json();
      json.data.forEach((opt) => {
        options.push({ text: opt.Option || opt.option, value: opt.Value || opt.value || opt.Option || opt.option });
      });
    } else {
      options = fd.options.split(',').map((opt) => ({ text: opt.trim(), value: opt.trim() }));
    }
    options.forEach((opt) => addOption(opt));
  }

  const fieldWrapper = createFieldWrapper(fd);
  const label = createLabel(fd);
  fieldWrapper.append(label);
  fieldWrapper.append(select);
  return { field: select, fieldWrapper };
};

const createTextArea = (fd) => {
  const field = document.createElement('textarea');
  setCommonAttributes(field, fd);
  const fieldWrapper = createFieldWrapper(fd);
  const label = createLabel(fd);
  field.setAttribute('aria-labelledby', label.id);
  fieldWrapper.append(label);
  fieldWrapper.append(field);
  return { field, fieldWrapper };
};

const createInput = (fd) => {
  const field = document.createElement('input');
  field.type = fd.type || 'text';
  setCommonAttributes(field, fd);

  const fieldWrapper = createFieldWrapper(fd);
  const label = createLabel(fd);
  field.setAttribute('aria-labelledby', label.id);

  if (fd.type === 'radio' || fd.type === 'checkbox') {
    fieldWrapper.append(field);
    fieldWrapper.append(label);
  } else {
    fieldWrapper.append(label);
    fieldWrapper.append(field);
  }
  return { field, fieldWrapper };
};

const createSubmit = (fd) => {
  const button = document.createElement('button');
  button.textContent = fd.label || fd.name;
  button.classList.add('button');
  button.type = 'submit';
  const fieldWrapper = createFieldWrapper(fd);
  fieldWrapper.append(button);
  return { field: button, fieldWrapper };
};

const FIELD_CREATOR_FUNCTIONS = {
  select: createSelect,
  heading: createHeading,
  plaintext: createPlaintext,
  'text-area': createTextArea,
  submit: createSubmit,
};

export default async function createField(fd, form) {
  fd.id = fd.id || generateFieldId(fd);
  const type = (fd.type || 'text').toLowerCase();
  const createFieldFunc = FIELD_CREATOR_FUNCTIONS[type] || createInput;
  const fieldElements = await createFieldFunc(fd, form);
  return fieldElements.fieldWrapper;
}