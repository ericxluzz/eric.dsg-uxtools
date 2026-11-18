import { useState } from "react";
import { AddStep, FlowCanvas, FlowEdge, FlowNode } from "@eric/react";
import {
  ChartCard,
  Dumbbell,
  Funnel,
  Heatmap,
  LineChart,
  RankBars,
  StackedBars,
} from "@eric/charts";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 24 }}>
      <h2 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 10px" }}>{title}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
        {children}
      </div>
    </section>
  );
}

export function ChartsPage() {
  const [selecionado, setSelecionado] = useState(1);

  return (
    <>
      <p style={{ fontSize: 12, color: "var(--c-text-2)", margin: "0 0 4px" }}>Fase 4</p>
      <h1 style={{ fontSize: 22, lineHeight: "28px", fontWeight: 600, margin: "0 0 16px" }}>
        Gráficos e canvas de fluxo
      </h1>

      <Section title="Gráficos (@eric/charts)">
        <ChartCard
          title="68% das solicitações concluídas no prazo"
          sub="Últimos 6 meses"
          summary="Tendência de alta: de 42% em janeiro para 68% em junho, acima da meta de 60%."
          table={{
            head: ["Mês", "% no prazo"],
            rows: [
              ["Jan", 42],
              ["Fev", 48],
              ["Mar", 51],
              ["Abr", 57],
              ["Mai", 61],
              ["Jun", 68],
            ],
          }}
        >
          <LineChart data={[42, 48, 51, 57, 61, 68]} goal={60} labels={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"]} unit="%" />
        </ChartCard>

        <ChartCard
          title="Amajari é o setor com mais solicitações em atraso"
          summary="Amajari lidera com 12 solicitações em atraso, acima da meta de 5."
          table={{ head: ["Setor", "Atrasadas"], rows: [["Amajari", 12], ["Central", 8], ["Norte", 3]] }}
        >
          <RankBars
            items={[
              { l: "Amajari", v: 12, hi: "bad" },
              { l: "Central", v: 8 },
              { l: "Norte", v: 3 },
            ]}
            goal={5}
            unit=" ocorr."
          />
        </ChartCard>

        <ChartCard
          title="70% da fila está concluída"
          summary="Da fila atual, 70% concluídas, 20% pendentes e 10% em atraso."
          table={{ head: ["Semana", "Concluído", "Pendente", "Atraso"], rows: [["Esta semana", 70, 20, 10]] }}
        >
          <StackedBars
            series={[
              { k: "ok", l: "Concluído", c: "var(--c-ok-solid)" },
              { k: "warn", l: "Pendente", c: "var(--c-stage-vistoria)" },
              { k: "bad", l: "Atraso", c: "var(--c-bad-solid)" },
            ]}
            rows={[{ l: "Esta semana", v: [70, 20, 10] }]}
          />
        </ChartCard>

        <ChartCard
          title="Terça à tarde é o pico de abertura de solicitações"
          summary="Terça-feira à tarde concentra o maior volume de novas solicitações da semana."
          table={{ head: ["Dia", "Manhã", "Tarde"], rows: [["Seg", 2, 5], ["Ter", 4, 9], ["Qua", 3, 4]] }}
        >
          <Heatmap rows={["Seg", "Ter", "Qua"]} cols={["Manhã", "Tarde"]} values={[[2, 5], [4, 9], [3, 4]]} />
        </ChartCard>

        <ChartCard
          title="28% das solicitações abertas chegam à conclusão"
          summary="De 100 solicitações abertas, 72 seguem para triagem, 45 para execução e 28 concluem."
          table={{ head: ["Etapa", "Quantidade"], rows: [["Abertas", 100], ["Triagem", 72], ["Execução", 45], ["Concluídas", 28]] }}
        >
          <Funnel
            steps={[
              { l: "Abertas", v: 100 },
              { l: "Triagem", v: 72 },
              { l: "Execução", v: 45 },
              { l: "Concluídas", v: 28 },
            ]}
          />
        </ChartCard>

        <ChartCard
          title="Amajari reduziu o atraso médio pela metade"
          summary="O atraso médio em Amajari caiu de 12 para 7 dias; em Central subiu de 4 para 6."
          table={{ head: ["Setor", "Antes", "Agora"], rows: [["Amajari", 12, 7], ["Central", 4, 6]] }}
        >
          <Dumbbell items={[{ l: "Amajari", a: 12, b: 7 }, { l: "Central", a: 4, b: 6 }]} unit=" dias" />
        </ChartCard>
      </Section>

      <Section title="Canvas de fluxo (@eric/react)">
        <div style={{ gridColumn: "1 / -1" }}>
          <FlowCanvas height={280}>
            <FlowNode
              n={1}
              title="Triagem"
              setor="Central"
              tags={["Padrão"]}
              selected={selecionado === 1}
              onClick={() => setSelecionado(1)}
            />
            <FlowEdge label="até 2 dias" />
            <FlowNode
              n={2}
              title="Vistoria"
              setor="Equipe de campo"
              prazo="até 29/10"
              selected={selecionado === 2}
              onClick={() => setSelecionado(2)}
            />
            <FlowEdge label="até 5 dias" />
            <FlowNode
              n={3}
              title="Execução"
              setor="Infraestrutura"
              selected={selecionado === 3}
              onClick={() => setSelecionado(3)}
            />
            <AddStep />
          </FlowCanvas>
        </div>
      </Section>
    </>
  );
}
