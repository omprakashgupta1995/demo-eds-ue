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

  // Updated to check "Required" instead of "Mandatory"
  if (fd.Required && (fd.Required.toLowerCase() === 'true' || fd.Required.toLowerCase() === 'x')) {
    label.dataset.required = true;
  }
  return label;
}

function setCommonAttributes(field, fd) {
  field.id = fd.Id;
  field.name = fd.Name;
  // Updated to check "Required" instead of "Mandatory"
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

export default async function createField(fd, form) {
  fd.Id = fd.Id || generateFieldId(fd);
  const type = fd.Type ? fd.Type.toLowerCase() : 'text';
  const createFieldFunc = FIELD_CREATOR_FUNCTIONS[type] || createInput;
  const fieldElements = await createFieldFunc(fd, form);
  return fieldElements.fieldWrapper;
}