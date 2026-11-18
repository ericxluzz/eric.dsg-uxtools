import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { Icon } from "./Icon";
import { cx } from "../internal/cx";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "soft"
  | "ghost"
  | "success"
  | "danger"
  | "danger-ghost";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** ícone Lucide à esquerda */
  icon?: string;
  /** ícone Lucide à direita (ex. chevron-right) */
  iconRight?: string;
  block?: boolean;
}

/**
 * Faça: use um verbo no texto ("Receber", "Devolver"). No máximo um botão primário por tela.
 * Não faça: "OK"/"Sim"/"Não" como texto; sombra ou degradê; quebra de linha (o texto já usa nowrap+ellipsis).
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", icon, iconRight, block, children, className, type = "button", ...rest },
  ref,
) {
  const iconSize = size === "sm" ? 14 : 16;
  return (
    <button
      ref={ref}
      type={type}
      className={cx(
        "e-btn",
        `e-btn--${variant}`,
        size !== "md" && `e-btn--${size}`,
        block && "e-btn--block",
        className,
      )}
      {...rest}
    >
      {icon && <Icon name={icon} size={iconSize} />}
      {children}
      {iconRight && <Icon name={iconRight} size={iconSize} />}
    </button>
  );
});
