# ERIC · Acessibilidade (WCAG 2.2 AA)

## Contraste (verificado nos dois temas — ver `guidelines/contrast.html`)
- Texto normal ≥ 4,5:1; texto ≥ 18px/600 ≥ 3:1; bordas de campo, ícones de controle e foco ≥ 3:1.
- Claro: text/surface 17,4 · text-2/surface 6,7 · text-2/page 5,7 · link/surface 5,8 · branco/primary 5,8 · ok 4,8 · warn 6,1 · info 6,2 · bad 5,3 · field-bd 3,4.
- Escuro: text/surface 14,2 · text-2/surface 7,5 · link/surface 8,1 · branco/primary 4,9 · ok 9,9 · warn 9,2 · info 8,8 · bad 8,5 · field-bd 4,8.
- Bordas de card (`--c-border`) são decorativas (separação vem também do fundo); não usar como único limite de controle.
- Desabilitado é isento, mas sempre acompanhado de `disabled`/`aria-disabled` e motivo próximo.
- Cor nunca é o único sinal: selo sempre tem texto; ponto de etapa sempre tem rótulo.

## Teclado e foco
- Todo interativo alcançável por Tab, na ordem visual; foco visível 2px `--c-focus` offset 2px.
- Diálogo/drawer: `role="dialog"` + `aria-modal`, foco preso, Esc fecha, foco volta ao gatilho.
- Menus: `aria-haspopup`, `aria-expanded`, setas navegam, Esc fecha.
- Abas: `role="tablist/tab"`, `aria-selected`; switch `role="switch"` + `aria-checked`; segmentado `role="radiogroup/radio"`.

## Semântica
- Um `h1` por tela; títulos em ordem. Navegação em `<nav>` com `aria-label`; item atual `aria-current="page"`.
- Campos com `<label>` real; erro em `aria-describedby` + `aria-invalid`.
- Botão só com ícone: `aria-label` + `title`. Ícone decorativo `aria-hidden`.
- Toast `role="status" aria-live="polite"`; erro bloqueante `role="alert"`.
- Imagens com `alt`; avatar decorativo `alt=""` quando o nome está ao lado.

## Toque, zoom e movimento
- Alvo ≥ 44×44 no mobile (24×24 mínimo no desktop com espaçamento).
- Campos 16px no mobile (sem zoom no iOS). Layout funciona até 200% de zoom e em 320px de largura.
- `prefers-reduced-motion` zera animações. Nada pisca mais que 3×/s.
- Idioma: `<html lang="pt-BR">`.
