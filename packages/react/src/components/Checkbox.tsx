import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
}

/**
 * Faça: envolva sempre em `<label>` (já incluso) para que o toque no texto marque o campo.
 * Não faça: usar para uma ação única (prefira Switch); omitir o texto que descreve a opção.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { children, ...rest },
  ref,
) {
  return (
    <label className="e-check">
      <input ref={ref} type="checkbox" {...rest} />
      {children}
    </label>
  );
});
