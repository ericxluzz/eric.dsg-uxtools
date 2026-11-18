export interface ChoiceChipsOption {
  value: string;
  label: string;
}

export interface ChoiceChipsProps {
  options: Array<ChoiceChipsOption | string>;
  value?: string | string[];
  onChange?: (v: string | string[]) => void;
  multi?: boolean;
  label?: string;
}

function normalize(option: ChoiceChipsOption | string): ChoiceChipsOption {
  return typeof option === "string" ? { value: option, label: option } : option;
}

/**
 * Faça: use `multi` para filtros combináveis; sem `multi`, é um grupo de escolha única (role="radiogroup").
 * Não faça: usar mais de ~8 opções — nesse caso prefira Select ou FilterChip aplicados.
 */
export function ChoiceChips({ options, value, onChange, multi, label }: ChoiceChipsProps) {
  const normalized = options.map(normalize);
  const selectedList = Array.isArray(value) ? value : [];

  const isOn = (v: string) => (multi ? selectedList.includes(v) : value === v);

  const toggle = (v: string) => {
    if (!onChange) return;
    if (multi) {
      onChange(isOn(v) ? selectedList.filter((x) => x !== v) : [...selectedList, v]);
    } else {
      onChange(v);
    }
  };

  return (
    <div role={multi ? "group" : "radiogroup"} aria-label={label} className="e-chips">
      {normalized.map((option) => (
        <button
          key={option.value}
          type="button"
          className="e-chip"
          role={multi ? undefined : "radio"}
          aria-checked={multi ? undefined : isOn(option.value)}
          aria-pressed={multi ? isOn(option.value) : undefined}
          onClick={() => toggle(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
