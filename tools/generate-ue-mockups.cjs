#!/usr/bin/env node
/**
 * generate-ue-mockups.cjs
 *
 * Reads each block's _<block>.json and renders an SVG that faithfully
 * replicates the Adobe Universal Editor properties-panel UI.
 *
 * Every field is driven 100% from the JSON:
 *   - f.label        → field label shown in the panel
 *   - f.description  → hint shown below the label (gray, smaller)
 *   - f.value        → pre-filled value shown inside text fields
 *   - f.multi        → controls "Max 1 items" vs "Max items" and "+ Add"
 *   - f.component    → determines widget type (reference / richtext / text / aem-content)
 *   - f.name         → used to derive a realistic sample filename for reference fields
 *
 * Usage:  node tools/generate-ue-mockups.cjs
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const BLOCKS_DIR = path.resolve(__dirname, '..', 'blocks');

// ─── Layout constants (match real UE proportions) ─────────────────────────────
const PANEL_W    = 480;   // properties panel width (px)
const TOOLBAR_W  = 52;    // right-side vertical icon strip
const TOTAL_W    = PANEL_W + TOOLBAR_W;

const BREADCRUMB_H  = 38;   // top breadcrumb row
const BLOCK_HDR_H   = 52;   // block-title card row
const FIELD_TOP_PAD = 12;   // padding above first field
const FIELD_GAP     = 12;   // vertical gap between fields
const BOTTOM_PAD    = 24;

// Per-component heights (label + optional desc + widget)
const LABEL_H     = 18;   // field label text height
const DESC_H      = 16;   // description hint height
const REF_CARD_H  = 48;   // reference item card height
const ADD_ROW_H   = 28;   // "+ Add" row height
const RT_CARD_H   = 48;   // richtext preview card height
const TXT_CARD_H  = 36;   // text input card height

// ─── Helpers ──────────────────────────────────────────────────────────────────
function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
function trunc(s, max) {
  if (!s) return '';
  return s.length > max ? s.slice(0, max) + '…' : s;
}

/** Convert a field label to a realistic sample filename  e.g. "Background Image" → "background_image.png" */
function labelToFilename(label) {
  return label.toLowerCase()
    .replace(/[()[\]/\\]/g, '')
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '') + '.png';
}

/** Richtext preview: use description first, fall back to generic. */
function rtPreview(f) {
  if (f.description) return trunc(f.description, 45);
  return trunc(`${f.label} content here…`, 45);
}

// ─── Per-field height calculation (must match render output exactly) ──────────
function fieldHeight(f) {
  const hasDesc = !!f.description;
  const labelBlock = LABEL_H + (hasDesc ? DESC_H : 0) + 8; // 8px gap label→widget
  switch (f.component) {
    case 'reference':
      // label [+ desc] + item card + Add row
      return labelBlock + REF_CARD_H + ADD_ROW_H;
    case 'richtext':
      return labelBlock + RT_CARD_H;
    default: // text, aem-content, checkbox, select …
      return labelBlock + TXT_CARD_H;
  }
}

// ─── SVG atoms ────────────────────────────────────────────────────────────────

/** 6-dot drag handle */
function dragHandle(cx, cy) {
  const out = [];
  for (let row = 0; row < 3; row++)
    for (let col = 0; col < 2; col++)
      out.push(`<circle cx="${cx + col * 5}" cy="${cy + row * 5}" r="1.5" fill="#B0B8C4"/>`);
  return out.join('');
}

/** Small image thumbnail placeholder */
function imgThumb(x, y, w = 38, h = 38) {
  return [
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="#DDE3EC"/>`,
    `<text x="${x + w / 2}" y="${y + h / 2 + 5}" font-size="14" fill="#9CA3AF" text-anchor="middle">&#128247;</text>`,
  ].join('');
}

/** Cube block icon */
function cubeIcon(x, y) {
  const s = 20;
  return [
    `<rect x="${x + 1}" y="${y + 6}" width="${s - 2}" height="${s - 8}" rx="1" fill="none" stroke="#555" stroke-width="1.4"/>`,
    `<polygon points="${x + 1},${y + 6} ${x + s / 2},${y + 2} ${x + s - 1},${y + 6} ${x + s / 2},${y + 10}" fill="none" stroke="#555" stroke-width="1.4"/>`,
    `<line x1="${x + s / 2}" y1="${y + 10}" x2="${x + s / 2}" y2="${y + s - 2}" stroke="#555" stroke-width="1.4"/>`,
  ].join('');
}

