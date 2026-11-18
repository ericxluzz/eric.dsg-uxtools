import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

export interface DatePickerProps {
  label: string;
  value?: Date;
  onChange?: (d: Date) => void;
  today?: Date;
}

const MESES = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];
const DIAS_SEMANA = ["D", "S", "T", "Q", "Q", "S", "S"];

function formatar(d?: Date): string {
  if (!d) return "";
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

function mesmoDia(a?: Date, b?: Date): boolean {
  return !!a && !!b && a.toDateString() === b.toDateString();
}

/**
 * Faça: semana começa no domingo (dd/mm/aaaa); feche com Esc e devolva o foco ao botão.
 * Não faça: aceitar digitação livre sem máscara — use o calendário como única forma de escolha por ora.
 */
export function DatePicker({ label, value, onChange, today = new Date() }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(value || today);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const calRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!calRef.current?.contains(e.target as Node) && !buttonRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    const onDocKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onDocKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onDocKeyDown);
    };
  }, [open]);

  const y = view.getFullYear();
  const m = view.getMonth();
  const primeiro = new Date(y, m, 1).getDay();
  const celulas = Array.from({ length: 42 }, (_, i) => new Date(y, m, i - primeiro + 1));

  return (
    <div className="e-field e-date">
      <span className="e-field__label">{label}</span>
      <button
        ref={buttonRef}
        type="button"
        className="e-select__btn"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <Icon name="calendar" size={15} />
        <span className="e-select__val">{formatar(value) || "dd/mm/aaaa"}</span>
      </button>
      {open && (
        <div ref={calRef} className="e-cal" role="dialog" aria-label="Escolher data">
          <div className="e-cal__head">
            <button
              type="button"
              className="e-iconbtn e-iconbtn--sm"
              aria-label="Mês anterior"
              onClick={() => setView(new Date(y, m - 1, 1))}
            >
              <Icon name="chevron-left" size={14} />
            </button>
            {MESES[m]} {y}
            <button
              type="button"
              className="e-iconbtn e-iconbtn--sm"
              aria-label="Próximo mês"
              onClick={() => setView(new Date(y, m + 1, 1))}
            >
              <Icon name="chevron-right" size={14} />
            </button>
          </div>
          <div className="e-cal__grid">
            {DIAS_SEMANA.map((d, i) => (
              <span key={i} className="e-cal__dow">
                {d}
              </span>
            ))}
            {celulas.map((d, i) => (
              <button
                key={i}
                type="button"
                className={
                  "e-cal__day" +
                  (d.getMonth() !== m ? " e-cal__day--out" : "") +
                  (mesmoDia(d, today) ? " e-cal__day--today" : "")
                }
                aria-selected={mesmoDia(d, value)}
                onClick={() => {
                  onChange?.(d);
                  setOpen(false);
                  buttonRef.current?.focus();
                }}
              >
                {d.getDate()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
