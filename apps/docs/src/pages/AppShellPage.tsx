import { useState } from "react";
import {
  AppSidebar,
  Avatar,
  Icon,
  NotificationBell,
  Pagination,
  QueueRow,
  SearchField,
  StatusBadge,
  Topbar,
} from "@eric/react";

const ITENS_NAV = [
  { value: "fila", label: "Fila da Central", icon: "inbox", count: 4 },
  { value: "mapa", label: "Mapa de solicitações", icon: "map" },
  { value: "relatorios", label: "Relatórios", icon: "bar-chart-3" },
];

const FILA = [
  {
    kicker: "AMA-2026-000041",
    title: "Buraco na via pública causando risco a pedestres e veículos",
    sub: "Rua das Flores, 120 · Amajari · RR",
    bar: "bad" as const,
    tone: "bad" as const,
    label: "Atrasada",
  },
  {
    kicker: "AMA-2026-000040",
    title: "Poda de árvore com galhos sobre a rede elétrica",
    sub: "Av. Central, 45 · Amajari · RR",
    bar: "info" as const,
    tone: "info" as const,
    label: "Em andamento",
  },
];

/**
 * Template "App shell" (modelo 1 do README): sidebar 236px fixa (vira gaveta < 1024), topbar 58px
 * com busca e ações, conteúdo com fila de solicitações. Nada quebra linha em nenhuma largura.
 */
export function AppShellPage() {
  const [value, setValue] = useState("fila");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: 520, border: "1px solid var(--c-border)", borderRadius: 12, overflow: "hidden" }}>
      <AppSidebar
        name="Conecta+"
        sub="Painel de gestão"
        navTitle="Central"
        items={ITENS_NAV}
        value={value}
        onChange={(v) => {
          setValue(v);
          setSidebarOpen(false);
        }}
        user={{ name: "Ana Lima", role: "Atendente" }}
        onSair={() => {}}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <Topbar
          right={
            <>
              <NotificationBell count={3} />
              <Avatar name="Ana Lima" size={30} />
            </>
          }
        >
          <button type="button" className="e-iconbtn" aria-label="Abrir menu" onClick={() => setSidebarOpen((o) => !o)}>
            <Icon name="menu" size={18} />
          </button>
          <SearchField />
        </Topbar>
        <div style={{ flex: 1, minWidth: 0, padding: "24px 28px 32px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <p style={{ fontSize: 12, color: "var(--c-text-2)", margin: "0 0 2px" }}>Central</p>
            <h2 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>Fila de atendimento</h2>
          </div>
          <div className="e-card" style={{ overflow: "hidden" }}>
            {FILA.map((row) => (
              <QueueRow
                key={row.kicker}
                kicker={row.kicker}
                title={row.title}
                sub={row.sub}
                bar={row.bar}
                badges={
                  <StatusBadge tone={row.tone} dot>
                    {row.label}
                  </StatusBadge>
                }
              />
            ))}
          </div>
          <Pagination page={1} pages={6} total={112} onChange={() => {}} />
        </div>
      </div>
    </div>
  );
}
