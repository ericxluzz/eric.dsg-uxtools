import { useState } from "react";
import { useTema } from "@eric/react";
import { AppShellPage } from "./pages/AppShellPage";
import { ChartsPage } from "./pages/ChartsPage";
import { ColorsPage } from "./pages/ColorsPage";
import { ComponentsPage } from "./pages/ComponentsPage";
import { FilaCentralPage } from "./pages/FilaCentralPage";
import { FormatosPage } from "./pages/FormatosPage";
import { HomePage } from "./pages/HomePage";
import { IconsPage } from "./pages/IconsPage";

const PAGINAS = [
  { id: "visao-geral", titulo: "Visão geral" },
  { id: "cores", titulo: "Cores" },
  { id: "icones", titulo: "Ícones" },
  { id: "componentes", titulo: "Componentes" },
  { id: "app-shell", titulo: "Modelo · App shell" },
  { id: "graficos", titulo: "Gráficos e canvas" },
  { id: "formatos", titulo: "Formatos e mensagens" },
  { id: "fila-central", titulo: "Fase 7 · Fila da Central" },
] as const;

type PaginaId = (typeof PAGINAS)[number]["id"];

const PAGINA_POR_ID: Record<PaginaId, () => JSX.Element> = {
  "visao-geral": HomePage,
  cores: ColorsPage,
  icones: IconsPage,
  componentes: ComponentsPage,
  "app-shell": AppShellPage,
  graficos: ChartsPage,
  formatos: FormatosPage,
  "fila-central": FilaCentralPage,
};

export function App() {
  const [pagina, setPagina] = useState<PaginaId>("visao-geral");
  const { tema, alternarTema } = useTema();
  const Pagina = PAGINA_POR_ID[pagina];

  return (
    <div className="docs-shell">
      <nav className="docs-nav" aria-label="Seções da documentação">
        {PAGINAS.map((p) => (
          <button
            key={p.id}
            type="button"
            aria-current={pagina === p.id ? "page" : undefined}
            onClick={() => setPagina(p.id)}
          >
            {p.titulo}
          </button>
        ))}
        <button type="button" onClick={alternarTema} style={{ marginTop: 16 }}>
          Tema: {tema}
        </button>
      </nav>
      <main className="docs-main">
        <Pagina />
      </main>
    </div>
  );
}
