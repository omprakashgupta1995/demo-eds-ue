import { toClassName } from "../../scripts/aem.js";

function createFieldWrapper(fd) {
  const fieldWrapper = document.createElement("div");
  if (fd.Style) fieldWrapper.className = fd.Style;
  fieldWrapper.classList.add("field-wrapper", `${fd.Type}-wrapper`);
  return fieldWrapper;
}

const ids = [];
function generateFieldId(fd, suffix = "") {
  const name = fd.Name || "field";
  const slug = toClassName(`form-${name}${suffix}`);
  ids[slug] = ids[slug] || 0;
  const idSuffix = ids[slug] ? `-${ids[slug]}` : "";
  ids[slug] += 1;
  return `${slug}${idSuffix}`;
}

/**
 * Creates the dual-handle range slider with real-time value updates
 */
export async function createDualRangeField(baseName, fdMin, fdMax) {
  const fieldWrapper = document.createElement("div");
  fieldWrapper.classList.add(
    "field-wrapper",
    "range-group-wrapper",
    `${baseName}-group`,
  );

  // 1. Group Header (e.g., Engine)
  const groupLabel = document.createElement("h3");
  groupLabel.classList.add("range-group-label");
  groupLabel.textContent = fdMin.Label || baseName;
  fieldWrapper.append(groupLabel);

  // 2. Slider UI (The track and handles)
  const sliderContainer = document.createElement("div");
  sliderContainer.classList.add("range-slider-container");

  // Define Min/Max bounds (you can also pull these from spreadsheet columns if you add them)
  const minLimit = 0;
  const maxLimit = baseName.toLowerCase().includes("price") ? 500000 : 500;

  sliderContainer.innerHTML = `
    <div class="range-slider-track"></div>
    <div class="range-slider-fill"></div>
    <input type="range" class="range-input min" name="${fdMin.Name}" min="${minLimit}" max="${maxLimit}" value="${fdMin.Value || minLimit}">
    <input type="range" class="range-input max" name="${fdMax.Name}" min="${minLimit}" max="${maxLimit}" value="${fdMax.Value || maxLimit}">
  `;
  fieldWrapper.append(sliderContainer);

  // 3. Values Display Row
  const valuesRow = document.createElement("div");
  valuesRow.classList.add("range-values-row");
  const unit = baseName.toLowerCase().includes("price") ? "₹" : "cc";

  valuesRow.innerHTML = `
    <div class="value-block">
      <span class="label">Min</span>
      <span class="display">${unit === "₹" ? unit : ""} <strong>${fdMin.Value || minLimit}</strong> ${unit !== "₹" ? unit : ""}</span>
    </div>
    <div class="value-block">
      <span class="label">Max</span>
      <span class="display">${unit === "₹" ? unit : ""} <strong>${fdMax.Value || maxLimit}</strong> ${unit !== "₹" ? unit : ""}</span>
    </div>
  `;
  fieldWrapper.append(valuesRow);

  // 4. Slider Interaction Logic
  const inputs = sliderContainer.querySelectorAll("input");
  const fill = sliderContainer.querySelector(".range-slider-fill");
  const displays = [
    valuesRow.querySelector(".value-block:first-child strong"),
    valuesRow.querySelector(".value-block:last-child strong"),
  ];

  const updateSlider = () => {
    const val1 = parseInt(inputs[0].value);
    const val2 = parseInt(inputs[1].value);

    // Prevent handles from crossing
    if (val1 >= val2) {
      inputs[0].value = val2 - 1;
      inputs[1].value = val1 + 1;
    }

    // Update Display Text
    displays[0].textContent = inputs[0].value;
    displays[1].textContent = inputs[1].value;

    // Update CSS Fill Position
    const percent1 =
      ((inputs[0].value - minLimit) / (maxLimit - minLimit)) * 100;
    const percent2 =
      ((inputs[1].value - minLimit) / (maxLimit - minLimit)) * 100;
    fill.style.left = `${percent1}%`;
    fill.style.width = `${percent2 - percent1}%`;
  };

  inputs.forEach((input) => input.addEventListener("input", updateSlider));
  // Initial call to set the fill position
  setTimeout(updateSlider, 10);

  return fieldWrapper;
}

function createLabel(fd) {
  const label = document.createElement("label");
  label.id = generateFieldId(fd, "-label");
  label.textContent = fd.Label || fd.Name;
  label.setAttribute("for", fd.Id);
  return label;
}

function setCommonAttributes(field, fd) {
  field.id = fd.Id;
  field.name = fd.Name;
  field.value = fd.Value || "";
}

const createSubmit = (fd) => {
  const button = document.createElement("button");
  button.textContent = fd.Label || fd.Name || "Submit";
  button.classList.add("button", "primary");
  button.type = "submit";
  const fieldWrapper = createFieldWrapper(fd);
  fieldWrapper.append(button);
  return { field: button, fieldWrapper };
};

const createInput = (fd) => {
  const field = document.createElement("input");
  field.type = fd.Type || "text";
  setCommonAttributes(field, fd);
  const fieldWrapper = createFieldWrapper(fd);
  const label = createLabel(fd);
  field.setAttribute("aria-labelledby", label.id);
  fieldWrapper.append(field);
  fieldWrapper.prepend(label);
  return { field, fieldWrapper };
};

const FIELD_CREATOR_FUNCTIONS = {
  submit: createSubmit,
};

export default async function createField(fd, form) {
  fd.Id = fd.Id || generateFieldId(fd);
  const type = fd.Type ? fd.Type.toLowerCase() : "text";
  const createFieldFunc = FIELD_CREATOR_FUNCTIONS[type] || createInput;
  const fieldElements = await createFieldFunc(fd, form);
  return fieldElements.fieldWrapper;
}
