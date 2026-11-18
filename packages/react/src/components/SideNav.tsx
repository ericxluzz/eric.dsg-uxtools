import { Icon } from "./Icon";
import { Count } from "./Count";

export interface SideNavItem {
  value: string;
  label: string;
  icon: string;
  count?: number;
}

export interface SideNavProps {
  title?: string;
  items: SideNavItem[];
  value?: string;
  onChange?: (v: string) => void;
}

/**
 * Faça: marque o item atual com `aria-current="page"` (já incluso); agrupe com `title` quando houver várias seções.
 * Não faça: usar para mais de ~10 itens sem agrupar — nesse caso divida em títulos de grupo.
 */
export function SideNav({ title, items, value, onChange }: SideNavProps) {
  return (
    <nav className="e-nav">
      {title && <div className="e-nav__title">{title}</div>}
      {items.map((n) => (
        <button
          key={n.value}
          type="button"
          className="e-nav__item"
          aria-current={n.value === value ? "page" : undefined}
          onClick={() => onChange?.(n.value)}
        >
          <Icon name={n.icon} size={16} />
          <span className="e-nav__label">{n.label}</span>
          {n.count ? <Count n={n.count} active={n.value === value} /> : null}
        </button>
      ))}
    </nav>
  );
}
