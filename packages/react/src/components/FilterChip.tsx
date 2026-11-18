import { Icon } from "./Icon";

export interface FilterChipProps {
  children: string;
  onRemove?: () => void;
}

/**
 * Faça: use para mostrar filtros ativos acima de uma lista/tabela, com remoção individual.
 * Não faça: usar como seleção (prefira ChoiceChips) — FilterChip é só exibição + remover.
 */
export function FilterChip({ children, onRemove }: FilterChipProps) {
  return (
    <span className="e-filter">
      {children}
      <button type="button" aria-label={`Remover filtro ${children}`} onClick={onRemove}>
        <Icon name="x" size={12} />
      </button>
    </span>
  );
}
