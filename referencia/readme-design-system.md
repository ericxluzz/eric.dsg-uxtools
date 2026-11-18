# ERIC Design System

Padrão visual e de UX do **Eric**, extraído do projeto **Conecta+** (atendimento ao cidadão para prefeituras: Central de Triagem, setores, equipes de campo, portal do cidadão, PWA e apps Flutter). Tudo que existe hoje no Conecta+ está aqui como padrão: tokens, regras, componentes, protótipos e documentação.

**Página principal:** `Eric Design System.dc.html`, com todas as regras de UX/UI, acessibilidade, tokens claro/escuro, contraste calculado ao vivo e catálogo de componentes.

## Fontes
- Projeto de origem: "Zeladoria protótipos base", pasta `conecta/` (painel `gestao/Painel de Gestao.dc.html`, `portal/`, `apps/`, `video/`, `docs/`).
- Tokens de origem: `conecta/gestao/conecta-theme.js`. Regras de origem: `CLAUDE.md`, `docs/VISUAL.md`, `docs/REGRAS.md`.
- Cópia integral em `ui_kits/` e `guidelines/conecta-docs/`.

## Índice
| Caminho | O que é |
| --- | --- |
| `styles.css` | Ponto de entrada. Só `@import`. Linke só este arquivo. |
| `tokens/` | `borders.css` (predefinições de borda e barras), `colors.css` (claro em `:root`, escuro em `[data-tema="escuro"]`), `typography.css`, `spacing.css`, `radius.css`, `sizes.css`, `motion.css`, `base.css`, `components.css` (classes `.e-*`), `fonts.css` |
| `components/` | 55 componentes React (inclui `mobile/`: MobileHeader, BottomNav, StickyAction, BottomSheet; complementares: Tooltip, ActionMenu, DatePicker, FileAttach, Banner, Pagination, Loading, FilterChip): `core/` Icon · `layout/` AppSidebar, PageHeader · `forms/` Button, IconButton, TextField, FloatingField, Select, Switch, Checkbox, Segmented, SearchField, ChoiceChips, FormSection, PhotoUpload · `feedback/` StatusBadge, StageBadge, Count, Callout, Toast, EmptyState, LiveIndicator, NotificationBell, NotificationPanel, Timeline · `surfaces/` Card, Kpi, DataTable, QueueRow, Avatar, ProgressSegments, Meter · `navigation/` Tabs, SideNav, UserMenu, Stepper, Topbar · `canvas/` FlowCanvas, FlowNode (+ FlowEdge, AddStep) · `overlays/` Dialog, Drawer |
| `guidelines/` | Cartões de fundamentos (cores, contraste, tipo, espaço, raio, foco, regras) + `REGRAS.md`, `UX.md`, `ACESSIBILIDADE.md`, `RESPONSIVO.md`, `FORMATOS.md`, `MENSAGENS.md`, `GRAFICOS.md`, `conecta-docs/` |
| `ui_kits/` | Protótipos navegáveis originais: `gestao/` (painel), `portal/` (web + PWA), `apps/` (Flutter cidadão + equipe), `video/` |
| `assets/` | `logo-amajari.png` (dado de exemplo, não é a marca ERIC), `js/conecta-icons.js` (`<c-icon>` Lucide), `js/eric-tema.js` (claro/escuro), `js/conecta-theme.js` (runtime dos protótipos) |
| `CHANGELOG.md` | Versões |
| `SKILL.md` | Para usar no Claude Code |

## CONTENT FUNDAMENTALS
- **Idioma:** português do Brasil, direto, de servidor público para servidor público ou cidadão. Frases curtas. Sem jargão técnico ("frente", "ocorrência" e "OS" são termos do domínio e ficam).
- **Pessoa:** fala com "você", implícito ("Confirme que é do seu setor."). Nunca "nós" corporativo.
- **Vocabulário obrigatório:** "solicitação / solicitar", **nunca** "pedido / pedir".
- **Caixa:** frase normal (só a 1ª letra maiúscula) em títulos, botões e abas. MAIÚSCULAS só em cabeçalho de tabela e eyebrow (11–12px, espaçamento .08–.12em).
- **Botões = verbo + objeto:** Receber, Devolver, Concluir OS, Exportar, Nova situação. Nunca "OK", "Sim", "Enviar dados".
- **Dicas dizem a regra e a saída:** "Confirme que é do seu setor. Se não for, devolva com o motivo."
- **Prazos e status são concretos:** "Atrasada · venceu 29/10", "Ocorrência #105 · prazo 29/10".
- **Separador:** ponto médio " · ".
- **Emoji:** nunca. **Ícones:** Lucide.
- **Dados de exemplo:** Amajari · RR, protocolo AMA-2026-000000, e-mails @amajari.rr.gov.br. Dados pessoais mascarados (`222.•••.•••-22`).

