# Componentes ERIC · especificação

Props detalhadas: `referencia/components/<pasta>/<Nome>.d.ts`. Exemplos de uso: `.prompt.md`. Classes e medidas exatas: `referencia/tokens/components.css` (prefixo `.e-`).

| Pasta | Componente | Props principais | Estados a implementar | Acessibilidade |
| --- | --- | --- | --- | --- |
| core | Icon | name, size=16, stroke=1.5, label? | — | Decorativo aria-hidden; com label vira role=img |
| forms | Button | variant primary|secondary|soft|ghost|success|danger|danger-ghost, size sm|md|lg|xl, icon, iconRight, block | normal, hover, foco, pressionado, desabilitado, carregando | <button>; nowrap; um primário por área |
| forms | IconButton | icon, label (obrigatório), variant outline|danger, size sm|md | normal, hover, foco, desabilitado | aria-label + title |
| forms | TextField | label, icon, required, help, error, size md|lg, multiline | normal, hover, foco, preenchido, desabilitado, erro | <label> real; aria-invalid; aria-describedby |
| forms | FloatingField | label + props de input | normal, foco | Rótulo interno 11px |
| forms | Select | label, value, options, onChange, placeholder | fechado, aberto, foco, item marcado, desabilitado | listbox; setas; Esc |
| forms | Switch | checked, onChange, children | on, off, foco, desabilitado | role=switch aria-checked |
| forms | Checkbox | children + props de input | marcado, desmarcado, foco, desabilitado | accent-color primário |
| forms | Segmented | options{value,label,icon}, value, onChange, label | selecionado, normal, foco | radiogroup/radio |
| forms | SearchField | placeholder, shortcut="/" | normal, foco | type=search; atalho / foca |
| forms | ChoiceChips | options, value, onChange, multi | normal, hover, marcado, foco | radio (único) ou aria-pressed (múltiplo) |
| forms | FormSection | n, title, sub, footer | — | <section> com <h2> |
| forms | PhotoUpload | photos, max=5, onAdd, onRemove | vazio, com fotos, máximo | Remover com aria-label |
| forms | FileAttach | files{name,size,progress,error}, accept | vazio, arrastando, enviando, pronto, erro | input file real |
| forms | DatePicker | label, value, onChange, today | fechado, aberto, hoje, selecionado, fora do mês | dialog; grade navegável por setas; dd/mm/aaaa |
| forms | FilterChip | children, onRemove | normal, hover no x | Remover com aria-label |
| feedback | StatusBadge | tone ok|warn|info|bad|neu, icon, dot | — | Texto sempre presente |
| feedback | StageBadge | stage triagem|vistoria|execucao|conclusao | — | — |
| feedback | Count | n, active, alert, label | normal, ativo, alerta | aria-label quando sozinho |
| feedback | Callout | tone, flush, icon | info, warn, ok, bad | role=note / alert |
| feedback | Toast | tone | entra, some em 3–4 s | role=status aria-live=polite |
| feedback | EmptyState | icon, title, children, action | — | — |
| feedback | LiveIndicator | children="Tempo real" | pulsando | Não interativo |
| feedback | NotificationBell | count, open, onClick | sem aviso, com contador, 9+ | aria-label com a contagem |
| feedback | NotificationPanel | items{title,sub,time,tone,unread}, onReadAll, onItem | lido, não lido (tint + ponto) | dialog |
| feedback | Timeline | items{t,q,who} | — | <ol> |
| feedback | Tooltip | text, children | oculto, visível (300 ms) | role=tooltip + aria-describedby |
| feedback | Banner | tone info|warn|bad, action, onClose | — | status / alert |
| feedback | Loading | Spinner, Skeleton{w,h,r}, ProgressBar{value} | — | progressbar com aria-valuenow |
| surfaces | Card | title, actions, pad, active, hover | normal, ativo (1,5px primário), hover clicável | <section> |
| surfaces | Kpi | label, value, delta, tone | — | — |
| surfaces | DataTable | columns{key,label,width,render}, rows, onRow | hover de linha, vazio, carregando | role=table; < 600 vira cartões |
| surfaces | QueueRow | kicker, title, sub, badges, action, bar | normal, hover, atrasada (barra 3px) | — |
| surfaces | Avatar | src, name, size | foto, iniciais | alt="" quando o nome está ao lado |
| surfaces | ProgressSegments | total, done, state on|ok|warn | — | progressbar |
| surfaces | Meter | label, value, pct, late, goal | — | Valor em texto |
| navigation | Tabs | tabs{value,label,count,dot}, value, onChange | normal, hover, selecionada, foco | tablist; rola na horizontal |
| navigation | SideNav | title, items{value,label,icon,count}, value | normal, hover, atual | <nav>; aria-current=page |
| navigation | UserMenu | name, role, photo, items, onSair | fechado, aberto | aria-haspopup=menu; Sair leva ao login |
| navigation | Stepper | steps, current | concluída, atual, futura | <ol>; aria-current=step |
| navigation | Topbar | children, right | — | <header> |
| navigation | ActionMenu | items | "-", label | fechado, aberto | menu; Esc; destrutivo por último |
| navigation | Pagination | page, pages, total, perPage, onChange | atual, desabilitado | <nav aria-label="Paginação"> |
| layout | AppSidebar | logo, name, sub, navTitle, items, footerItems, user, onSair | fixa, gaveta (< 1024) | <aside> |
| layout | PageHeader | kicker, title, desc, actions, back | — | Um <h1> por tela |
| overlays | Dialog | open, title, sub, icon, tone, footer, onClose | aberto | dialog aria-modal; foco preso; Esc |
| overlays | Drawer | open, title, footer, onClose | aberto | dialog aria-modal |
| canvas | FlowCanvas | toolbar, zoom, onZoomIn/Out/Fit, height | — | Barra de ferramentas com role=toolbar |
| canvas | FlowNode / FlowEdge / AddStep | n, title, prazo, setor, tags, selected | normal, hover, selecionado | aria-pressed |
| charts | ChartCard + 8 gráficos | title, sub, summary, table, source | gráfico, tabela | role=img + resumo; "Ver dados" |
| mobile | MobileHeader | title, onBack, action | — | Voltar 44×44 |
| mobile | BottomNav | items{value,label,icon}, value | atual | <nav>; aria-current |
| mobile | StickyAction / MobileButton | children, secondary | — | Acima do teclado e da safe-area |
| mobile | BottomSheet | open, title, onClose | aberto | dialog aria-modal; arrastar para fechar |

## Medidas de referência por classe (`components.css`)
- `.e-btn`: h34, padding 0 14, raio 8, 13/600, gap 6. `--sm` h28/12px; `--lg` h40/14px; `--xl` h46, raio 10.
- `.e-input`: h34, padding 0 10, raio 8, borda 1px `--c-field-bd`, 13px.
- `.e-badge`: h22, padding 0 10, pílula, borda 1px, 12/600.
- `.e-tab`: padding 13 10 11, 13px; ativa = `inset 0 -2px 0 var(--c-primary)`.
- `.e-table__head`: h36, 11/600, maiúsculas, espaçamento .08em. `.e-table__row`: min-h 52, 13px.
- `.e-dialog`: 600px, raio 14. Cabeçalho com padding 18 20 6. Rodapé com padding 12 20, fundo `--c-surface-2`.
- `.e-drawer`: 520px, borda esquerda 1px.
- `.e-node`: 300px, padding 10 12, raio 12; selecionado com borda 2px `--c-link`.
- `.e-m-button`: h54, raio 14, 16/600. `.e-m-field`: h52, raio 14, 16px.
