import { Icon } from "./Icon";
import { SideNav } from "./SideNav";
import type { SideNavItem } from "./SideNav";
import { UserMenu } from "./UserMenu";
import type { UserMenuItem } from "./UserMenu";

export interface AppSidebarUser {
  name: string;
  role: string;
  photo?: string;
  items?: UserMenuItem[];
}

export interface AppSidebarFooterItem {
  label: string;
  icon: string;
  onClick?: () => void;
}

export interface AppSidebarProps {
  logo?: string;
  name?: string;
  sub?: string;
  navTitle?: string;
  items: SideNavItem[];
  value?: string;
  onChange?: (v: string) => void;
  footerItems?: AppSidebarFooterItem[];
  user?: AppSidebarUser;
  onSair?: () => void;
  /** abaixo de 1024px a sidebar vira gaveta (ver RESPONSIVO.md); controle a visibilidade por aqui */
  open?: boolean;
  onClose?: () => void;
}

/**
 * Faça: abaixo de 1024px passe `open`/`onClose` para virar gaveta (já estilizado por `.e-sidebar[data-open]`).
 * Não faça: esconder o cartão do usuário no rodapé — "Sair" precisa estar sempre alcançável.
 */
export function AppSidebar({
  logo,
  name = "Conecta+",
  sub = "Painel de gestão",
  navTitle,
  items,
  value,
  onChange,
  footerItems = [],
  user,
  onSair,
  open,
  onClose,
}: AppSidebarProps) {
  return (
    <>
      {open && <div className="e-scrim" onClick={onClose} style={{ zIndex: 19 }} />}
      <aside className="e-sidebar" aria-label="Menu principal" data-open={open}>
        <div className="e-sidebar__brand">
          {logo && (
            <span className="e-sidebar__logo">
              <img src={logo} alt="" style={{ width: 32, height: 32, objectFit: "contain" }} />
            </span>
          )}
          <span>
            <span className="e-sidebar__name" style={{ display: "block" }}>
              {name}
            </span>
            <span className="e-sidebar__sub">{sub}</span>
          </span>
        </div>
        <div className="e-sidebar__nav">
          <SideNav title={navTitle} items={items} value={value} onChange={onChange} />
        </div>
        <div className="e-sidebar__foot">
          {footerItems.map((f) => (
            <button key={f.label} type="button" className="e-nav__item" onClick={f.onClick}>
              <Icon name={f.icon} size={16} />
              <span className="e-nav__label">{f.label}</span>
            </button>
          ))}
          {user && <UserMenu {...user} onSair={onSair} />}
        </div>
      </aside>
    </>
  );
}
