import createField, { createDualRangeField } from "./form-fields.js";

async function createForm(formHref, submitHref) {
  const resp = await fetch(formHref);
  if (!resp.ok) return null;

  const json = await resp.json();
  const form = document.createElement("form");
  form.dataset.action = submitHref || "";

  const dataMap = {};
  json.data.forEach((fd) => {
    const name = (fd.Name || "").trim();
    if (name) dataMap[name] = fd;
  });

  const processed = new Set();

  for (const fd of json.data) {
    const name = (fd.Name || "").trim();
    if (processed.has(name)) continue;

    // Detect Range Pairs (_min and _max)
    if (name.endsWith("_min") && fd.Type === "range") {
      const baseName = name.replace("_min", "");
      const maxName = `${baseName}_max`;

      if (dataMap[maxName]) {
        const dualRange = await createDualRangeField(
          baseName,
          fd,
          dataMap[maxName],
        );
        form.append(dualRange);
        processed.add(name);
        processed.add(maxName);
        continue;
      }
    }

    // Skip isolated max fields that were already processed
    if (name.endsWith("_max") && processed.has(name.replace("_max", "_min")))
      continue;

    const fieldEl = await createField(fd, form);
    if (fieldEl) form.append(fieldEl);
    processed.add(name);
  }

  return form;
}

export default async function decorate(block) {
  const links = [...block.querySelectorAll("a")];
  const formLinkEl = links.find((a) => a.href.includes(".json"));

  if (!formLinkEl) return;

  const submitLinkEl = links.find((a) => a !== formLinkEl);
  const form = await createForm(
    formLinkEl.href,
    submitLinkEl ? submitLinkEl.href : "",
  );

  if (form) {
    block.replaceChildren(form);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());
      console.log("Calculator Search:", payload);
      // Add logic here to filter your carousel/results based on payload
    });
  }
}
