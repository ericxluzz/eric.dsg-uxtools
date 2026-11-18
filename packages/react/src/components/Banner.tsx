import type { ReactNode } from "react";
import { Icon } from "./Icon";

export type BannerTone = "info" | "warn" | "bad";

export interface BannerProps {
  tone?: BannerTone;
  children: ReactNode;
  action?: ReactNode;
  onClose?: () => void;
}

const ICONE: Record<BannerTone, string> = { info: "info", warn: "triangle-alert", bad: "circle-x" };

/**
 * Faça: use no topo da tela/seção para avisos persistentes (manutenção, prazo, bloqueio).
 * Não faça: usar para feedback de uma ação pontual — prefira Toast.
 */
export function Banner({ tone = "info", children, action, onClose }: BannerProps) {
  return (
    <div role={tone === "bad" ? "alert" : "status"} className={`e-banner e-banner--${tone}`}>
      <Icon name={ICONE[tone]} size={16} />
      <span className="e-banner__text">{children}</span>
      {action}
      {onClose && (
        <button
          type="button"
          className="e-iconbtn e-iconbtn--sm"
          style={{ color: "inherit" }}
          aria-label="Fechar aviso"
          onClick={onClose}
        >
          <Icon name="x" size={14} />
        </button>
      )}
    </div>
  );
}
