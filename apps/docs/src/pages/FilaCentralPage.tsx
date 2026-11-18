import { useMemo, useState } from "react";
import {
  AppSidebar,
  Avatar,
  Button,
  ChoiceChips,
  DataTable,
  Icon,
  Kpi,
  NotificationBell,
  PageHeader,
  SearchField,
  Select,
  StatusBadge,
  Tabs,
  Topbar,
} from "@eric/react";
import { formatContagem, formatPrazo } from "@eric/format";

type Etapa = "triagem" | "vistoria" | "execucao";
type Canal = "portal" | "app" | "presencial" | "central";

interface Solicitacao {
  protocolo: string;
  servico: string;
  solicitante: string;
  canal: Canal;
  local: string;
  localidade: string;
  etapa: Etapa;
  pendencia?: string;
  rotuloPublico: string;
  prazo: Date;
}

const ICONE_CANAL: Record<Canal, string> = {
  portal: "globe",
  app: "smartphone",
  presencial: "building-2",
  central: "phone",
};

const LABEL_ETAPA: Record<Etapa, string> = {
  triagem: "Triagem",
  vistoria: "Vistoria",
  execucao: "Execução",
};

const HOJE = new Date(2026, 9, 29, 10, 0);

const SOLICITACOES: Solicitacao[] = [
  {
    protocolo: "AMA-2026-000041",
    servico: "Buraco na via",
    solicitante: "Regina Matos",
    canal: "app",
    local: "Rua das Flores, 120",
    localidade: "Centro",
    etapa: "vistoria",
    pendencia: "Foto do local",
    rotuloPublico: "Em andamento",
    prazo: new Date(2026, 9, 27),
  },
  {
    protocolo: "AMA-2026-000040",
    servico: "Poda de árvore",
    solicitante: "Carlos Dias",
    canal: "portal",
    local: "Av. Central, 45",
    localidade: "Centro",
    etapa: "execucao",
    rotuloPublico: "Em execução",
    prazo: new Date(2026, 9, 29),
  },
  {
    protocolo: "AMA-2026-000039",
    servico: "Coleta atrasada",
    solicitante: "Ana Lima",
    canal: "central",
    local: "Rua Teste, 10",
    localidade: "Bela Vista",
    etapa: "triagem",
    rotuloPublico: "Recebida",
    prazo: new Date(2026, 10, 2),
  },
  {
    protocolo: "AMA-2026-000038",
    servico: "Iluminação pública",
    solicitante: "João Souza",
    canal: "presencial",
    local: "Praça da Matriz",
    localidade: "Centro",
    etapa: "vistoria",
    rotuloPublico: "Em andamento",
    prazo: new Date(2026, 10, 1),
  },
];

const ITENS_NAV = [
  { value: "fila", label: "Fila da Central", icon: "inbox", count: SOLICITACOES.length },
  { value: "mapa", label: "Mapa de solicitações", icon: "map" },
  { value: "relatorios", label: "Relatórios", icon: "bar-chart-3" },
];

function PrazoCelula({ prazo }: { prazo: Date }) {
  const texto = formatPrazo(prazo, HOJE);
  const atrasada = texto.startsWith("Atrasada");
  return (
    <span style={{ color: atrasada ? "var(--c-bad-fg)" : "var(--c-text-2)", fontWeight: atrasada ? 600 : 400 }}>
      {texto}
    </span>
  );
}

/**
 * G-02 · Fila do setor (referencia/guidelines/conecta-docs/TELAS.md) — montada só com @eric/react,
 * como piloto de adoção da Fase 7 (não há um checkout real do Conecta+ nesta máquina para migrar).
 */
