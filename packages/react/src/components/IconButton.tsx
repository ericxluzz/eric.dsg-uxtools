import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { Icon } from "./Icon";
import { cx } from "../internal/cx";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  /** obrigatório: rótulo acessível (lido por leitor de tela) */
  label: string;
  variant?: "outline" | "danger";
  size?: "sm" | "md";
}

/**
 * Faça: sempre passe `label` (vira aria-label e title) — o ícone sozinho não é acessível.
 * Não faça: usar sem `label`; usar para ação primária da tela (prefira Button com texto).
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, label, variant, size = "md", className, type = "button", ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      title={label}
      className={cx(
        "e-iconbtn",
        variant && `e-iconbtn--${variant}`,
        size === "sm" && "e-iconbtn--sm",
        className,
      )}
      {...rest}
    >
      <Icon name={icon} size={size === "sm" ? 14 : 16} />
    </button>
  );
});
