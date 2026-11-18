import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { Icon } from "./Icon";
import { cx } from "../internal/cx";

type NativeInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size">;

export interface TextFieldProps extends NativeInputProps {
  label: string;
  icon?: string;
  required?: boolean;
  help?: string;
  error?: string;
  size?: "md" | "lg";
  multiline?: boolean;
}

/**
 * Faça: rótulo sempre visível acima; valide ao sair do campo e ao enviar; leve o foco ao 1º erro.
 * Não faça: usar placeholder como rótulo; mostrar erro sem ícone `circle-alert`.
 */
export const TextField = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps>(
  function TextField(
    { label, icon, required, help, error, size, multiline, id, className, ...rest },
    ref,
  ) {
    const autoId = useId();
    const fid = id || autoId;
    const descId = error || help ? `${fid}-d` : undefined;

    const fieldProps = {
      id: fid,
      className: cx("e-input", size === "lg" && "e-input--lg"),
      "aria-invalid": error ? ("true" as const) : undefined,
      "aria-required": required || undefined,
      "aria-describedby": descId,
      ...rest,
    };

    return (
      <label className={cx("e-field", className)} htmlFor={fid}>
        <span className="e-field__label">
          {icon && <Icon name={icon} size={13} style={{ color: "var(--c-link)" }} />}
          {label}
          {required && (
            <span className="e-field__req" aria-hidden="true">
              *
            </span>
          )}
        </span>
        {multiline ? (
          <textarea ref={ref as never} {...(fieldProps as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
        ) : (
          <input ref={ref as never} {...(fieldProps as InputHTMLAttributes<HTMLInputElement>)} />
        )}
        {error ? (
          <span id={descId} className="e-field__err">
            <Icon name="circle-alert" size={13} />
            {error}
          </span>
        ) : help ? (
          <span id={descId} className="e-field__help">
            {help}
          </span>
        ) : null}
      </label>
    );
  },
);
