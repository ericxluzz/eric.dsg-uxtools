# Handoff: ERIC Design System 1.2

## Visão geral
O **ERIC** é o design system extraído do Conecta+ (atendimento ao cidadão para prefeituras: painel de gestão, portal web, PWA e apps Flutter). Este pacote serve para implementar o ERIC como **biblioteca real** e usá-la em todos os produtos:

- `@eric/tokens`: tokens claro/escuro em CSS, JSON, Tailwind e Flutter.
- `@eric/react`: 55 componentes web + 8 gráficos.
- `eric_flutter`: tema e widgets para os apps.
- **Site de documentação**: a página `Eric Design System.dc.html` vira um site navegável (Storybook ou Next.js).

## Sobre os arquivos
Os arquivos em `referencia/` são **referências de design feitas em HTML**: protótipos que mostram aparência e comportamento, **não código de produção para copiar**.

A tarefa é **recriar** esse design no ambiente do projeto (React + TypeScript na web, Flutter nos apps), com os padrões e bibliotecas de lá.
- Os `.jsx` em `referencia/components` são esboços funcionais. Use-os como especificação de props, estrutura e classes, não como código final.
- `referencia/tokens/*.css` e `tokens/*` **são** reaproveitáveis diretamente. São a fonte da verdade dos valores.

Para ver a referência, abra `referencia/Eric Design System.dc.html` num servidor local (`npx serve referencia`). Ela precisa de `support.js` e internet (fonte Poppins e ícones Lucide via CDN).

## Fidelidade
**Alta fidelidade.**
- Cores, tipografia, espaços, raios, bordas, estados e textos são finais.
- Recrie pixel a pixel.
- Toda cor sai de token `--c-*`; nenhum hex solto no componente.

## Regras inegociáveis
1. **Sem sombra e sem degradê** em botões e cards. A profundidade vem da borda de 1px mais a troca de fundo (página `--c-page` mais escura que o card `--c-surface`). As exceções são o anel de foco e o halo do pino do mapa.
2. **Nada quebra linha** em tabela, botão, selo, aba ou item de menu: `white-space:nowrap; overflow:hidden; text-overflow:ellipsis`, com colunas `minmax(0,Nfr)`. Abas que não cabem **rolam** na horizontal; a fonte nunca encolhe.
3. **Cor por status:**
   - verde = concluído/bom
   - laranja = pendente
   - azul = ação/andamento
   - vermelho = atraso/erro
   - cinza = neutro
   - A cor nunca vem sozinha: sempre com texto e/ou ícone.
4. **Vocabulário:** "solicitação/solicitar", **nunca** "pedido/pedir". Botão = verbo ("Receber", "Devolver", "Concluir OS"). Nunca "OK/Sim/Não".
5. **Tema claro é o padrão.** O escuro só aparece por escolha do usuário (`data-tema="escuro"` no `<html>`).
6. **Ícones:** só **Lucide**, traço 1.5. Nunca emoji.
7. **Fonte:** só **Poppins** (400/500/600/700). Mono só no protocolo.
8. **Acessibilidade:** WCAG 2.2 AA (ver `referencia/guidelines/ACESSIBILIDADE.md`). Todo par texto/fundo dos tokens já passa 4,5:1. Bordas de campo e foco passam 3:1.

## Telas e seções da referência
A página de referência tem 24 seções. Cada uma vira uma página do site de docs e corresponde ao código abaixo.

| Seção | O que implementar |
| --- | --- |
| Visão geral | Página inicial das docs + instruções de instalação |
| Regras · Acessibilidade · Responsivo | Páginas de diretrizes (conteúdo em `guidelines/*.md`) |
| Cores · Contraste | Tabela de tokens claro/escuro **lida dos CSS vars em runtime** + teste automatizado de contraste (ver PLANO, fase 1) |
| Gráficos | Pacote `charts` (8 tipos) com "Ver dados" |
| Tipografia · Espaço · Bordas · Camadas · Ícones | Tokens + páginas de docs; ícones com busca |
| Estados e movimento · Estados por componente | Cada componente com stories de todos os estados |
| Componentes · Complementares | 55 componentes (lista em `COMPONENTES.md`) |
| Faça / Não faça | Bloco "Do/Don't" em cada página de componente |
| Modelos de tela | 7 templates: app shell, cards, formulário, canvas de diagrama, tabela, notificações, estados |
| Mobile | Widgets Flutter + equivalentes PWA |
| Voz · Mensagens · Formatos | Guias + helpers `formatDate`, `formatPrazo`, `maskCPF`… |
| Arquivos · Versões | Changelog semântico |

