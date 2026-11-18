import { icons } from "lucide-react";
import type { CSSProperties } from "react";

export interface IconProps {
  /** nome Lucide em kebab-case, ex. "map-pin" */
  name: string;
  size?: number;
  stroke?: number;
  label?: string;
  className?: string;
  style?: CSSProperties;
}

function toPascalCase(kebab: string): string {
  return kebab
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

export function Icon({ name, size = 16, stroke = 1.5, style, className, label }: IconProps) {
  const LucideIcon = icons[toPascalCase(name) as keyof typeof icons];
  if (!LucideIcon) {
    console.warn(`[@eric/react] Icon: ícone Lucide "${name}" não encontrado.`);
    return null;
  }
  return (
    <LucideIcon
      size={size}
      strokeWidth={stroke}
      style={style}
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : "true"}
    />
  );
}
