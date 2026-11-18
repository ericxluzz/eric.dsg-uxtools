import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";

export interface FloatingFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

/**
 * Faça: use em formulários curtos (login) onde o rótulo pode ficar compacto acima do valor.
 * Não faça: usar sem `label` real — a legenda nunca pode depender só do placeholder.
 */
export const FloatingField = forwardRef<HTMLInputElement, FloatingFieldProps>(function FloatingField(
  { label, id, ...rest },
  ref,
) {
  const autoId = useId();
  const fid = id || autoId;
  return (
    <label className="e-float" htmlFor={fid}>
      <span className="e-float__label">{label}</span>
      <input ref={ref} id={fid} className="e-float__input" {...rest} />
    </label>
  );
});