### Layout padrão do app (modelo 1)
- **Sidebar**: 236px fixa, fundo `--c-sidebar`, borda direita 1px `--c-border`.
  - **Marca**: logo 36×36 (raio 10, fundo branco, borda), nome 15/600 `--c-strong`, subtítulo 11px `--c-text-2`; padding 16 14 14, com borda inferior.
  - **Navegação**: padding 10, gap 2. Título de grupo 10px/600, maiúsculas, espaçamento .12em. Item com altura 38, raio 8, padding 0 10, gap 10, ícone 16, texto 13/500. Item ativo: fundo `--c-soft`, texto `--c-strong` 600 e contador primário.
  - **Rodapé**: borda superior, Configurações e "O que é cada coisa?" (itens 38px). Cartão do usuário: padding 10, raio 10, borda `--c-border`, avatar 36 e nome 13/600. O cargo é 11px; ícone `chevrons-up-down`. Abre o mini menu para cima: Minha conta, Notificações, separador, **Sair** em vermelho.
- **Topbar**: 58px, fundo `--c-surface`, borda inferior. Busca com altura 34, raio 8, borda `--c-field-bd`, máximo 420–520 e atalho "/". À direita: "Tempo real" (ponto verde 7px, não clicável), sino 34×34 com contador vermelho 16px e botão de tema.
- **Conteúdo**: `flex:1; min-width:0`, padding 24 28 32. Cabeçalho da página com kicker 12px `--c-text-2`, título 22/28 600 e descrição 13px. Ações à direita: no máximo **um** primário.

### Medidas-chave
- **Controles:** 28 / 34 (padrão) / 40 / 46 (login).
- **Linha de tabela:** mínimo 52; cabeçalho 36, 11px maiúsculas `--c-text-3` sobre `--c-surface-2`.
- **Card:** raio 12, padding 16, borda 1px.
- **Diálogo:** 600px, raio 14.
- **Drawer:** 520px à direita.
- **Selo:** 22px pílula 12/600.
- **Selo de etapa:** 22px, raio 6, com quadrado de 8px.
- **Contador:** 18px pílula 11/600.
- **Mobile:**
  - campo 52 com fonte 16; botão 54 (raio 14, 16/600); toque mínimo 44
  - cabeçalho 56; barra inferior 64 + safe-area
  - cartão raio 16; gaveta raio 20 no topo
  - margem 16

## Interações e comportamento
- **Hover:** primário → `--c-primary-hover`. Secundário/ghost/menu → fundo `--c-surface-2`. Linhas e cards clicáveis → `--c-tint` + borda `--c-soft-bd`.
- **Pressionado:** `--c-primary-press`. Sem escala, sem bounce.
- **Foco:** `outline: 2px solid var(--c-focus); outline-offset: 2px` em todo interativo. Campo: borda `--c-focus` + `box-shadow: 0 0 0 3px var(--c-focus-ring)`.
- **Desabilitado:** fundo `--c-disabled`, `cursor:not-allowed`, motivo escrito por perto.
- **Movimento:** 100–300 ms, `cubic-bezier(.2,.7,.2,1)`.
  - Entradas: fade-up 6px. Menus: pop .97. Drawer: desliza 28px.
  - Spinner: 0,8 s linear. Skeleton: pulsa 1,4 s.
  - `prefers-reduced-motion` zera tudo.
- **Menus e popovers:** fecham com clique fora e com Esc. Item atual com check e fundo `--c-tint`.
- **Diálogo:**
  - foco preso; Esc fecha e devolve o foco
  - título em pergunta ("Devolver à Central?")
  - Cancelar à esquerda; ação com verbo à direita
  - destrutivo em `--c-bad-solid`
- **Toast:** 3–4 s, canto inferior, fundo `--c-text`, `role="status"`.
- **Formulário:**
  - rótulo sempre visível acima; obrigatório com * em `--c-bad-fg`
  - valida ao sair do campo e ao enviar; o foco vai para o 1º erro
  - erro abaixo do campo, com ícone `circle-alert` (textos em `MENSAGENS.md`)
- **Carregando:** listas e telas usam **skeleton** (nunca spinner no meio da página). Botão usa spinner de 14px + "Salvando…", desabilitado. Envio com progresso usa barra de 6px.
- **Estados obrigatórios** em toda lista: vazio, carregando, erro (com "Tentar de novo") e sem permissão.
- **Sessão:** Sair → login com o aviso "Sessão encerrada com segurança". Entrar → volta à última tela.
- **Responsivo** (`RESPONSIVO.md`):
  - < 600: layout PWA; tabela vira cartões; diálogo vira gaveta de baixo
  - 600–1023: sidebar em gaveta, drawer em tela cheia
  - ≥ 1024: sidebar fixa
  - formulário nunca passa de 720px; nunca centralizar 1440 em 1920
