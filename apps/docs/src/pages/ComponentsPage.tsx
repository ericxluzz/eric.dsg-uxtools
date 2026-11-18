import { useState } from "react";
import {
  ActionMenu,
  Banner,
  Button,
  Callout,
  Card,
  Checkbox,
  ChoiceChips,
  Count,
  DataTable,
  DatePicker,
  Dialog,
  Drawer,
  EmptyState,
  FilterChip,
  IconButton,
  Kpi,
  LiveIndicator,
  Meter,
  NotificationBell,
  NotificationPanel,
  Pagination,
  ProgressSegments,
  QueueRow,
  SearchField,
  Segmented,
  Select,
  StageBadge,
  StatusBadge,
  Stepper,
  Switch,
  Tabs,
  TextField,
  Timeline,
  ToastHost,
  Tooltip,
  useToasts,
} from "@eric/react";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 10px" }}>{title}</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "flex-start" }}>
        {children}
      </div>
    </section>
  );
}

function DispararToast() {
  const { notificar } = useToasts();
  return (
    <Button variant="secondary" icon="bell" onClick={() => notificar("Solicitação enviada.", "ok")}>
      Disparar toast
    </Button>
  );
}

const LINHAS_TABELA = [
  { protocolo: "AMA-2026-000041", titulo: "Buraco na via", status: "pendente" as const },
  { protocolo: "AMA-2026-000040", titulo: "Poda de árvore", status: "andamento" as const },
  { protocolo: "AMA-2026-000039", titulo: "Coleta atrasada", status: "atraso" as const },
];

const TONE_STATUS = { pendente: "warn", andamento: "info", atraso: "bad" } as const;
const LABEL_STATUS = { pendente: "Pendente", andamento: "Em andamento", atraso: "Atrasada" } as const;

function DataTableDemo() {
  const [estado, setEstado] = useState<
    "pronto" | "vazio" | "carregando" | "erro" | "sem-permissao"
  >("pronto");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
      <Segmented
        label="Estado da tabela"
        value={estado}
        onChange={(v) => setEstado(v as typeof estado)}
        options={[
          { value: "pronto", label: "Pronto" },
          { value: "vazio", label: "Vazio" },
          { value: "carregando", label: "Carregando" },
          { value: "erro", label: "Erro" },
          { value: "sem-permissao", label: "Sem permissão" },
        ]}
      />
      <DataTable
        state={estado}
        onTentarDeNovo={() => setEstado("pronto")}
        columns={[
          { key: "protocolo", label: "Protocolo", width: "180px" },
          { key: "titulo", label: "Solicitação", width: "minmax(0,2fr)" },
          {
            key: "status",
            label: "Status",
            width: "140px",
            render: (row) => (
              <StatusBadge tone={TONE_STATUS[row.status]} dot>
                {LABEL_STATUS[row.status]}
              </StatusBadge>
            ),
          },
        ]}
        rows={estado === "pronto" ? LINHAS_TABELA : []}
      />
    </div>
  );
}

function DialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="danger-ghost" icon="corner-up-left" onClick={() => setOpen(true)}>
        Devolver à Central
      </Button>
      <Dialog
        open={open}
        title="Devolver à Central?"
        sub="A solicitação volta para a fila geral e perde o responsável atual."
        icon="corner-up-left"
        tone="bad"
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={() => setOpen(false)}>
              Devolver
            </Button>
          </>
        }
      >
        Protocolo AMA-2026-000041 · Amajari · RR
      </Dialog>
    </>
  );
}

function DrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" icon="panel-right" onClick={() => setOpen(true)}>
        Ver detalhe
      </Button>
      <Drawer
        open={open}
        title="AMA-2026-000041 · Buraco na via"
        onClose={() => setOpen(false)}
        footer={
          <Button variant="primary" onClick={() => setOpen(false)}>
            Concluir OS
          </Button>
        }
      >
        <TextField label="Endereço" defaultValue="Rua das Flores, 120" />
        <TextField label="Observações" multiline help="Visível para a equipe de campo." />
      </Drawer>
    </>
  );
}