export function FilaCentralPage() {
  const [etapa, setEtapa] = useState<Etapa>("vistoria");
  const [busca, setBusca] = useState("");
  const [canalFiltro, setCanalFiltro] = useState<string | undefined>();
  const [comPendencia, setComPendencia] = useState<string[]>([]);
  const [sidebarAberta, setSidebarAberta] = useState(false);

  const filtradas = useMemo(() => {
    return SOLICITACOES.filter((s) => {
      if (s.etapa !== etapa) return false;
      if (canalFiltro && s.canal !== canalFiltro) return false;
      if (comPendencia.includes("pendencia") && !s.pendencia) return false;
      const termo = busca.trim().toLowerCase();
      if (termo && !`${s.protocolo} ${s.servico} ${s.solicitante}`.toLowerCase().includes(termo)) return false;
      return true;
    });
  }, [etapa, canalFiltro, comPendencia, busca]);

  const contagemPorEtapa = (e: Etapa) => SOLICITACOES.filter((s) => s.etapa === e).length;
  const atrasadas = SOLICITACOES.filter((s) => formatPrazo(s.prazo, HOJE).startsWith("Atrasada")).length;
  const comPendenciaTotal = SOLICITACOES.filter((s) => s.pendencia).length;

  return (
    <div style={{ display: "flex", minHeight: 560, border: "1px solid var(--c-border)", borderRadius: 12, overflow: "hidden" }}>
      <AppSidebar
        name="Conecta+"
        sub="Painel de gestão"
        navTitle="Central"
        items={ITENS_NAV}
        value="fila"
        user={{ name: "Ana Lima", role: "Atendente · Central" }}
        onSair={() => {}}
        open={sidebarAberta}
        onClose={() => setSidebarAberta(false)}
      />
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <Topbar
          right={
            <>
              <NotificationBell count={2} />
              <Avatar name="Ana Lima" size={30} />
            </>
          }
        >
          <button type="button" className="e-iconbtn" aria-label="Abrir menu" onClick={() => setSidebarAberta((o) => !o)}>
            <Icon name="menu" size={18} />
          </button>
          <SearchField value={busca} onChange={(e) => setBusca(e.target.value)} />
        </Topbar>

        <div style={{ flex: 1, minWidth: 0, padding: "20px 24px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          <PageHeader kicker="Central" title="Fila da Central" desc="Solicitações nas etapas dos setores de Ana Lima." />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
            <Kpi label="Na fila" value={SOLICITACOES.length} />
            <Kpi label="Etapa atrasada" value={atrasadas} tone={atrasadas > 0 ? "bad" : undefined} />
            <Kpi label="Com pendência" value={comPendenciaTotal} tone={comPendenciaTotal > 0 ? "warn" : undefined} />
            <Kpi label="Tempo médio" value="3,2 dias" />
          </div>

          <div className="e-card" style={{ overflow: "hidden" }}>
            <Tabs
              label="Etapas"
              value={etapa}
              onChange={(v) => setEtapa(v as Etapa)}
              tabs={[
                { value: "triagem", label: "Triagem", count: contagemPorEtapa("triagem") },
                { value: "vistoria", label: "Vistoria", count: contagemPorEtapa("vistoria") },
                { value: "execucao", label: "Execução", count: contagemPorEtapa("execucao") },
              ]}
            />

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                borderBottom: "1px solid var(--c-border)",
              }}
            >
              <ChoiceChips
                label="Canal"
                value={canalFiltro}
                onChange={(v) => setCanalFiltro(v as string)}
                options={[
                  { value: "portal", label: "Portal" },
                  { value: "app", label: "App" },
                  { value: "presencial", label: "Presencial" },
                  { value: "central", label: "Central telefônica" },
                ]}
              />
              <ChoiceChips
                multi
                label="Com pendência"
                value={comPendencia}
                onChange={(v) => setComPendencia(v as string[])}
                options={[{ value: "pendencia", label: "Com pendência" }]}
              />
              <div style={{ width: 220 }}>
                <Select label="Ordenar por" value="prazo" options={[{ value: "prazo", label: "Prazo mais próximo" }]} />
              </div>
            </div>

            <DataTable
              state={filtradas.length === 0 ? "vazio" : "pronto"}
              mensagemVazio={`Nenhuma solicitação na ${LABEL_ETAPA[etapa]}.`}
              rows={filtradas}
              columns={[
                {
                  key: "protocolo",
                  label: "Protocolo · Serviço",
                  width: "minmax(0,1.6fr)",
                  render: (r) => (
                    <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <span className="e-code" style={{ width: "fit-content" }}>
                        {r.protocolo}
                      </span>
                      <span className="e-nowrap">{r.servico}</span>
                    </span>
                  ),
                },
                {
                  key: "solicitante",
                  label: "Solicitante",
                  width: "minmax(0,1.2fr)",
                  render: (r) => (
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Icon name={ICONE_CANAL[r.canal]} size={14} style={{ color: "var(--c-text-2)" }} />
                      <span className="e-nowrap">{r.solicitante}</span>
                    </span>
                  ),
                },
                {
                  key: "local",
                  label: "Local",
                  width: "minmax(0,1.3fr)",
                  render: (r) => (
                    <span className="e-nowrap">
                      {r.local} · {r.localidade}
                    </span>
                  ),
                },
                {
                  key: "etapa",
                  label: "Etapa",
                  width: "160px",
                  render: (r) => (
                    <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <StatusBadge tone="info" dot>
                        {LABEL_ETAPA[r.etapa]}
                      </StatusBadge>
                      {r.pendencia && (
                        <StatusBadge tone="warn" icon="circle-alert">
                          {r.pendencia}
                        </StatusBadge>
                      )}
                    </span>
                  ),
                },
                {
                  key: "rotuloPublico",
                  label: "Rótulo público",
                  width: "140px",
                  render: (r) => <StatusBadge tone="neu">{r.rotuloPublico}</StatusBadge>,
                },
                {
                  key: "prazo",
                  label: "Prazo",
                  width: "140px",
                  render: (r) => <PrazoCelula prazo={r.prazo} />,
                },
                {
                  key: "acao",
                  label: "",
                  width: "100px",
                  render: () => (
                    <Button size="sm" iconRight="arrow-right">
                      Atender
                    </Button>
                  ),
                },
              ]}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="secondary" icon="chevron-down">
              Carregar mais ({formatContagem(filtradas.length, "resultado")})
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
