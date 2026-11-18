# Plano de implementação · ERIC

Monorepo sugerido (pnpm + Turborepo):
```
packages/tokens   → @eric/tokens   (CSS vars, JSON, Tailwind preset)
packages/icons    → @eric/icons    (reexporta lucide-react com strokeWidth 1.5 e tamanhos ERIC)
packages/react    → @eric/react    (componentes, React 18 + TS, CSS Modules ou vanilla-extract lendo os vars)
packages/charts   → @eric/charts   (gráficos SVG próprios, sem lib pesada)
packages/flutter  → eric_flutter   (tema + widgets)
apps/docs         → site de docs (Storybook 8 ou Next.js + MDX)
```

## Fase 0 · Base (1 semana)
- [ ] Monorepo, lint, Prettier e TS estrito.
- [ ] CI com build, testes e Chromatic/Playwright para regressão visual.
- [ ] Publicação interna (npm privado / pub.dev privado).
- **Aceite:** `pnpm build` passa e o Storybook sobe vazio com Poppins.

## Fase 1 · Tokens (1 semana)
- [ ] Copiar `referencia/tokens/*.css` para `@eric/tokens`. Gerar `tokens.json`, preset Tailwind e `eric_tokens.dart` **a partir do CSS** por script (Style Dictionary). Não editar à mão.
- [ ] `ThemeProvider` + hook `useTema()` (claro padrão, salvo em `localStorage['eric-tema']`).
- [ ] **Teste de contraste no CI.** Os 19 pares da seção Contraste, nos dois temas: texto ≥ 4,5 e borda/foco ≥ 3. Se falhar, o build quebra.
- **Aceite:** a página Cores das docs mostra hex claro/escuro lidos em runtime e o teste de contraste roda verde.

## Fase 2 · Núcleo de componentes (2–3 semanas)
- **Ordem:** Icon → Button/IconButton → TextField/FloatingField → Select → Switch/Checkbox/Segmented → StatusBadge/StageBadge/Count → Callout/Toast → Card/Kpi → Tabs → DataTable → Dialog/Drawer.
- **Cada componente entrega:**
  - props tipadas conforme o `.d.ts` da referência
  - stories de **todos os estados** (normal, hover, foco, ativo, desabilitado, erro/carregando)
  - bloco Faça/Não faça
  - teste de a11y com axe
  - teste de teclado
- Usar Radix UI (ou React Aria) por baixo de Select, Dialog, Drawer, menus, Tabs e Tooltip, por causa do foco e do ARIA. A aparência é 100% ERIC.
- **Aceite:** zero violações axe, navegação completa por teclado e snapshot visual aprovado.

## Fase 3 · Complementares e layout (2 semanas)
- Componentes: SearchField, ChoiceChips, FormSection, PhotoUpload, FileAttach, DatePicker (date-fns pt-BR, semana começa no domingo), FilterChip, Pagination, Banner, Tooltip, ActionMenu, Spinner/Skeleton/ProgressBar, NotificationBell/Panel, Timeline, Meter, QueueRow, Avatar, ProgressSegments, Stepper, SideNav, UserMenu, Topbar, AppSidebar, PageHeader.
- Responsivo conforme `RESPONSIVO.md` (sidebar vira gaveta abaixo de 1024; tabela vira cartões abaixo de 600).
- **Aceite:** o template "App shell" das docs funciona em 375, 768, 1024, 1440 e 1920 sem quebra de linha proibida.

## Fase 4 · Canvas e gráficos (2 semanas)
- **Canvas:** FlowCanvas/FlowNode/FlowEdge/AddStep. Usar React Flow por baixo, com nós e arestas no visual ERIC: fundo pontilhado de 18px em `--c-dot`, nó de 300px com raio 12 e seleção com 2px `--c-link`. Inspector de 320–400px.
- **Gráficos:** `@eric/charts` com os 8 tipos da referência (LineChart, Sparkline, Grouped bars, RankBars, StackedBars 100%, Heatmap, Funnel, Dumbbell, Bullet), todos dentro de `ChartCard` com "Ver dados" + `role="img"`.
- **Aceite:** cada gráfico tem story com dados reais, alternância para tabela e leitura por leitor de tela.

## Fase 5 · Mobile / Flutter (2 semanas)
- Usar `eric_tokens.dart` + `ericTheme()`.
- **Widgets:** EricHeader (56), EricBottomNav (NavigationBar 64, indicador `soft`), EricStickyAction (54, raio 14), EricBottomSheet (raio 20, alça), EricCard (raio 16, borda, elevation 0), EricField (52, fonte 16), EricStatusBadge, EricProgressSegments.
- **Aceite:** golden tests claro/escuro e alvo de toque ≥ 44 verificado.

## Fase 6 · Docs e helpers (1 semana)
- Site com as 24 seções da referência, busca de ícones e cópia de código.
- `@eric/format`: `formatData`, `formatHora`, `formatRelativo` ("há 2 h"), `formatPrazo` ("Atrasada · venceu 29/10"), `formatMoeda`, `mascararCPF`, `mascararTelefone`, `formatProtocolo` (tabela em `FORMATOS.md`).
- Mensagens padrão (`MENSAGENS.md`) num arquivo i18n pt-BR.

## Fase 7 · Adoção
- Migrar o painel do Conecta+ (`conecta/gestao`) para `@eric/react` tela a tela, começando pela fila da Central.
- Os PRs devem seguir o `CLAUDE.md`.

## Definição de pronto (todo componente)
- Só usa tokens `var(--c-*)` / `--e-*`, sem hex solto.
- Sem `box-shadow` decorativo nem `linear-gradient`.
- Texto de botão, selo, aba, célula e menu com nowrap + ellipsis.
- Foco visível; operável por teclado; axe sem erros; claro e escuro conferidos.
- Props e exemplos na doc; changelog atualizado.