// ─── Field renderers ──────────────────────────────────────────────────────────
// Each renderer returns SVG fragment strings; 'y' is the top of the field block.

function renderReference(f, y) {
  const label    = esc(f.label || f.name);
  const desc     = f.description ? esc(trunc(f.description, 50)) : null;
  const maxTxt   = f.multi === false ? 'Max 1 items' : 'Max items';
  // Derive realistic sample filename from the field label
  const filename = esc(labelToFilename(f.label || f.name));
  const iw       = PANEL_W - 32;

  const labelY   = y + LABEL_H;
  const descY    = desc ? labelY + DESC_H : labelY;
  const cardY    = descY + 8;
  const addY     = cardY + REF_CARD_H + 6;

  const parts = [
    `<!-- ── field: ${label} (reference) ── -->`,
    // label row: field label left, "Max N items" right
    `<text x="16" y="${labelY}" font-size="12" fill="#4B5563" font-weight="500">${label}</text>`,
    `<text x="${PANEL_W - 16}" y="${labelY}" font-size="11" fill="#9CA3AF" text-anchor="end">${maxTxt}</text>`,
    // optional description hint
    desc ? `<text x="16" y="${descY}" font-size="10" fill="#9CA3AF">${desc}</text>` : '',
    // item card
    `<rect x="16" y="${cardY}" width="${iw}" height="${REF_CARD_H}" rx="5" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1"/>`,
    dragHandle(26, cardY + 14),
    imgThumb(44, cardY + 5, 38, 38),
    `<text x="90" y="${cardY + 29}" font-size="12" fill="#1F2937">${filename}</text>`,
    `<text x="${16 + iw - 12}" y="${cardY + 30}" font-size="16" fill="#9CA3AF" text-anchor="end">&#x2715;</text>`,
    // + Add button (always shown, matching real UE behaviour)
    `<text x="28" y="${addY + 17}" font-size="18" fill="#0265DC" font-weight="300">+</text>`,
    `<text x="48" y="${addY + 17}" font-size="12" fill="#0265DC" font-weight="500">Add</text>`,
  ];
  return parts.filter(Boolean).join('\n  ');
}

function renderRichtext(f, y) {
  const label  = esc(f.label || f.name);
  const desc   = f.description ? esc(trunc(f.description, 50)) : null;
  const preview = esc(rtPreview(f));
  const iw     = PANEL_W - 32;

  const labelY = y + LABEL_H;
  const descY  = desc ? labelY + DESC_H : labelY;
  const cardY  = descY + 8;

  const parts = [
    `<!-- ── field: ${label} (richtext) ── -->`,
    `<text x="16" y="${labelY}" font-size="12" fill="#4B5563" font-weight="500">${label}</text>`,
    desc ? `<text x="16" y="${descY}" font-size="10" fill="#9CA3AF">${desc}</text>` : '',
    `<rect x="16" y="${cardY}" width="${iw}" height="${RT_CARD_H}" rx="5" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1"/>`,
    // "T" icon
    `<text x="30" y="${cardY + 32}" font-size="16" fill="#4B5563" font-weight="700" font-family="Georgia,serif">T</text>`,
    `<text x="54" y="${cardY + 30}" font-size="12" fill="#374151">${preview}</text>`,
  ];
  return parts.filter(Boolean).join('\n  ');
}

function renderText(f, y) {
  const label  = esc(f.label || f.name);
  const desc   = f.description ? esc(trunc(f.description, 50)) : null;
  // Show actual default value from JSON if set, else fall back to description or generic placeholder
  const hasValue   = f.value != null && String(f.value).trim() !== '';
  const displayVal = hasValue
    ? esc(trunc(String(f.value), 45))
    : desc
      ? esc(trunc(f.description, 45))
      : esc(`Enter ${f.label || f.name}…`);
  const txtColor   = hasValue ? '#1F2937' : '#9CA3AF';
  const iw         = PANEL_W - 32;

  const labelY = y + LABEL_H;
  const descY  = desc && !hasValue ? labelY + DESC_H : labelY; // only show desc if no value fills it
  const cardY  = (desc && !hasValue ? descY : labelY) + 8;

  const parts = [
    `<!-- ── field: ${label} (text) ── -->`,
    `<text x="16" y="${labelY}" font-size="12" fill="#4B5563" font-weight="500">${label}</text>`,
    (desc && !hasValue) ? `<text x="16" y="${descY}" font-size="10" fill="#9CA3AF">${esc(trunc(f.description, 50))}</text>` : '',
    `<rect x="16" y="${cardY}" width="${iw}" height="${TXT_CARD_H}" rx="5" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1"/>`,
    `<text x="28" y="${cardY + 22}" font-size="12" fill="${txtColor}">${displayVal}</text>`,
  ];
  return parts.filter(Boolean).join('\n  ');
}

