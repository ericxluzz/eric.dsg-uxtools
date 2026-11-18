import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { Icon } from "./Icon";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label: string;
  value?: string;
  options: Array<SelectOption | string>;
  onChange?: (v: string) => void;
  placeholder?: string;
}

function normalize(option: SelectOption | string): SelectOption {
  return typeof option === "string" ? { value: option, label: option } : option;
}

/**
 * Faça: feche com clique fora e com Esc; devolva o foco ao botão ao fechar; marque o item atual com check.
 * Não faça: abrir mais de um Select ao mesmo tempo; deixar a lista sem `role="listbox"`/`aria-selected`.
 */
export function Select({ label, value, options, onChange, placeholder = "Selecione" }: SelectProps) {
  const normalized = useMemo(() => options.map(normalize), [options]);
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const fieldId = useId();
  const current = normalized.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!listRef.current?.contains(e.target as Node) && !buttonRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  useEffect(() => {
    if (open) {
      const idx = normalized.findIndex((o) => o.value === value);
      setHighlighted(idx >= 0 ? idx : 0);
      listRef.current?.focus();
    }
  }, [open, value, normalized]);

  function commit(index: number) {
    const option = normalized[index];
    if (!option) return;
    onChange?.(option.value);
    setOpen(false);
    buttonRef.current?.focus();
  }

  function onTriggerKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  }

  function onListKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlighted((i) => Math.min(i + 1, normalized.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlighted((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        setHighlighted(0);
        break;
      case "End":
        e.preventDefault();
        setHighlighted(normalized.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        commit(highlighted);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  return (
    <div className="e-field">
      <span className="e-field__label" id={fieldId}>
        {label}
      </span>
      <span className="e-select">
        <button
          ref={buttonRef}
          type="button"
          className="e-select__btn"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={fieldId}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={onTriggerKeyDown}
        >
          <span className="e-select__val" style={{ color: current ? undefined : "var(--c-text-2)" }}>
            {current ? current.label : placeholder}
          </span>
          <Icon name="chevron-down" size={14} />
        </button>
        {open && (
          <div
            ref={listRef}
            role="listbox"
            aria-labelledby={fieldId}
            tabIndex={-1}
            className="e-menu"
            onKeyDown={onListKeyDown}
          >
            {normalized.map((option, index) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={option.value === value}
                className="e-menu__item"
                style={index === highlighted ? { background: "var(--c-surface-2)" } : undefined}
                onMouseEnter={() => setHighlighted(index)}
                onClick={() => commit(index)}
              >
                <span className="e-nav__label">{option.label}</span>
                {option.value === value && <Icon name="check" size={14} />}
              </button>
            ))}
          </div>
        )}
      </span>
    </div>
  );
}
