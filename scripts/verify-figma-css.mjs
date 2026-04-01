#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const args = process.argv.slice(2);
const figmaPath = getArg(args, "--figma");
const cssPath = getArg(args, "--css");

if (!figmaPath || !cssPath) {
  console.error("Usage: verify-figma-css.mjs --figma <json> --css <css-file>");
  console.error("");
  console.error("JSON format: each key is a Figma node name with cssSelector + style props.");
  console.error('Example: { "file-item": { "cssSelector": ".FileItem", "gap": "10px", "padding": "12px 21px" } }');
  process.exit(1);
}

const figmaData = JSON.parse(readFileSync(resolve(figmaPath), "utf-8"));
const cssContent = readFileSync(resolve(cssPath), "utf-8");
const cssRules = parseCSSRules(cssContent);

let total = 0;
let matched = 0;
let mismatched = 0;
const rows = [];

for (const [nodeName, nodeData] of Object.entries(figmaData)) {
  const selector = nodeData.cssSelector;
  if (!selector) continue;

  const cssRule = findRule(cssRules, selector);

  for (const [prop, figmaVal] of Object.entries(nodeData)) {
    if (prop === "cssSelector") continue;

    if (prop === "dimensions") {
      if (figmaVal.width) checkProp(nodeName, selector, cssRule, "width", `${figmaVal.width}px`);
      if (figmaVal.height) checkProp(nodeName, selector, cssRule, "height", `${figmaVal.height}px`);
      continue;
    }

    if (prop === "colors") {
      figmaVal.forEach((c, i) => {
        checkColor(nodeName, selector, cssRule, c, i);
      });
      continue;
    }

    if (prop === "strokeWeight") {
      checkProp(nodeName, selector, cssRule, "border-top", figmaVal, true);
      continue;
    }

    if (prop === "borderRadius") {
      checkProp(nodeName, selector, cssRule, "border-radius", figmaVal);
      continue;
    }

    const cssName = figmaToCSSProp(prop);
    if (cssName) {
      const val = typeof figmaVal === "number" ? `${figmaVal}px` : String(figmaVal);
      checkProp(nodeName, selector, cssRule, cssName, val);
    }
  }
}

printTable(rows);
console.log(`\n  Total: ${total}  Matched: ${matched}  ${mismatched > 0 ? `\x1b[31mMismatched: ${mismatched}\x1b[0m` : "\x1b[32mAll matched ✓\x1b[0m"}\n`);
if (mismatched > 0) process.exit(1);

function checkProp(node, selector, rule, cssProp, figmaVal, partial) {
  total++;
  const cssVal = rule?.[cssProp] || null;
  const match = cssVal ? valuesMatch(cssProp, String(figmaVal), cssVal, partial) : false;
  if (match) matched++;
  else mismatched++;
  rows.push({ node, cssProp, figmaVal: String(figmaVal), cssVal: cssVal || "—", match });
}

function checkColor(node, selector, rule, figmaColor, index) {
  total++;
  const colorProps = ["background", "background-color", "color", "border-color"];
  let found = false;
  let cssVal = "—";

  for (const p of colorProps) {
    const v = rule?.[p];
    if (v && colorContains(v, figmaColor)) {
      found = true;
      cssVal = v;
      break;
    }
  }

  if (found) matched++;
  else mismatched++;
  rows.push({ node, cssProp: `color[${index}]`, figmaVal: figmaColor, cssVal, match: found });
}

function figmaToCSSProp(prop) {
  const map = {
    padding: "padding",
    gap: "gap",
    fontSize: "font-size",
    fontWeight: "font-weight",
    fontFamily: "font-family",
    lineHeight: "line-height",
    letterSpacing: "letter-spacing",
    "margin-left": "margin-left",
    "margin-right": "margin-right",
    mode: null,
    justifyContent: "justify-content",
    alignItems: "align-items",
  };
  return map[prop] !== undefined ? map[prop] : prop;
}

function parseCSSRules(css) {
  const rules = {};
  const re = /([^{}]+)\{([^}]+)\}/g;
  let m = re.exec(css);
  while (m !== null) {
    const sel = m[1].trim();
    const body = m[2];
    const props = {};
    for (const decl of body.split(";")) {
      const idx = decl.indexOf(":");
      if (idx === -1) continue;
      const p = decl.slice(0, idx).trim();
      const v = decl.slice(idx + 1).trim();
      if (p && v) props[p] = v;
    }
    rules[sel] = props;
    m = re.exec(css);
  }
  return rules;
}

function findRule(rules, selector) {
  for (const [sel, props] of Object.entries(rules)) {
    if (sel === selector || sel.includes(selector)) return props;
  }
  for (const [sel, props] of Object.entries(rules)) {
    const parts = selector.split(/\s+/);
    if (parts.every(p => sel.includes(p))) return props;
  }
  return null;
}

function valuesMatch(prop, figma, css, partial) {
  const f = norm(figma);
  const c = norm(css);
  if (f === c) return true;

  if (partial && c.includes(f)) return true;

  const fNum = parseFloat(f);
  const cNum = parseFloat(c);
  if (!isNaN(fNum) && !isNaN(cNum) && Math.abs(fNum - cNum) < 0.5) return true;

  if (prop === "padding" || prop === "margin") {
    const fp = parseSides(f);
    const cp = parseSides(c);
    if (fp && cp) return sidesEqual(fp, cp);
  }

  if (prop === "font-family") return c.toLowerCase().startsWith(f.toLowerCase());

  if (prop === "line-height") {
    const fv = parseFloat(f);
    const cv = parseFloat(c);
    if (!isNaN(fv) && !isNaN(cv) && Math.abs(fv - cv) < 0.01) return true;
  }

  if (prop === "font-weight") return String(parseInt(f)) === String(parseInt(c));

  if (prop === "letter-spacing") {
    if (f.includes("%") && c.includes("em")) {
      const pct = parseFloat(f) / 100;
      const em = parseFloat(c);
      return Math.abs(pct - em) < 0.005;
    }
    return Math.abs(parseFloat(f) - parseFloat(c)) < 0.005;
  }

  return false;
}

function colorContains(cssVal, figmaColor) {
  const fc = parseColor(figmaColor);
  if (!fc) return false;

  const lightDark = cssVal.match(/light-dark\(([^,]+),\s*([^)]+)\)/);
  if (lightDark) {
    const lightC = parseColor(lightDark[1].trim());
    if (lightC && colorClose(fc, lightC)) return true;
    const darkC = parseColor(lightDark[2].trim());
    if (darkC && colorClose(fc, darkC)) return true;
    return false;
  }

  const cc = parseColor(cssVal);
  return cc ? colorClose(fc, cc) : false;
}

