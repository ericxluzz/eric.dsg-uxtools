import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "children"> {
  checked?: boolean;
  onChange?: (v: boolean) => void;
  children?: ReactNode;
}

/**
 * Faça: controlar com `checked`/`onChange`; o texto ao lado descreve o efeito, não o estado ("Notificar por e-mail").
 * Não faça: usar para ações assíncronas sem feedback — se a troca falhar, volte o estado anterior.
 */
export function Switch({ checked, onChange, children, ...rest }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={!!checked}
      className="e-switch"
      onClick={() => onChange?.(!checked)}
      {...rest}
    >
      <span className="e-switch__track">
        <span className="e-switch__thumb" />
      </span>
      {children}
    </button>
  );
}
