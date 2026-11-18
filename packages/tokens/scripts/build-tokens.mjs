#!/usr/bin/env node
// Gera tokens.json, tailwind.preset.js e eric_tokens.dart a partir de src/css/*.css.
// Fonte da verdade: referencia/tokens/*.css (copiados para src/css). Não editar os arquivos gerados à mão.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const srcCssDir = join(root, "src/css");
const distDir = join(root, "dist");
const distCssDir = join(distDir, "css");
const flutterLibDir = join(root, "../flutter/lib");

mkdirSync(distCssDir, { recursive: true });
mkdirSync(flutterLibDir, { recursive: true });

const cssFiles = readdirSync(srcCssDir)
  .filter((f) => f.endsWith(".css"))
  // fonts.css tem @import, que precisa vir antes de qualquer outra regra no bundle.
  .sort((a, b) => (a === "fonts.css" ? -1 : b === "fonts.css" ? 1 : a.localeCompare(b)));

/** @type {{ light: Record<string,string>, dark: Record<string,string>, global: Record<string,string> }} */
const buckets = { light: {}, dark: {}, global: {} };

function bucketForSelector(selector) {
  if (selector.includes('data-tema="escuro"')) return "dark";
  if (selector.includes('data-tema="claro"') || selector.trim() === ":root") return "light-or-global";
  return "global";
}

let bundledCss = "";

