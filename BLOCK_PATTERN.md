# Block Creation Pattern

This document defines the standard pattern for creating blocks in this EDS project.

---

## 5-Point Pattern Summary

### 1. Block Structure
Each block lives in `blocks/{block-name}/` with exactly 3 files:
```
blocks/{block-name}/
├── _{block-name}.json      # Block definition (authoring config)
├── {block-name}.js         # Decoration logic
└── {block-name}.css        # Styles
```

### 2. Definition JSON (`_{block-name}.json`)
Three required sections:

**definitions[]** — Block + child item definitions with `xwalk` plugins:
- Parent block: `resourceType: "core/franklin/components/block/v1/block"` with `filter` or `model`
- Child items: `resourceType: "core/franklin/components/block/v1/block/item"` with `model`

**models[]** — Authoring fields (supported types):
- `richtext` — Rich text editor
- `text` — Plain text input
- `reference` — Asset/page reference
- `multiselect` — Multiple choice
- `select` — Single choice
- `aem-content` — AEM content picker

**filters[]** — Nesting rules (which components can contain which)

### 3. Decoration JS (`{block-name}.js`)
```javascript
export default function decorate(block) {
  const rows = [...block.children];
  // Transform DOM structure
  // Add classes, create elements
  // Use helpers from scripts/aem.js
}
```

**Key helpers from `scripts/aem.js`:**
- `createOptimizedPicture(src, alt, eager, breakpoints)` — responsive images
- `readBlockConfig(block)` — extract config from metadata rows
- `wrapTextNodes(block)` — auto-wrap text in `<p>`
- `decorateButtons(element)` — link→button conversion
- `loadCSS(href)`, `loadScript(src)` — dynamic loading
- `moveInstrumentation(from, to)` — preserve editor instrumentation

### 4. Registration (Required in Both Files)
**`component-definition.json`** — Add under "Blocks" group with `xwalk` plugin config

**`component-filters.json`** — Define nesting rules (parent → allowed children)

### 5. No innerHTML in Decoration — It Breaks Authoring
Using `innerHTML` destroys editor instrumentation and breaks the authoring experience.

---

## innerHTML Alternatives — Code Examples

| Scenario | ❌ Don't Use | ✅ Use Instead |
|----------|-------------|----------------|
| Set text content | `el.innerHTML = 'Hello'` | `el.textContent = 'Hello'` |
| Set HTML from string | `el.innerHTML = '<p>Hi</p>'` | `const p = document.createElement('p'); p.textContent = 'Hi'; el.appendChild(p);` |
| Clear children | `el.innerHTML = ''` | `el.replaceChildren()` or `el.textContent = ''` |
| Move existing nodes | `el.innerHTML = otherEl.innerHTML` | `el.append(...otherEl.childNodes)` or `otherEl.replaceWith(newEl)` |
| Rich text from authoring | Re-serializing HTML | **Don't re-serialize** — authored content is already wrapped in `<p>` by `wrapTextNodes()`. Move nodes directly. |

### Safe Rich Text Pattern
```javascript
// Authored content comes pre-wrapped: <div><p>Rich text</p></div>
// Just move the existing paragraph, don't touch innerHTML
const contentDiv = row.children[1];
const p = contentDiv.querySelector('p');
if (p) {
  newWrapper.appendChild(p);  // preserves instrumentation
}
```

### DOM APIs to Prefer
- `document.createElement(tag)`
- `element.textContent = string`
- `element.appendChild(node)` / `element.append(...nodes)`
- `element.replaceChildren(...nodes)`
- `element.replaceWith(...nodes)`
- `node.cloneNode(deep)`
- `DOMParser` — only if you must parse an HTML string (rare)

---

## Boilerplate Reference

Template files live in `blocks/_template/` (underscore = hidden from authoring):

```
blocks/_template/
├── _template.json    # Copy → rename to _{your-block}.json
├── template.js       # Copy → rename to {your-block}.js
└── template.css      # Copy → rename to {your-block}.css
```

### Quick Start
1. Copy `blocks/_template/` → `blocks/your-block/`
2. Rename files: `_template.json` → `_your-block.json`, `template.js` → `your-block.js`, `template.css` → `your-block.css`
3. Update `_your-block.json`: change `id`, `title`, `models`, `filters`
4. Update `your-block.js`: implement decoration logic
5. Update `your-block.css`: add styles
6. Register in `component-definition.json` + `component-filters.json`

---

## Registration Checklist

### component-definition.json
```json
{
  "title": "Your Block",
  "id": "your-block",
  "plugins": {
    "xwalk": {
      "page": {
        "resourceType": "core/franklin/components/block/v1/block",
        "template": {
          "name": "Your Block",
          "filter": "your-block"  // or "model": "your-block"
        }
      }
    }
  }
}
```
Add child item definition if block has nested items.

### component-filters.json
```json
{
  "id": "your-block",
  "components": ["child-item-id"]  // or [] for no children
}
```
Add to `section` components array if block should be available in sections.

---

## Common Pitfalls

1. **Forgetting to register in both files** → block won't appear or won't nest correctly
2. **Using `innerHTML`** → breaks authoring, loses instrumentation
3. **Not calling `wrapTextNodes(block)`** — but this is auto-called by `decorateBlock()` in aem.js
4. **Missing `moveInstrumentation`** when moving authored elements → editor loses track
5. **Hardcoding widths/breakpoints** — use CSS custom properties from `styles.css`
6. **Not handling empty rows** — always filter: `rows.filter(r => r.textContent.trim() || r.querySelector('picture'))`