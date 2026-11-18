export interface AvatarProps {
  src?: string;
  name?: string;
  size?: 18 | 24 | 30 | 36 | 64 | number;
}

/**
 * Faça: quando não houver foto, as iniciais (até 2 letras) já cobrem o caso — não é preciso placeholder genérico.
 * Não faça: usar sem `name` — sem nome não há como gerar iniciais nem `aria-hidden` correto.
 */
export function Avatar({ src, name = "", size = 36 }: AvatarProps) {
  const iniciais = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0])
    .join("")
    .toUpperCase();

  return (
    <span
      className="e-avatar"
      style={{ width: size, height: size, fontSize: Math.round(size * 0.38) }}
      aria-hidden={!!name}
    >
      {src ? <img src={src} alt="" /> : iniciais}
    </span>
  );
}
