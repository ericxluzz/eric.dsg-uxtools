import { Icon } from "./Icon";

export interface NotificationBellProps {
  count?: number;
  open?: boolean;
  onClick?: () => void;
}

/**
 * Faça: mostre "9+" acima de 9 avisos; o número some quando `count` é 0.
 * Não faça: usar cor sozinha para indicar não lidos — o contador numérico já é o sinal.
 */
export function NotificationBell({ count = 0, open, onClick }: NotificationBellProps) {
  return (
    <button
      type="button"
      className="e-iconbtn e-bell"
      aria-label={count ? `${count} avisos novos` : "Avisos"}
      aria-haspopup="dialog"
      aria-expanded={!!open}
      onClick={onClick}
    >
      <Icon name="bell" size={17} />
      {count > 0 && (
        <span className="e-bell__count" aria-hidden="true">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}
