import * as RadixDialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

export interface DrawerProps {
  open: boolean;
  title: string;
  children?: ReactNode;
  footer?: ReactNode;
  onClose?: () => void;
}

/**
 * Faça: use para edição/detalhe que mantém o contexto da lista atrás; 520px à direita, foco preso, Esc fecha.
 * Não faça: usar para confirmações curtas (prefira Dialog); empilhar mais de um Drawer.
 */
export function Drawer({ open, title, children, footer, onClose }: DrawerProps) {
  return (
    <RadixDialog.Root open={open} onOpenChange={(next) => !next && onClose?.()}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="e-scrim" />
        <RadixDialog.Content className="e-drawer" aria-label={title}>
          <div className="e-drawer__head">
            <RadixDialog.Title asChild>
              <h2 className="e-dialog__title e-nowrap" style={{ flex: 1 }}>
                {title}
              </h2>
            </RadixDialog.Title>
            <RadixDialog.Close asChild>
              <button className="e-iconbtn" aria-label="Fechar">
                <Icon name="x" size={16} />
              </button>
            </RadixDialog.Close>
          </div>
          <div className="e-drawer__body">{children}</div>
          {footer && <div className="e-drawer__foot">{footer}</div>}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