- **Gráficos:**
  - título = conclusão
  - destaque em 1–2 séries, resto em `--c-chart-muted`
  - rótulo direto; eixo em 0; no máximo 4 séries; sem pizza
  - `role="img"` + frase-resumo; botão "Ver dados" troca por tabela

## Estado (por componente)
- **Controlados**, com `value`/`onChange`: Select, Segmented, Switch, Tabs, ChoiceChips, DatePicker, Pagination.
- **Abertura interna**, com `open`/`onOpenChange` opcionais: UserMenu, ActionMenu, Select, DatePicker.
- **Tema**: `ThemeProvider` lê e grava `localStorage['eric-tema']` e aplica `data-tema` no `<html>`. O padrão é `claro`.
- **Gráficos**: `ChartCard` guarda `showTable` localmente.

## Design tokens
- **Fonte da verdade:** `referencia/tokens/*.css`. Os outros formatos já foram gerados a partir dela:
  - `tokens/tokens.json`: neutro, para scripts e Figma Tokens
  - `tokens/tailwind.preset.js`: cores apontando para `var(--c-*)`, então o tema funciona sozinho
  - `tokens/eric_tokens.dart`: `ThemeExtension EricColors` (claro/escuro), `EricSpace`, `EricRadius`, `EricType` e `ericTheme()`
- **Principais (claro):**
  - primary `#0b63c4` · hover `#0a55a8` · strong `#0a3d78` · soft `#dcebfb` · tint `#f3f8fe`
  - page `#e9ecf0` · surface `#ffffff` · surface-2 `#f6f7f9` · border `#d9dde4` · field-bd `#8a8a96`
  - text `#1a1a1a` · text-2 `#5b5b66`
  - ok `#15803d`/`#f0fdf4` · warn `#9a3412`/`#ffe6cc` · info `#1d4ed8`/`#eff6ff` · bad `#b91c1c`/`#fee2e2`
  - Etapas: triagem `#0b63c4` · vistoria `#f59e0b` · execução `#7c3aed` · conclusão `#16a34a`
- **Espaço:** 4 6 8 10 12 14 16 18 20 24 28 32 40 48 64.
- **Raios:** 4 6 8 10 12 14 18 999. Mobile: 14 / 16 / 20.
- **Camadas:** sticky 10 · sidebar 20 · topbar 30 · dropdown 40 · popover 45 · véu 60 · drawer 61 · diálogo 70 · toast 80 · dica 90.
- **Sombras:** nenhuma, exceto o anel de foco.

## Assets
- **Ícones:** Lucide (ISC, uso comercial ok).
  - Web: `lucide-react`. Flutter: `lucide_icons`.
  - Os 160 nomes usados estão na seção Ícones da referência.
  - Na referência, eles vêm do CDN `lucide@0.460.0` via `assets/js/conecta-icons.js` (`<c-icon>`). **Não** use isso em produção.
- **Fonte:** Poppins. Web: Google Fonts ou `@fontsource/poppins`. Flutter: `google_fonts` ou assets.
- `assets/logo-amajari.png` é **dado de exemplo**: o ERIC ainda não tem logo próprio.
- As fotos de pessoas da referência (randomuser.me) são placeholders.

## Arquivos
```
design_handoff_eric_design_system/
├─ README.md               ← este arquivo
├─ PLANO.md                ← fases, tarefas e critérios de aceite
├─ COMPONENTES.md          ← os 55 componentes: props, estados, a11y, medidas
├─ CLAUDE.md               ← regras para colar no repositório
├─ PROMPT-CLAUDE-CODE.md   ← prompt inicial para o Claude Code
├─ CHANGELOG.md
├─ tokens/                 ← tokens.json · tailwind.preset.js · eric_tokens.dart
└─ referencia/
   ├─ Eric Design System.dc.html   ← página de referência (abrir com servidor local)
   ├─ styles.css · tokens/*.css    ← fonte da verdade dos valores
   ├─ components/**                ← esboços .jsx + .d.ts (props) + .prompt.md (uso) + cartões .html
   ├─ guidelines/*.md              ← REGRAS, UX, ACESSIBILIDADE, RESPONSIVO, FORMATOS, MENSAGENS, GRAFICOS
   ├─ guidelines/conecta-docs/     ← docs do Conecta+ (VISUAL, TELAS, FLUXOS…)
   └─ assets/
```
Os protótipos completos do Conecta+ (painel, portal, PWA e apps) estão no handoff `conecta/` deste mesmo projeto. Use-os como exemplo de aplicação do ERIC em telas reais.