## VISUAL FOUNDATIONS
- **Cores:** azul institucional (`--c-primary #0b63c4`, `--c-strong #0a3d78`), neutros frios, status semânticos fixos (verde concluído · laranja pendente · azul ação · vermelho atraso/erro · cinza neutro). Etapas: triagem azul, vistoria âmbar, execução violeta, conclusão verde.
- **Tipo:** só Poppins 400/500/600/700; mono só no protocolo. Escala compacta: tela 22/28, card 15/22, corpo 13–14, meta 12, cabeçalho 11 MAIÚSCULAS.
- **Espaço:** base 4 (4·6·8·10·12·14·16·18·20·24·28·32). Card padding 14–16, gap entre blocos 14–16.
- **Fundos:** cor sólida. Página `--c-page` levemente mais escura que o card branco para separar. Sem imagens de fundo, sem texturas, sem padrões. Foto só no login (lado esquerdo, com véu sólido `rgba(6,28,58,.45)`).
- **Degradê:** proibido. **Sombra:** proibida em botões e cards. Profundidade = borda 1px + troca de fundo. Exceções: anel de foco, halo do pino do mapa.
- **Bordas (tokens/borders.css):** `--e-bd-card`, `--e-bd-control`, `--e-bd-field`, `--e-bd-active`, `--e-bd-selected`, `--e-bd-add` (tracejada), `--e-bd-dropzone`, barras `--e-bar-tab/step/late`. 1px `--c-border` em cards/tabelas; 1px `--c-field-bd` (≥3:1) em campos; 1.5px `--c-primary` em card ativo; barra 3px em aba/etapa ativa e na lateral de linha atrasada.
- **Raios:** 6 selo de etapa · 8 controles · 10 callout/menu · 12 card · 14 diálogo · 18 login · 999 pílulas (selos, contadores, switch). Mobile: campo 14, cartão 16.
- **Cards:** fundo `--c-surface`, borda 1px, raio 12, sem sombra; cabeçalho com borda inferior; hover (quando clicável) `--c-tint` + borda `--c-soft-bd`.
- **Hover:** um passo mais escuro no primário; fundo `--c-surface-2` em secundário/ghost/menu; linhas `--c-tint`.
- **Press:** primário `--c-primary-press`. Sem encolher, sem bounce.
- **Foco:** `outline 2px var(--c-focus)` + offset 2px em todo interativo; campos: borda `--c-focus` + anel 3px `--c-focus-ring`.
- **Movimento:** 100–300 ms, `cubic-bezier(.2,.7,.2,1)`; entradas fade-up 6px, pop .97, drawer slide 28px. Respeita `prefers-reduced-motion`.
- **Transparência/blur:** só no véu de diálogo/drawer (`--c-scrim`). Sem blur.
- **Layout:** menu lateral 236 fixo, topbar 58 fixa, conteúdo fluido (`flex:1; min-width:0`), grades `auto-fill minmax(300px,1fr)`. Nunca centralizar layout de 1440 em 1920. Portal `max-width 1200`.
- **Nunca quebrar linha:** tabelas, botões, selos, abas, itens de menu → `white-space:nowrap` + ellipsis. Abas que não cabem rolam na horizontal. Dicas e parágrafos podem quebrar.
- **Imagens:** fotos reais, quentes, de pessoas e da cidade; avatares sempre foto (iniciais só sem foto).

## ICONOGRAPHY
- **Lucide** (UMD `lucide@0.460.0`), traço **1.5**, via `<c-icon name="…" size="16">` (`assets/js/conecta-icons.js`). Flutter: `lucide_icons`.
- Tamanhos: 13 rótulo de campo · 14 botão sm/menu · 16 padrão · 20 destaque/diálogo · 22 estado vazio.
- Ícone decorativo é `aria-hidden`; botão só com ícone exige `aria-label`.
- Sem emoji, sem unicode como ícone (exceto ✓/✗ em documentação), sem SVG desenhado à mão.

## Intentional additions
- `Icon`: wrapper do `<c-icon>` para os componentes React.
- `--c-field-bd`: borda de campo com contraste 3:1 (a borda antiga #dfe3ea tinha 1,5:1).
- `--c-ok-solid` (#15803d): o verde #16a34a com texto branco tinha 3,3:1.
- `--c-primary-hover` escuro (#1a5fb4): o antigo #2b7ddf tinha 4,1:1 com branco.
- `--c-neu-*`, `--c-focus`, `--c-focus-ring`, `--c-scrim`, `--c-primary-press`.

## Modelos de tela (na página principal)
1. Estrutura do app (sidebar + topbar + cabeçalho) · 2. Cards (KPI, gráfico, "Precisa de você agora", medidores, frente, destaque) · 3. Formulário em seções · 4. Canvas de diagrama + inspector · 5. Tabela com busca, filtros e paginação · 6. Notificações, toasts e histórico · 7. Estados (vazio, carregando, erro, sem permissão).

## Tema
Padrão: **claro**. Escuro só por escolha do usuário (`EricTema.set('escuro')`).
