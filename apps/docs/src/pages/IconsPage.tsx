import { useMemo, useState } from "react";
import { icons } from "lucide-react";
import { Icon, TextField } from "@eric/react";

function toKebabCase(pascal: string): string {
  return pascal
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

const NOMES_ICONES = Object.keys(icons).map(toKebabCase).sort();

export function IconsPage() {
  const [busca, setBusca] = useState("");
  const [copiado, setCopiado] = useState<string | null>(null);

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return NOMES_ICONES;
    return NOMES_ICONES.filter((nome) => nome.includes(termo));
  }, [busca]);

  async function copiar(nome: string) {
    const codigo = `<Icon name="${nome}" size={16} />`;
    try {
      await navigator.clipboard.writeText(codigo);
      setCopiado(nome);
      setTimeout(() => setCopiado((atual) => (atual === nome ? null : atual)), 1500);
    } catch {
      // clipboard indisponível (ex. contexto não seguro) — sem crash, só não copia.
    }
  }

  return (
    <>
      <p style={{ fontSize: 12, color: "var(--c-text-2)", margin: "0 0 4px" }}>Fase 6</p>
      <h1 style={{ fontSize: 22, lineHeight: "28px", fontWeight: 600, margin: "0 0 8px" }}>Ícones</h1>
      <p style={{ fontSize: 13, color: "var(--c-text-2)", margin: "0 0 16px", maxWidth: 560 }}>
        {NOMES_ICONES.length} ícones Lucide (traço 1.5). Clique num ícone para copiar o código{" "}
        <code>{"<Icon name=\"...\" />"}</code>.
      </p>

      <div style={{ maxWidth: 360, marginBottom: 16 }}>
        <TextField
          label="Buscar ícone"
          icon="search"
          placeholder="ex. map-pin, circle-alert…"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <p style={{ fontSize: 12, color: "var(--c-text-2)", margin: "0 0 10px" }}>
        {filtrados.length} resultado{filtrados.length === 1 ? "" : "s"}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))",
          gap: 8,
        }}
      >
        {filtrados.map((nome) => (
          <button
            key={nome}
            type="button"
            onClick={() => copiar(nome)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              padding: "12px 6px",
              border: "1px solid var(--c-border)",
              borderRadius: 10,
              background: copiado === nome ? "var(--c-tint)" : "var(--c-surface)",
              cursor: "pointer",
            }}
            title={`Copiar <Icon name="${nome}" />`}
          >
            <Icon name={nome} size={20} />
            <span
              style={{
                fontSize: 10,
                color: "var(--c-text-2)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "100%",
              }}
            >
              {copiado === nome ? "Copiado!" : nome}
            </span>
          </button>
        ))}
      </div>
    </>
  );
}
