import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import {
  ActionMenu,
  AppSidebar,
  Avatar,
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
  AddStep,
  EmptyState,
  FileAttach,
  FilterChip,
  FlowCanvas,
  FlowEdge,
  FlowNode,
  FormSection,
  IconButton,
  Kpi,
  LiveIndicator,
  Meter,
  NotificationBell,
  NotificationPanel,
  PageHeader,
  Pagination,
  PhotoUpload,
  ProgressBar,
  ProgressSegments,
  QueueRow,
  SearchField,
  Segmented,
  Select,
  SideNav,
  Skeleton,
  Spinner,
  StageBadge,
  StatusBadge,
  Stepper,
  Switch,
  Tabs,
  TextField,
  Timeline,
  Toast,
  Tooltip,
  Topbar,
  UserMenu,
} from "../src";

describe("a11y (axe) — componentes núcleo", () => {
  it("Button", async () => {
    const { container } = render(<Button icon="save">Salvar</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("IconButton exige label", async () => {
    const { container } = render(<IconButton icon="x" label="Fechar" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("TextField com erro", async () => {
    const { container } = render(
      <TextField label="E-mail" required error="Informe um e-mail válido." />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Select fechado", async () => {
    const { container } = render(
      <Select label="Categoria" options={["Infraestrutura", "Ambiental"]} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Switch e Checkbox", async () => {
    const { container } = render(
      <>
        <Switch checked>Notificar por e-mail</Switch>
        <Checkbox defaultChecked>Aceito os termos</Checkbox>
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Segmented", async () => {
    const { container } = render(
      <Segmented
        label="Visualização"
        value="lista"
        options={[
          { value: "lista", label: "Lista" },
          { value: "mapa", label: "Mapa" },
        ]}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("StatusBadge, StageBadge e Count", async () => {
    const { container } = render(
      <>
        <StatusBadge tone="ok">Concluído</StatusBadge>
        <StageBadge stage="vistoria">Vistoria</StageBadge>
        <Count n={3} label="3 solicitações" />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Callout e Toast", async () => {
    const { container } = render(
      <>
        <Callout tone="bad">Falha ao salvar.</Callout>
        <Toast tone="ok">Solicitação enviada.</Toast>
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Card e Kpi", async () => {
    const { container } = render(
      <Card title="Resumo">
        <Kpi label="Em atraso" value={12} delta="+3" tone="bad" />
      </Card>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Tabs", async () => {
    const { container } = render(
      <Tabs
        label="Seções"
        value="abertas"
        tabs={[
          { value: "abertas", label: "Abertas", count: 4 },
          { value: "concluidas", label: "Concluídas" },
        ]}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("DataTable (pronto, vazio, carregando, erro, sem-permissão)", async () => {
    const columns = [{ key: "nome", label: "Nome" }];
    for (const state of ["pronto", "vazio", "carregando", "erro", "sem-permissao"] as const) {
      const { container, unmount } = render(
        <DataTable
          columns={columns}
          rows={state === "pronto" ? [{ nome: "Amajari · RR" }] : []}
          state={state}
          onTentarDeNovo={() => {}}
        />,
      );
      expect(await axe(container)).toHaveNoViolations();
      unmount();
    }
  });

  it("Dialog aberto", async () => {
    const { container } = render(
      <Dialog open title="Devolver à Central?" sub="A solicitação volta para a fila geral." onClose={() => {}}>
        Confirma a devolução?
      </Dialog>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Drawer aberto", async () => {
    const { container } = render(
      <Drawer open title="Detalhe da solicitação" onClose={() => {}}>
        Conteúdo do drawer.
      </Drawer>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("a11y (axe) — componentes complementares e layout (Fase 3)", () => {
  it("SearchField, ChoiceChips, FilterChip", async () => {
    const { container } = render(
      <>
        <SearchField />
        <ChoiceChips
          label="Status"
          value="pendente"
          options={[
            { value: "pendente", label: "Pendente" },
            { value: "concluido", label: "Concluído" },
          ]}
        />
        <FilterChip onRemove={() => {}}>Infraestrutura</FilterChip>
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("FormSection, PhotoUpload, FileAttach", async () => {
    const { container } = render(
      <FormSection n={1} title="Dados da solicitação" sub="Campos obrigatórios marcados com *">
        <PhotoUpload photos={[]} onAdd={() => {}} onRemove={() => {}} />
        <FileAttach
          files={[{ name: "laudo.pdf", size: "1,2 MB" }, { name: "foto.png", progress: 40 }]}
          onPick={() => {}}
          onRemove={() => {}}
        />
      </FormSection>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("DatePicker fechado e aberto", async () => {
    const { container } = render(<DatePicker label="Prazo" value={new Date(2026, 9, 29)} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Banner, EmptyState, LiveIndicator", async () => {
    const { container } = render(
      <>
        <Banner tone="warn" onClose={() => {}}>
          Manutenção programada às 22h.
        </Banner>
        <EmptyState title="Nenhuma solicitação aberta" />
        <LiveIndicator />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Spinner, Skeleton, ProgressBar", async () => {
    const { container } = render(
      <>
        <Spinner />
        <Skeleton />
        <ProgressBar value={42} label="Envio em andamento" />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("NotificationBell e NotificationPanel", async () => {
    const { container } = render(
      <>
        <NotificationBell count={12} />
        <NotificationPanel
          items={[{ title: "Nova solicitação", sub: "AMA-2026-000041", time: "há 2 h", unread: true }]}
          onReadAll={() => {}}
          onItem={() => {}}
        />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Timeline e Tooltip", async () => {
    const { container } = render(
      <>
        <Timeline items={[{ t: "Criada", q: "Triagem", who: "Ana" }]} />
        <Tooltip text="Editar">
          <button type="button">E</button>
        </Tooltip>
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("ActionMenu fechado e aberto", async () => {
    const { container } = render(
      <ActionMenu items={[{ label: "Editar", icon: "pencil" }, "-", { label: "Excluir", icon: "trash-2", danger: true }]} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Pagination", async () => {
    const { container } = render(<Pagination page={2} pages={9} total={180} onChange={() => {}} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("SideNav, Stepper, Topbar, UserMenu, Avatar", async () => {
    const { container } = render(
      <>
        <SideNav
          title="Central"
          value="fila"
          items={[{ value: "fila", label: "Fila", icon: "list", count: 4 }]}
        />
        <Stepper steps={["Dados", "Fotos", "Revisão"]} current={1} />
        <Topbar right={<Avatar name="Ana Lima" />} />
        <UserMenu name="Ana Lima" role="Atendente" items={[{ label: "Minha conta", icon: "user" }]} />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Meter, ProgressSegments, QueueRow, PageHeader", async () => {
    const { container } = render(
      <>
        <Meter label="Concluídas" value="68%" pct={68} late={8} goal={80} />
        <ProgressSegments total={4} done={2} label="Documentos enviados" />
        <QueueRow title="Buraco na via" sub="Rua das Flores, 120" bar="bad" />
        <PageHeader kicker="Central" title="Fila de atendimento" desc="Solicitações pendentes de triagem." />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("FlowCanvas com FlowNode/FlowEdge/AddStep", async () => {
    const { container } = render(
      <FlowCanvas toolbar={<span>Fluxo</span>} zoom={100}>
        <FlowNode n={1} title="Triagem" setor="Central" tags={["Padrão"]} selected />
        <FlowEdge label="2 dias" />
        <FlowNode n={2} title="Vistoria" prazo="até 29/10" />
        <AddStep />
      </FlowCanvas>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("AppSidebar", async () => {
    const { container } = render(
      <AppSidebar
        name="Conecta+"
        items={[{ value: "fila", label: "Fila", icon: "list" }]}
        value="fila"
        user={{ name: "Ana Lima", role: "Atendente" }}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
