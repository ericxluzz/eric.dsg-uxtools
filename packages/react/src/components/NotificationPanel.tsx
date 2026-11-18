import { Icon } from "./Icon";

export type NotificationTone = "ok" | "warn" | "info" | "bad";

export interface NotificationItem {
  title: string;
  sub?: string;
  time: string;
  tone?: NotificationTone;
  icon?: string;
  unread?: boolean;
}

export interface NotificationPanelProps {
  items: NotificationItem[];
  onReadAll?: () => void;
  onItem?: (n: NotificationItem) => void;
}

const TOM: Record<NotificationTone, [string, string, string]> = {
  ok: ["circle-check", "var(--c-ok-bg)", "var(--c-ok-fg)"],
  warn: ["clock", "var(--c-warn-bg)", "var(--c-warn-fg)"],
  info: ["inbox", "var(--c-info-bg)", "var(--c-info-fg)"],
  bad: ["alarm-clock", "var(--c-bad-bg)", "var(--c-bad-fg)"],
};

/**
 * Faça: destaque não lidos com `unread` (ponto + fundo); ofereça "Marcar todos como lidos" sempre visível.
 * Não faça: remover o item da lista ao ler — ele continua lá, só perde o destaque de não lido.
 */
export function NotificationPanel({ items, onReadAll, onItem }: NotificationPanelProps) {
  return (
    <div className="e-notif" role="dialog" aria-label="Avisos">
      <div className="e-notif__head">
        <span style={{ fontSize: 14, fontWeight: 600 }}>Avisos</span>
        <button type="button" className="e-btn e-btn--ghost e-btn--sm" onClick={onReadAll}>
          Marcar todos como lidos
        </button>
      </div>
      <div style={{ maxHeight: 380, overflow: "auto" }}>
        {items.map((n, i) => {
          const [icone, bg, fg] = TOM[n.tone || "info"];
          return (
            <button
              key={i}
              type="button"
              className={`e-notif__item${n.unread ? " e-notif__item--unread" : ""}`}
              onClick={() => onItem?.(n)}
            >
              <span className="e-notif__icon" style={{ background: bg, color: fg }}>
                <Icon name={n.icon || icone} size={16} />
              </span>
              <span style={{ minWidth: 0 }}>
                <span className="e-notif__title" style={{ display: "block" }}>
                  {n.title}
                </span>
                <span className="e-notif__sub">{n.sub}</span>
              </span>
              <span className="e-notif__time">
                {n.time}
                {n.unread && (
                  <span className="e-notif__dot">
                    <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>
                      não lido
                    </span>
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