export function ComponentsPageInner() {
  const [select, setSelect] = useState("infra");
  const [switchOn, setSwitchOn] = useState(true);
  const [segmented, setSegmented] = useState("lista");
  const [tab, setTab] = useState("abertas");

  return (
    <>
      <p style={{ fontSize: 12, color: "var(--c-text-2)", margin: "0 0 4px" }}>
        Fase 2 · Componentes
      </p>
      <h1 style={{ fontSize: 22, lineHeight: "28px", fontWeight: 600, margin: "0 0 16px" }}>
        Componentes núcleo
      </h1>

      <Section title="Button / IconButton">
        <Button>Primário</Button>
        <Button variant="secondary">Secundário</Button>
        <Button variant="soft">Suave</Button>
        <Button variant="ghost">Fantasma</Button>
        <Button variant="success" icon="check">
          Concluir OS
        </Button>
        <Button variant="danger" icon="trash-2">
          Excluir
        </Button>
        <Button disabled>Desabilitado</Button>
        <IconButton icon="pencil" label="Editar" />
        <IconButton icon="trash-2" label="Excluir" variant="danger" />
      </Section>

      <Section title="Campos">
        <TextField label="Protocolo" help="Formato AMA-2026-000000" />
        <TextField label="E-mail" required error="Informe um e-mail válido." />
        <Select
          label="Categoria"
          value={select}
          onChange={setSelect}
          options={[
            { value: "infra", label: "Infraestrutura" },
            { value: "amb", label: "Ambiental" },
            { value: "doc", label: "Documentação" },
          ]}
        />
      </Section>

      <Section title="Switch / Checkbox / Segmented">
        <Switch checked={switchOn} onChange={setSwitchOn}>
          Notificar por e-mail
        </Switch>
        <Checkbox defaultChecked>Aceito os termos</Checkbox>
        <Segmented
          label="Visualização"
          value={segmented}
          onChange={setSegmented}
          options={[
            { value: "lista", label: "Lista", icon: "list" },
            { value: "mapa", label: "Mapa", icon: "map" },
          ]}
        />
      </Section>

      <Section title="Selos e contadores">
        <StatusBadge tone="ok" dot>
          Concluído
        </StatusBadge>
        <StatusBadge tone="warn" dot>
          Pendente
        </StatusBadge>
        <StatusBadge tone="info" dot>
          Em andamento
        </StatusBadge>
        <StatusBadge tone="bad" dot>
          Atrasada
        </StatusBadge>
        <StageBadge stage="vistoria">Vistoria</StageBadge>
        <Count n={4} active label="4 solicitações" />
        <Count n={2} alert label="2 em atraso" />
      </Section>

      <Section title="Callout / Toast">
        <Callout tone="info">Essa área ainda recebe novos componentes nas próximas fases.</Callout>
        <Callout tone="bad">Falha ao salvar a solicitação.</Callout>
        <DispararToast />
      </Section>

      <Section title="Card / Kpi">
        <Card title="Resumo de Amajari · RR" actions={<IconButton icon="more-vertical" label="Mais ações" />}>
          <Kpi label="Em atraso" value={12} delta="+3 desde ontem" tone="bad" />
        </Card>
      </Section>

      <Section title="Tabs">
        <Tabs
          label="Seções"
          value={tab}
          onChange={setTab}
          tabs={[
            { value: "abertas", label: "Abertas", count: 4 },
            { value: "concluidas", label: "Concluídas" },
            { value: "canceladas", label: "Canceladas" },
          ]}
        />
      </Section>

      <Section title="DataTable">
        <DataTableDemo />
      </Section>

      <Section title="Dialog / Drawer">
        <DialogDemo />
        <DrawerDemo />
      </Section>

      <Section title="Busca / Chips (Fase 3)">
        <SearchField />
        <ChoiceChips
          label="Status"
          value="pendente"
          options={[
            { value: "pendente", label: "Pendente" },
            { value: "atraso", label: "Em atraso" },
          ]}
        />
        <FilterChip onRemove={() => {}}>Infraestrutura</FilterChip>
      </Section>

      <Section title="Data / Avisos (Fase 3)">
        <DatePicker label="Prazo" />
        <Banner tone="warn" onClose={() => {}}>
          Manutenção programada para hoje às 22h.
        </Banner>
      </Section>

      <Section title="Vazio / Tempo real (Fase 3)">
        <EmptyState title="Nenhuma solicitação aberta" action={<Button size="sm">Nova solicitação</Button>} />
        <LiveIndicator />
      </Section>

      <Section title="Notificações (Fase 3)">
        <NotificationBell count={12} />
        <div style={{ width: 340 }}>
          <NotificationPanel
            items={[
              { title: "Nova solicitação na fila", sub: "AMA-2026-000041", time: "há 2 h", tone: "info", unread: true },
              { title: "OS concluída", sub: "AMA-2026-000038", time: "ontem", tone: "ok" },
            ]}
            onReadAll={() => {}}
            onItem={() => {}}
          />
        </div>
      </Section>

      <Section title="Navegação / progresso (Fase 3)">
        <Pagination page={2} pages={9} total={180} onChange={() => {}} />
        <Stepper steps={["Dados", "Fotos", "Revisão"]} current={1} />
        <ActionMenu items={[{ label: "Editar", icon: "pencil" }, "-", { label: "Excluir", icon: "trash-2", danger: true }]} />
        <Tooltip text="Editar solicitação">
          <IconButton icon="pencil" label="Editar" />
        </Tooltip>
      </Section>

      <Section title="Medidores e fila (Fase 3)">
        <Meter label="Concluídas no prazo" value="68%" pct={68} late={8} goal={80} />
        <ProgressSegments total={4} done={2} label="Documentos enviados" />
        <div style={{ width: "100%" }}>
          <Timeline
            items={[
              { t: "Solicitação criada", q: "Triagem", who: "Ana Lima" },
              { t: "Encaminhada para vistoria", who: "Carlos Dias" },
            ]}
          />
        </div>
        <div className="e-card" style={{ width: "100%", overflow: "hidden" }}>
          <QueueRow
            kicker="AMA-2026-000041"
            title="Buraco na via pública"
            sub="Rua das Flores, 120"
            bar="bad"
            badges={
              <StatusBadge tone="bad" dot>
                Atrasada
              </StatusBadge>
            }
          />
        </div>
      </Section>
    </>
  );
}

export function ComponentsPage() {
  return (
    <ToastHost>
      <ComponentsPageInner />
    </ToastHost>
  );
}
