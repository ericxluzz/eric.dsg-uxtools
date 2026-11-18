import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { Icon } from "./Icon";

export interface SearchFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  shortcut?: string;
}

/**
 * Faça: use como busca global da topbar (máximo 420–520px); atalho "/" visível quando fizer sentido.
 * Não faça: usar sem `aria-label`/placeholder descritivo — o rótulo visível vem do próprio placeholder.
 */
export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(function SearchField(
  { placeholder = "Buscar protocolo, endereço ou nome", shortcut = "/", ...rest },
  ref,
) {
  return (
    <label className="e-search">
      <Icon name="search" size={15} />
      <input ref={ref} type="search" placeholder={placeholder} aria-label={placeholder} {...rest} />
      {shortcut && <span className="e-kbd">{shortcut}</span>}
    </label>
  );
});
