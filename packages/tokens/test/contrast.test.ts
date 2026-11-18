import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { contrastRatio } from "../src/contrast";

const tokens = JSON.parse(readFileSync(join(__dirname, "../dist/tokens.json"), "utf8"));

function hex(theme: "light" | "dark", ...path: string[]): string {
  let node = tokens.color[theme];
  for (const key of path) node = node[key];
  return node.value as string;
}

// Os 19 pares da seção Contraste (referencia/guidelines/ACESSIBILIDADE.md), nos dois temas.
// Texto normal >= 4.5:1; borda de campo / foco >= 3:1.
const TEXT_MIN = 4.5;
const BORDER_MIN = 3;

type Pair = { name: string; fg: string; bg: string; min: number };

function pairsFor(theme: "light" | "dark"): Pair[] {
  const t = (...p: string[]) => hex(theme, ...p);
  return [
    { name: "text/surface", fg: t("text"), bg: t("surface"), min: TEXT_MIN },
    { name: "text-2/surface", fg: t("text", "2"), bg: t("surface"), min: TEXT_MIN },
    { name: "link/surface", fg: t("link"), bg: t("surface"), min: TEXT_MIN },
    { name: "on-primary/primary", fg: t("on", "primary"), bg: t("primary"), min: TEXT_MIN },
    { name: "ok-fg/ok-bg", fg: t("ok", "fg"), bg: t("ok", "bg"), min: TEXT_MIN },
    { name: "warn-fg/warn-bg", fg: t("warn", "fg"), bg: t("warn", "bg"), min: TEXT_MIN },
    { name: "info-fg/info-bg", fg: t("info", "fg"), bg: t("info", "bg"), min: TEXT_MIN },
    { name: "bad-fg/bad-bg", fg: t("bad", "fg"), bg: t("bad", "bg"), min: TEXT_MIN },
    { name: "field-bd/surface", fg: t("field", "bd"), bg: t("surface"), min: BORDER_MIN },
  ];
}

// No tema claro a referência também verifica text-2 contra --c-page (menu/sidebar sobre o fundo da página).
const extraLight: Pair[] = [
  { name: "text-2/page (claro)", fg: hex("light", "text", "2"), bg: hex("light", "page"), min: TEXT_MIN },
];

describe("contraste WCAG 2.2 AA — tokens @eric/tokens", () => {
  for (const theme of ["light", "dark"] as const) {
    const pairs = theme === "light" ? [...pairsFor(theme), ...extraLight] : pairsFor(theme);
    for (const pair of pairs) {
      it(`[${theme}] ${pair.name} >= ${pair.min}:1`, () => {
        const ratio = contrastRatio(pair.fg, pair.bg);
        expect(ratio).toBeGreaterThanOrEqual(pair.min);
      });
    }
  }
});
