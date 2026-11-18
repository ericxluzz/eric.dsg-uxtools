import { describe, expect, it } from "vitest";
import {
  formatCEP,
  formatContagem,
  formatData,
  formatDataCurta,
  formatDataExtenso,
  formatDataHora,
  formatDecimal,
  formatDuracao,
  formatEndereco,
  formatHora,
  formatMoeda,
  formatNumero,
  formatPorcentagem,
  formatPrazo,
  formatProtocolo,
  formatRelativo,
  formatTelefone,
  mascararCPF,
  mascararTelefone,
} from "../src";

describe("datas (referencia/guidelines/FORMATOS.md)", () => {
  it("formatData → dd/mm/aaaa", () => {
    expect(formatData(new Date(2026, 10, 5))).toBe("05/11/2026");
  });

  it("formatDataCurta → dd/mm", () => {
    expect(formatDataCurta(new Date(2026, 10, 5))).toBe("05/11");
  });

  it("formatDataExtenso → d de mês de aaaa", () => {
    expect(formatDataExtenso(new Date(2026, 10, 5))).toBe("5 de novembro de 2026");
  });

  it("formatHora → HH:mm", () => {
    expect(formatHora(new Date(2026, 10, 5, 14, 30))).toBe("14:30");
  });

  it("formatDataHora → dd/mm · HH:mm", () => {
    expect(formatDataHora(new Date(2026, 10, 5, 14, 30))).toBe("05/11 · 14:30");
  });

  it("formatRelativo → agora / há N min / há N h / ontem / dd/mm", () => {
    const agora = new Date(2026, 10, 5, 14, 30);
    expect(formatRelativo(new Date(2026, 10, 5, 14, 29, 50), agora)).toBe("agora");
    expect(formatRelativo(new Date(2026, 10, 5, 14, 18), agora)).toBe("há 12 min");
    expect(formatRelativo(new Date(2026, 10, 5, 12, 30), agora)).toBe("há 2 h");
    expect(formatRelativo(new Date(2026, 10, 4, 9, 0), agora)).toBe("ontem");
    expect(formatRelativo(new Date(2026, 9, 20, 9, 0), agora)).toBe("20/10");
  });

  it("formatPrazo → vence hoje / vence em N dias / Atrasada · venceu dd/mm", () => {
    const agora = new Date(2026, 9, 29, 10, 0);
    expect(formatPrazo(new Date(2026, 9, 29, 23, 0), agora)).toBe("vence hoje");
    expect(formatPrazo(new Date(2026, 9, 31, 10, 0), agora)).toBe("vence em 2 dias");
    expect(formatPrazo(new Date(2026, 9, 27, 10, 0), agora)).toBe("Atrasada · venceu 27/10");
  });

  it("formatDuracao → n h / n,n dias", () => {
    expect(formatDuracao(5)).toBe("5 h");
    expect(formatDuracao(57.6)).toBe("2,4 dias");
  });
});

describe("números e moeda", () => {
  it("formatNumero → ponto no milhar", () => {
    expect(formatNumero(1250)).toBe("1.250");
  });

  it("formatDecimal → vírgula", () => {
    expect(formatDecimal(94.5)).toBe("94,5");
  });

  it("formatPorcentagem → sem espaço", () => {
    expect(formatPorcentagem(94)).toBe("94%");
  });

  it("formatMoeda → R$ 1.250,00", () => {
    expect(formatMoeda(1250)).toBe("R$ 1.250,00");
  });
});

describe("máscaras e protocolo", () => {
  it("mascararCPF → 3 primeiros e 2 últimos", () => {
    expect(mascararCPF("22233344422")).toBe("222.•••.•••-22");
  });

  it("mascararTelefone → DDD e 4 últimos visíveis", () => {
    expect(mascararTelefone("95999993380")).toBe("(95) •••••-3380");
  });

  it("formatTelefone → (DD) NNNNN-NNNN", () => {
    expect(formatTelefone("95999993380")).toBe("(95) 99999-3380");
  });

  it("formatCEP → NNNNN-NNN", () => {
    expect(formatCEP("69343000")).toBe("69343-000");
  });

  it("formatProtocolo → SIGLA-AAAA-NNNNNN", () => {
    expect(formatProtocolo({ sigla: "ama", ano: 2026, numero: 105 })).toBe("AMA-2026-000105");
  });
});

describe("texto composto", () => {
  it("formatEndereco → Rua, número · Bairro", () => {
    expect(formatEndereco({ rua: "Rua Teste", numero: 10, bairro: "Centro" })).toBe("Rua Teste, 10 · Centro");
  });

  it("formatContagem → plural certo", () => {
    expect(formatContagem(1, "frente")).toBe("1 frente");
    expect(formatContagem(3, "frente")).toBe("3 frentes");
  });
});
