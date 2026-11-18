import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import {
  ChartCard,
  Dumbbell,
  Funnel,
  Heatmap,
  LineChart,
  RankBars,
  Sparkline,
  StackedBars,
} from "../src";

function TabelaExemplo() {
  return { head: ["Mês", "Valor"], rows: [["Jan", 10], ["Fev", 14]] };
}

describe("a11y (axe) — @eric/charts", () => {
  it("ChartCard + LineChart, com alternância para tabela", async () => {
    const { container } = render(
      <ChartCard title="68% concluídas no prazo" summary="Tendência de alta nos últimos 6 meses." table={TabelaExemplo()}>
        <LineChart data={[10, 14, 9, 18, 22, 25]} goal={20} labels={["J", "F", "M", "A", "M", "J"]} />
      </ChartCard>,
    );
    expect(await axe(container)).toHaveNoViolations();

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Ver dados" }));
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Sparkline, RankBars, StackedBars", async () => {
    const { container } = render(
      <>
        <Sparkline data={[4, 6, 5, 8]} />
        <RankBars items={[{ l: "Amajari", v: 12, hi: "bad" }, { l: "Central", v: 8 }]} />
        <StackedBars
          series={[
            { k: "ok", l: "Concluído", c: "var(--c-ok-solid)" },
            { k: "warn", l: "Pendente", c: "var(--c-stage-vistoria)" },
          ]}
          rows={[{ l: "Semana 1", v: [70, 30] }]}
        />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Heatmap, Funnel, Dumbbell", async () => {
    const { container } = render(
      <>
        <Heatmap rows={["Seg", "Ter"]} cols={["Manhã", "Tarde"]} values={[[2, 5], [4, 1]]} />
        <Funnel steps={[{ l: "Abertas", v: 100 }, { l: "Concluídas", v: 72 }]} />
        <Dumbbell items={[{ l: "Amajari", a: 12, b: 7 }]} />
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
