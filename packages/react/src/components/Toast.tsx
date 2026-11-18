import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

export type ToastTone = "ok" | "warn" | "info" | "bad";

export interface ToastProps {
  tone?: ToastTone;
  children: ReactNode;
}

const ICONE: Record<ToastTone, string> = {
  ok: "circle-check",
  warn: "triangle-alert",
  info: "info",
  bad: "circle-x",
};

/** Peça visual de um toast. Para disparar toasts, use `useToasts()` + `<ToastHost/>`. */
export function Toast({ tone = "info", children }: ToastProps) {
  return (
    <div role="status" aria-live="polite" className="e-toast">
      <Icon name={ICONE[tone]} size={16} className={`e-toast__icon--${tone}`} />
      {children}
    </div>
  );
}

type ToastEntry = { id: number; tone: ToastTone; message: ReactNode; duration: number };
type ToastContextValue = { notificar: (message: ReactNode, tone?: ToastTone, duration?: number) => void };

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastHost({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);

  const notificar = useCallback(
    (message: ReactNode, tone: ToastTone = "info", duration = 3500) => {
      const id = Date.now() + Math.random();
      setToasts((atual) => [...atual, { id, tone, message, duration }]);
    },
    [],
  );

  useEffect(() => {
    if (toasts.length === 0) return;
    const timers = toasts.map((t) =>
      setTimeout(() => setToasts((atual) => atual.filter((x) => x.id !== t.id)), t.duration),
    );
    return () => timers.forEach(clearTimeout);
  }, [toasts]);

  const value = useMemo(() => ({ notificar }), [notificar]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        style={{
          position: "fixed",
          left: 16,
          bottom: 16,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          zIndex: 80,
        }}
      >
        {toasts.map((t) => (
          <Toast key={t.id} tone={t.tone}>
            {t.message}
          </Toast>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToasts(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToasts deve ser usado dentro de <ToastHost>.");
  return ctx;
}
