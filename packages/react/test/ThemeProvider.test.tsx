// @vitest-environment jsdom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it, beforeEach } from "vitest";
import { ThemeProvider, useTema } from "../src/theme/ThemeProvider";

function Sonda() {
  const { tema, alternarTema } = useTema();
  return (
    <button type="button" data-testid="sonda" data-tema={tema} onClick={alternarTema}>
      {tema}
    </button>
  );
}

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.removeAttribute("data-tema");
});

describe("ThemeProvider / useTema", () => {
  it("usa claro como padrão e aplica data-tema no <html>", () => {
    const container = document.createElement("div");
    act(() => {
      createRoot(container).render(
        <ThemeProvider>
          <Sonda />
        </ThemeProvider>,
      );
    });
    expect(document.documentElement.getAttribute("data-tema")).toBe("claro");
    expect(window.localStorage.getItem("eric-tema")).toBe("claro");
  });

  it("alterna e persiste em localStorage", () => {
    const container = document.createElement("div");
    act(() => {
      createRoot(container).render(
        <ThemeProvider>
          <Sonda />
        </ThemeProvider>,
      );
    });
    const botao = container.querySelector("[data-testid='sonda']") as HTMLButtonElement;
    act(() => {
      botao.click();
    });
    expect(document.documentElement.getAttribute("data-tema")).toBe("escuro");
    expect(window.localStorage.getItem("eric-tema")).toBe("escuro");
  });
});
