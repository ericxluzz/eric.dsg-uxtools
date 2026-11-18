import * as RadixDialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

export interface DialogProps {
  open: boolean;
  title: string;
  sub?: string;
  icon?: string;
  tone?: "bad";
  children?: ReactNode;
  footer?: ReactNode;
  onClose?: () => void;
}

/**
 * Faça: título em forma de pergunta ("Devolver à Central?"); Cancelar à esquerda, ação com verbo à direita;
 * ação destrutiva em `--c-bad-solid` (use `tone="bad"` no ícone de cabeçalho quando fizer sentido).
 * Não faça: empilhar diálogos (um de cada vez); usar para confirmações triviais sem risco real.
 */
export function Dialog({ open, title, sub, icon, tone, children, footer, onClose }: DialogProps) {
  const bg = tone === "bad" ? "var(--c-bad-bg)" : "var(--c-soft)";
  const fg = tone === "bad" ? "var(--c-bad-fg)" : "var(--c-strong)";

  return (
    <RadixDialog.Root open={open} onOpenChange={(next) => !next && onClose?.()}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="e-scrim" />
        <RadixDialog.Content className="e-dialog">
          <div className="e-dialog__head">
            {icon && (
              <span
                style={{
                  flex: "none",
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  display: "grid",
                  placeItems: "center",
                  background: bg,
                  color: fg,
                }}
              >
                <Icon name={icon} size={20} />
              </span>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <RadixDialog.Title className="e-dialog__title">{title}</RadixDialog.Title>
              {sub && (
                <RadixDialog.Description style={{ margin: "4px 0 0", fontSize: 13, color: "var(--c-text-2)" }}>
                  {sub}
                </RadixDialog.Description>
              )}
            </div>
            <RadixDialog.Close asChild>
              <button className="e-iconbtn" aria-label="Fechar">
                <Icon name="x" size={16} />
              </button>
            </RadixDialog.Close>
          </div>
          {children && <div className="e-dialog__body">{children}</div>}
          {footer && <div className="e-dialog__foot">{footer}</div>}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
