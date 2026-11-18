export function HomePage() {
  return (
    <>
      <p style={{ fontSize: 12, color: "var(--c-text-2)", margin: "0 0 4px" }}>Visão geral</p>
      <h1 style={{ fontSize: 22, lineHeight: "28px", fontWeight: 600, margin: "0 0 8px" }}>
        ERIC Design System 1.2
      </h1>
      <p style={{ fontSize: 13, color: "var(--c-text-2)", maxWidth: 560 }}>
        Fase 0 (base do monorepo) e Fase 1 (tokens) concluídas. Use o menu à esquerda para abrir a
        página Cores, que lê os valores claro/escuro em tempo de execução a partir de
        <code> @eric/tokens</code>.
      </p>
    </>
  );
}