for (const file of cssFiles) {
  const full = join(srcCssDir, file);
  const text = readFileSync(full, "utf8");
  bundledCss += `/* ---- ${file} ---- */\n${text}\n`;

  // remove comments before scanning blocks
  const noComments = text.replace(/\/\*[\s\S]*?\*\//g, "");
  const blockRe = /([^{}]+)\{([^{}]*)\}/g;
  let match;
  while ((match = blockRe.exec(noComments))) {
    const selector = match[1].trim();
    const body = match[2];
    const kind = bucketForSelector(selector);
    if (kind === "global" && !selector.startsWith(":root") && !selector.includes("data-tema")) continue;

    const declRe = /(--[\w-]+)\s*:\s*([^;]+);/g;
    let decl;
    while ((decl = declRe.exec(body))) {
      const name = decl[1];
      const value = decl[2].trim();
      if (kind === "dark") {
        buckets.dark[name] = value;
      } else if (file === "colors.css") {
        // :root, [data-tema="claro"] in colors.css → light theme values
        buckets.light[name] = value;
      } else {
        // single-theme token files (spacing, radius, sizes, borders, typography, motion, fonts)
        buckets.global[name] = value;
      }
    }
  }
}

writeFileSync(join(distCssDir, "tokens.css"), bundledCss, "utf8");

// ---- tokens.json (neutro, para scripts / Figma Tokens) ----
function toNestedJson(flat, stripPrefix) {
  const out = {};
  for (const [name, value] of Object.entries(flat)) {
    const path = name.replace(stripPrefix, "").split("-");
    let node = out;
    for (let i = 0; i < path.length - 1; i++) {
      const key = path[i];
      node[key] = node[key] ?? {};
      node = node[key];
    }
    node[path[path.length - 1]] = { value };
  }
  return out;
}

const tokensJson = {
  $schema: "https://eric-design-system/tokens.schema.json",
  meta: { source: "referencia/tokens/*.css", generatedBy: "packages/tokens/scripts/build-tokens.mjs" },
  color: {
    light: toNestedJson(buckets.light, /^--c-/),
    dark: toNestedJson(buckets.dark, /^--c-/),
  },
  global: toNestedJson(buckets.global, /^--e-/),
};
writeFileSync(join(distDir, "tokens.json"), JSON.stringify(tokensJson, null, 2), "utf8");

// ---- tailwind.preset.js (cores apontam para var(--c-*), tema funciona sozinho) ----
function cssVarColorEntries(flat) {
  const entries = {};
  for (const name of Object.keys(flat)) {
    if (!name.startsWith("--c-")) continue;
    const key = name.replace(/^--c-/, "");
    entries[key] = `var(${name})`;
  }
  return entries;
}
const colorEntries = cssVarColorEntries({ ...buckets.light, ...buckets.dark });

function spacingEntries() {
  const out = {};
  for (const [name, value] of Object.entries(buckets.global)) {
    const m = name.match(/^--e-sp-(.+)$/);
    if (m) out[m[1]] = `var(${name})`;
  }
  return out;
}
function radiusEntries() {
  const out = {};
  for (const [name, value] of Object.entries(buckets.global)) {
    const m = name.match(/^--e-r-(.+)$/);
    if (m) out[m[1]] = `var(${name})`;
  }
  return out;
}

const tailwindPreset = `// GERADO POR packages/tokens/scripts/build-tokens.mjs — não editar à mão.
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(colorEntries, null, 8).replace(/\n/g, "\n      ")},
      spacing: ${JSON.stringify(spacingEntries(), null, 8).replace(/\n/g, "\n      ")},
      borderRadius: ${JSON.stringify(radiusEntries(), null, 8).replace(/\n/g, "\n      ")},
      fontFamily: {
        eric: ["var(--e-font)"],
        "eric-mono": ["var(--e-font-mono)"],
      },
    },
  },
};
`;
writeFileSync(join(distDir, "tailwind.preset.js"), tailwindPreset, "utf8");

// ---- eric_tokens.dart (ThemeExtension EricColors claro/escuro, EricSpace, EricRadius, EricType, ericTheme()) ----
function hexOrNull(value) {
  const v = value.trim();
  if (/^#[0-9a-fA-F]{3,8}$/.test(v)) return v;
  return null; // rgba(), var(), cubic-bezier() etc ficam fora do EricColors tipado
}

function dartColorField(name) {
  return name
    .replace(/^--c-/, "")
    .split("-")
    .map((part, i) => (i === 0 ? part : part[0].toUpperCase() + part.slice(1)))
    .join("");
}

function dartColorLiteral(hex) {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (h.length === 6) h = "FF" + h;
  if (h.length === 8) {
    // #RRGGBBAA (css) → 0xAARRGGBB (dart)
    const rr = h.slice(0, 2), gg = h.slice(2, 4), bb = h.slice(4, 6), aa = h.slice(6, 8);
    h = aa + rr + gg + bb;
  }
  return `const Color(0x${h.toUpperCase()})`;
}

function dartColorFields(flat) {
  const seen = new Set();
  const fields = [];
  for (const name of Object.keys(flat)) {
    if (!name.startsWith("--c-")) continue;
    const hex = hexOrNull(flat[name]);
    if (!hex) continue;
    const field = dartColorField(name);
    if (seen.has(field)) continue;
    seen.add(field);
    fields.push({ field, hex });
  }
  return fields;
}

const lightFields = dartColorFields(buckets.light);
const darkFieldsMap = new Map(dartColorFields(buckets.dark).map((f) => [f.field, f.hex]));

const classFieldsDecl = lightFields.map((f) => `  final Color ${f.field};`).join("\n");
const ctorParams = lightFields.map((f) => `    required this.${f.field},`).join("\n");

function instanceFor(theme) {
  return lightFields
    .map((f) => {
      const hex = theme === "light" ? f.hex : darkFieldsMap.get(f.field) ?? f.hex;
      return `    ${f.field}: ${dartColorLiteral(hex)},`;
    })
    .join("\n");
}

function numToken(prefix) {
  const out = [];
  for (const [name, value] of Object.entries(buckets.global)) {
    const m = name.match(new RegExp(`^--e-${prefix}-(.+)$`));
    if (!m) continue;
    const num = parseFloat(value);
    if (Number.isNaN(num)) continue;
    const field = "e" + m[1][0].toUpperCase() + m[1].slice(1).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    out.push({ field, num });
  }
  return out;
}

const spaceTokens = numToken("sp");
const radiusTokens = numToken("r");
const mobileTokens = numToken("m");

const dart = `// GERADO POR packages/tokens/scripts/build-tokens.mjs — não editar à mão.
// Fonte: referencia/tokens/*.css
import "package:flutter/material.dart";
import "package:google_fonts/google_fonts.dart";

@immutable
class EricColors extends ThemeExtension<EricColors> {
  const EricColors({
${ctorParams}
  });

${classFieldsDecl}

  static const EricColors claro = EricColors(
${instanceFor("light")}
  );

  static const EricColors escuro = EricColors(
${instanceFor("dark")}
  );

  @override
  EricColors copyWith() => this;

  @override
  EricColors lerp(ThemeExtension<EricColors>? other, double t) {
    if (other is! EricColors) return this;
    return t < 0.5 ? this : other;
  }
}

class EricSpace {
${spaceTokens.map((t) => `  static const double ${t.field} = ${t.num};`).join("\n")}
}

class EricRadius {
${radiusTokens.map((t) => `  static const double ${t.field} = ${t.num};`).join("\n")}
}

class EricMobile {
${mobileTokens.map((t) => `  static const double ${t.field} = ${t.num};`).join("\n")}
}

class EricType {
  static const String fontFamily = "Poppins";
}

ThemeData ericTheme({required Brightness brightness}) {
  final isDark = brightness == Brightness.dark;
  final colors = isDark ? EricColors.escuro : EricColors.claro;
  final baseTextTheme = isDark ? ThemeData.dark().textTheme : ThemeData.light().textTheme;
  return ThemeData(
    useMaterial3: true,
    brightness: brightness,
    textTheme: GoogleFonts.poppinsTextTheme(baseTextTheme).apply(
      bodyColor: colors.text,
      displayColor: colors.text,
    ),
    scaffoldBackgroundColor: colors.page,
    colorScheme: ColorScheme.fromSeed(
      seedColor: colors.primary,
      brightness: brightness,
    ),
    extensions: [colors],
  );
}
`;
writeFileSync(join(distDir, "eric_tokens.dart"), dart, "utf8");
writeFileSync(join(flutterLibDir, "eric_tokens.dart"), dart, "utf8");

console.log(
  `[@eric/tokens] gerado: ${Object.keys(buckets.light).length} cores claro, ${
    Object.keys(buckets.dark).length
  } cores escuro, ${Object.keys(buckets.global).length} tokens globais.`,
);