function renderAemContent(f, y) {
  // aem-content is a page/fragment picker — render as a special text-like row
  const label  = esc(f.label || f.name);
  const desc   = f.description ? esc(trunc(f.description, 50)) : null;
  const iw     = PANEL_W - 32;
  const labelY = y + LABEL_H;
  const descY  = desc ? labelY + DESC_H : labelY;
  const cardY  = descY + 8;

  return [
    `<!-- ── field: ${label} (aem-content) ── -->`,
    `<text x="16" y="${labelY}" font-size="12" fill="#4B5563" font-weight="500">${label}</text>`,
    desc ? `<text x="16" y="${descY}" font-size="10" fill="#9CA3AF">${desc}</text>` : '',
    `<rect x="16" y="${cardY}" width="${iw}" height="${TXT_CARD_H}" rx="5" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1"/>`,
    `<text x="28" y="${cardY + 22}" font-size="12" fill="#9CA3AF">Select a page or fragment…</text>`,
    `<text x="${16 + iw - 14}" y="${cardY + 23}" font-size="14" fill="#6B7280">&#8599;</text>`,
  ].filter(Boolean).join('\n  ');
}

function renderField(f, y) {
  switch (f.component) {
    case 'reference':   return renderReference(f, y);
    case 'richtext':    return renderRichtext(f, y);
    case 'aem-content': return renderAemContent(f, y);
    default:            return renderText(f, y);
  }
}

