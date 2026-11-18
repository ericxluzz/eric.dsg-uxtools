import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { Avatar } from "./Avatar";

export interface UserMenuItem {
  label: string;
  icon: string;
  onClick?: () => void;
}

export interface UserMenuProps {
  name: string;
  role: string;
  photo?: string;
  items?: UserMenuItem[];
  onSair?: () => void;
}

/**
 * Faça: "Sair" sempre em vermelho, separado por divisor, como último item.
 * Não faça: remover a confirmação de sessão encerrada no fluxo de `onSair` (ver README · Sessão).
 */
export function UserMenu({ name, role, photo, items = [], onSair }: UserMenuProps) {
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
    <div style={{ position: "relative" }}>
      {open && (
        <div ref={menuRef} role="menu" className="e-menu e-menu--up" style={{ zIndex: 39, padding: 6 }}>
          {items.map((m) => (
            <button
              key={m.label}
              type="button"
              role="menuitem"
              className="e-menu__item"
              onClick={() => {
                setOpen(false);
                m.onClick?.();
              }}
            >
              <Icon name={m.icon} size={16} />
              {m.label}
            </button>
          ))}
          <div className="e-menu__sep" />
          <button
            type="button"
            role="menuitem"
            className="e-menu__item e-menu__item--danger"
            onClick={() => {
              setOpen(false);
              onSair?.();
            }}
          >
            <Icon name="log-out" size={16} />
            Sair
          </button>
        </div>
      )}
      <button
        ref={buttonRef}
        type="button"
        className="e-user"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <Avatar src={photo} name={name} />
        <span style={{ flex: 1, minWidth: 0 }}>
          <span className="e-nowrap" style={{ display: "block", fontSize: 13, fontWeight: 600 }}>
            {name}
          </span>
          <span className="e-nowrap" style={{ display: "block", fontSize: 11, color: "var(--c-text-2)" }}>
            {role}
          </span>
        </span>
        <Icon name="chevrons-up-down" size={14} />
      </button>
    </div>
  );
}