function colorClose(a, b) {
  return Math.abs(a.r - b.r) < 3 && Math.abs(a.g - b.g) < 3 && Math.abs(a.b - b.b) < 3 && Math.abs(a.a - b.a) < 0.02;
}

function parseColor(str) {
  if (!str) return null;
  str = str.trim();

  const hex6 = str.match(/^#([0-9a-f]{6})$/i);
  if (hex6) {
    const n = parseInt(hex6[1], 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255, a: 1 };
  }

  const rgba = str.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/);
  if (rgba) return { r: +rgba[1], g: +rgba[2], b: +rgba[3], a: rgba[4] !== undefined ? +rgba[4] : 1 };

  const rgbSlash = str.match(/rgb\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\/\s*([\d.]+%?)\s*\)/);
  if (rgbSlash) {
    const a = rgbSlash[4].endsWith("%") ? parseFloat(rgbSlash[4]) / 100 : +rgbSlash[4];
    return { r: +rgbSlash[1], g: +rgbSlash[2], b: +rgbSlash[3], a };
  }

  return null;
}

function parseSides(v) {
  const parts = v.replace(/px/g, "").split(/\s+/).map(Number);
  if (parts.some(isNaN)) return null;
  if (parts.length === 1) return [parts[0], parts[0], parts[0], parts[0]];
  if (parts.length === 2) return [parts[0], parts[1], parts[0], parts[1]];
  if (parts.length === 4) return parts;
  return null;
}

function sidesEqual(a, b) {
  return a.every((v, i) => Math.abs(v - b[i]) < 0.5);
}

function norm(v) {
  return String(v).replace(/\s+/g, " ").replace(/;$/, "").trim();
}

function getArg(args, flag) {
  const idx = args.indexOf(flag);
  return idx !== -1 && idx + 1 < args.length ? args[idx + 1] : null;
}

function printTable(rows) {
  const W = { node: 20, prop: 16, figma: 22, css: 30 };
  const line = (n, p, f, c, ok) =>
    `│ ${n.padEnd(W.node)} │ ${p.padEnd(W.prop)} │ ${f.slice(0, W.figma).padEnd(W.figma)} │ ${c.slice(0, W.css).padEnd(W.css)} │ ${ok.padEnd(2)} │`;
  const sep = `├${"─".repeat(W.node + 2)}┼${"─".repeat(W.prop + 2)}┼${"─".repeat(W.figma + 2)}┼${"─".repeat(W.css + 2)}┼────┤`;

  console.log(`\n┌${"─".repeat(W.node + 2)}┬${"─".repeat(W.prop + 2)}┬${"─".repeat(W.figma + 2)}┬${"─".repeat(W.css + 2)}┬────┐`);
  console.log(line("Node", "Property", "Figma", "CSS", "OK"));
  console.log(sep);

  for (const r of rows) {
    const color = r.match ? "\x1b[32m" : "\x1b[31m";
    const reset = "\x1b[0m";
    const ok = r.match ? "✓" : "✗";
    console.log(`│ ${color}${r.node.slice(0, W.node).padEnd(W.node)}${reset} │ ${r.cssProp.padEnd(W.prop)} │ ${r.figmaVal.slice(0, W.figma).padEnd(W.figma)} │ ${(r.cssVal || "—").slice(0, W.css).padEnd(W.css)} │ ${color}${ok.padEnd(2)}${reset} │`);
  }

  console.log(`└${"─".repeat(W.node + 2)}┴${"─".repeat(W.prop + 2)}┴${"─".repeat(W.figma + 2)}┴${"─".repeat(W.css + 2)}┴────┘`);
}