// ─── Build a single panel SVG ─────────────────────────────────────────────────
function buildPanel(blockTitle, fields, breadcrumb) {
  // Compute total height from fields
  let totalH = BREADCRUMB_H + BLOCK_HDR_H + FIELD_TOP_PAD;
  fields.forEach(f => { totalH += fieldHeight(f) + FIELD_GAP; });
  totalH += BOTTOM_PAD;

  // ── background
  let body = `<rect width="${TOTAL_W}" height="${totalH}" fill="#F3F4F6"/>`;

  // ── right toolbar (thin separator + icon column)
  const tbX = PANEL_W;
  body += `
  <line x1="${tbX}" y1="0" x2="${tbX}" y2="${totalH}" stroke="#D1D5DB" stroke-width="1"/>
  <rect x="${tbX}" width="${TOOLBAR_W}" height="${totalH}" fill="#F3F4F6"/>`;

  // Toolbar icons that match real UE (⚙ settings | ◈ layers | ✦ add | 💬 comment | ⧉ duplicate | ✏ edit | 🗑 delete | ⧅ more)
  const icons = ['⚙','◈','✦','💬','⧉','✏','🗑','⧅'];
  icons.forEach((ic, i) => {
    const icy = 10 + i * 46;
    const active = i === 1; // "layers/properties" icon is active
    if (active) body += `\n  <rect x="${tbX + 5}" y="${icy}" width="42" height="38" rx="5" fill="#DCE8FD"/>`;
    body += `\n  <text x="${tbX + 26}" y="${icy + 26}" font-size="17" fill="${active ? '#0265DC' : '#6B7280'}" text-anchor="middle">${ic}</text>`;
  });

  // ── breadcrumb
  body += `\n  <text x="16" y="${BREADCRUMB_H - 10}" font-size="11" fill="#888888">${esc(breadcrumb)}</text>`;

  // ── block header card
  const hY = BREADCRUMB_H + 4;
  body += `
  <rect x="12" y="${hY}" width="${PANEL_W - 24}" height="44" rx="6" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1"/>
  ${cubeIcon(20, hY + 4)}
  <text x="50" y="${hY + 29}" font-size="14" fill="#111827" font-weight="600">${esc(blockTitle)}</text>
  <text x="${PANEL_W - 24}" y="${hY + 30}" font-size="20" fill="#6B7280" text-anchor="end">&#x2026;</text>`;

  // ── fields
  let y = BREADCRUMB_H + BLOCK_HDR_H + FIELD_TOP_PAD;
  for (const f of fields) {
    body += '\n  ' + renderField(f, y);
    y += fieldHeight(f) + FIELD_GAP;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
     width="${TOTAL_W}" height="${totalH}"
     viewBox="0 0 ${TOTAL_W} ${totalH}"
     font-family="'Segoe UI', system-ui, -apple-system, sans-serif">
  ${body}
</svg>
`;
}

// ─── Build composite mockup for a block (one SVG per model, stitched sideby side) ──
function buildMockup(blockName, models, definitions) {
  const allPanels = [];
  const primaryDef = definitions.find(d => d.id === blockName);

  // primary model (same id as block)
  const primary = models.find(m => m.id === blockName && m.fields?.length);
  if (primary) {
    allPanels.push({
      title:      primaryDef?.title ?? blockName,
      fields:     primary.fields,
      breadcrumb: `Page › Main › ${primaryDef?.title ?? blockName}`,
    });
  }

  // child / item models
  models
    .filter(m => m.id !== blockName && m.fields?.length)
    .forEach(m => {
      const def = definitions.find(d => d.id === m.id);
      allPanels.push({
        title:      def?.title ?? m.id,
        fields:     m.fields,
        breadcrumb: `Page › Main › ${primaryDef?.title ?? blockName} › ${def?.title ?? m.id}`,
      });
    });

  if (allPanels.length === 0) return null;

  if (allPanels.length === 1) {
    return buildPanel(allPanels[0].title, allPanels[0].fields, allPanels[0].breadcrumb);
  }

  // Multiple panels side by side with a caption label above each
  const svgs    = allPanels.map(p => buildPanel(p.title, p.fields, p.breadcrumb));
  const heights = svgs.map(s => { const m = s.match(/height="(\d+)"/); return m ? +m[1] : 600; });
  const maxH    = Math.max(...heights);

  const CAP_H  = 30;
  const MARGIN = 20;
  const compositeW = TOTAL_W * allPanels.length + MARGIN * (allPanels.length - 1);
  const compositeH = CAP_H + maxH;

  let out = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
     width="${compositeW}" height="${compositeH}"
     viewBox="0 0 ${compositeW} ${compositeH}"
     font-family="'Segoe UI', system-ui, -apple-system, sans-serif">
  <rect width="${compositeW}" height="${compositeH}" fill="#E2E5EA"/>`;

  allPanels.forEach((p, i) => {
    const px    = i * (TOTAL_W + MARGIN);
    const inner = svgs[i]
      .replace(/<\?xml[^>]*\?>\s*/, '')
      .replace(/<svg[^>]*>\s*/, '')
      .replace(/\s*<\/svg>\s*$/, '');
    out += `
  <!-- Panel ${i + 1}: ${esc(p.title)} -->
  <text x="${px + TOTAL_W / 2}" y="22" font-size="13" fill="#2D3748" text-anchor="middle" font-weight="600">${esc(p.title)}</text>
  <g transform="translate(${px},${CAP_H})">${inner}</g>`;
  });

  out += `\n</svg>\n`;
  return out;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
let generated = 0;

const blockDirs = fs.readdirSync(BLOCKS_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

for (const blockName of blockDirs) {
  const readmePath = path.join(BLOCKS_DIR, blockName, 'README.md');
  const jsonPath   = path.join(BLOCKS_DIR, blockName, `_${blockName}.json`);

  if (!fs.existsSync(readmePath) || !fs.existsSync(jsonPath)) continue;

  let json;
  try {
    json = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  } catch {
    console.warn(`  ⚠  ${blockName}: skipping — JSON parse error`);
    continue;
  }

  const models      = json.models ?? [];
  const definitions = (json.definitions ?? []).map(d => ({ id: d.id, title: d.title }));

  const svg = buildMockup(blockName, models, definitions);
  if (!svg) {
    console.log(`  –  ${blockName}: no models with fields — skipped`);
    continue;
  }

  const docsDir = path.join(BLOCKS_DIR, blockName, 'docs');
  fs.mkdirSync(docsDir, { recursive: true });
  fs.writeFileSync(path.join(docsDir, 'ue-authoring.svg'), svg, 'utf-8');
  console.log(`  ✔  ${blockName}/docs/ue-authoring.svg`);
  generated++;
}

console.log(`\nDone. Generated ${generated} SVG mockup(s).`);
