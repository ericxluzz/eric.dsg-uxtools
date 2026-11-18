import { useEffect, useState } from "react";
import { useTema } from "@eric/react";
import tokens from "@eric/tokens/json";

function collectColorVarNames(node: unknown, prefix: string[], out: string[]): void {
  if (typeof node !== "object" || node === null) return;
  const obj = node as Record<string, unknown>;
  if ("value" in obj) {
    out.push(`--c-${prefix.join("-")}`);
    return;
  }
  for (const [key, child] of Object.entries(obj)) {
    collectColorVarNames(child, [...prefix, key], out);
  }
}

function useCorEmTempoReal(varName: string): string {
  const { tema } = useTema();
  const [valor, setValor] = useState("");

  useEffect(() => {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    setValor(raw);
  }, [varName, tema]);

  return valor;
}

function Swatch({ varName }: { varName: string }) {
  const hex = useCorEmTempoReal(varName);
  return (
    <div className="docs-swatch">
      <div className="docs-swatch-color" style={{ background: `var(${varName})` }} />
      <div className="docs-swatch-meta">
        <div>{varName}</div>
        <div className="docs-swatch-hex">{hex || "…"}</div>
      </div>
    </div>
  );
}

export function ColorsPage() {
  const { tema } = useTema();
  const [varNames, setVarNames] = useState<string[]>([]);

  useEffect(() => {
    const names: string[] = [];
    collectColorVarNames(tokens.color.light, [], names);
    setVarNames(names);
  }, []);

  return (
    <>
      <p style={{ fontSize: 12, color: "var(--c-text-2)", margin: "0 0 4px" }}>
        Tokens · Cores ({tema})
      </p>
      <h1 style={{ fontSize: 22, lineHeight: "28px", fontWeight: 600, margin: "0 0 12px" }}>
        Cores
      </h1>
      <div className="docs-swatch-grid">
        {varNames.map((name) => (
          <Swatch key={name} varName={name} />
        ))}
      </div>
    </>
  );
}
