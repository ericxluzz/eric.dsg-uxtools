import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type Tema = "claro" | "escuro";

const STORAGE_KEY = "eric-tema";
const TEMA_PADRAO: Tema = "claro";

type TemaContextValue = {
  tema: Tema;
  setTema: (tema: Tema) => void;
  alternarTema: () => void;
};

const TemaContext = createContext<TemaContextValue | null>(null);

function lerTemaSalvo(): Tema {
  if (typeof window === "undefined") return TEMA_PADRAO;
  const salvo = window.localStorage.getItem(STORAGE_KEY);
  return salvo === "claro" || salvo === "escuro" ? salvo : TEMA_PADRAO;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [tema, setTemaState] = useState<Tema>(lerTemaSalvo);

  useEffect(() => {
    document.documentElement.setAttribute("data-tema", tema);
    window.localStorage.setItem(STORAGE_KEY, tema);
  }, [tema]);

  const setTema = useCallback((novo: Tema) => setTemaState(novo), []);
  const alternarTema = useCallback(
    () => setTemaState((atual) => (atual === "claro" ? "escuro" : "claro")),
    [],
  );

  const value = useMemo(() => ({ tema, setTema, alternarTema }), [tema, setTema, alternarTema]);

  return <TemaContext.Provider value={value}>{children}</TemaContext.Provider>;
}

export function useTema(): TemaContextValue {
  const ctx = useContext(TemaContext);
  if (!ctx) throw new Error("useTema deve ser usado dentro de <ThemeProvider>.");
  return ctx;
}
