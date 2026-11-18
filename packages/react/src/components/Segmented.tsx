import { useRef } from "react";
import type { KeyboardEvent } from "react";
import { Icon } from "./Icon";

export interface SegmentedOption {
  value: string;
  label: string;
  icon?: string;
}

export interface SegmentedProps {
  options: SegmentedOption[];
  value?: string;
  onChange?: (v: string) => void;
  label?: string;
}

/**
 * Faça: use para 2–4 opções mutuamente exclusivas sempre visíveis (sem abrir menu).
 * Não faça: usar para mais de ~4 opções (prefira Tabs ou Select); deixar sem `label` quando não houver rótulo visível ao lado.
 */
export function Segmented({ options, value, onChange, label }: SegmentedProps) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  function focusAndSelect(index: number) {
    const option = options[index];
    if (!option) return;
    onChange?.(option.value);
    refs.current[option.value]?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      focusAndSelect((index + 1) % options.length);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      focusAndSelect((index - 1 + options.length) % options.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusAndSelect(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusAndSelect(options.length - 1);
    }
  }

  return (
    <div role="radiogroup" aria-label={label} className="e-seg">
      {options.map((option, index) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            ref={(el) => {
              refs.current[option.value] = el;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected || (!value && index === 0) ? 0 : -1}
            className="e-seg__opt"
            onClick={() => onChange?.(option.value)}
            onKeyDown={(e) => onKeyDown(e, index)}
          >
            {option.icon && <Icon name={option.icon} size={14} />}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
