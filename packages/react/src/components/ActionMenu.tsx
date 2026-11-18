import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

export type ActionItem = { label: string; icon: string; danger?: boolean; onClick?: () => void } | "-";

export interface ActionMenuProps {
  items: ActionItem[];
  label?: string;
}

/**
 * Faça: use para 2–6 ações secundárias de uma linha/card; marque ações destrutivas com `danger`.
 * Não faça: colocar a ação mais usada só aqui — se for a principal, vire um Button visível.
 */
export function ActionMenu({ items, label = "Mais ações" }: ActionMenuProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node) && !buttonRef.current?.contains(e.target as Node)) {
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

  return (
    <span className="e-actions">
      <button
        ref={buttonRef}
        type="button"
        className="e-iconbtn"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <Icon name="ellipsis" size={16} />
      </button>
      {open && (
        <div ref={menuRef} role="menu" className="e-menu">
          {items.map((m, i) =>
            m === "-" ? (
              <div key={i} className="e-menu__sep" />
            ) : (
              <button
                key={i}
                type="button"
                role="menuitem"
                className={`e-menu__item${m.danger ? " e-menu__item--danger" : ""}`}
                onClick={() => {
                  setOpen(false);
                  m.onClick?.();
                }}
              >
                <Icon name={m.icon} size={15} />
                {m.label}
              </button>
            ),
          )}
        </div>
      )}
    </span>
  );
}
