# Visual — tokens, regras e componentes

> **Fonte única de cor: `conecta/conecta-theme.js`.** Todo componente usa `var(--c-*)`; nenhum hex solto, exceto o branco de texto sobre fundo primário e os sólidos de status (#16a34a, #dc2626, #f59e0b, #7c3aed). Os impressos (G-04b, G-12d) ficam sempre claros.

## Regras obrigatórias

1. **Sem sombras e sem degradês** em botões e cards. Profundidade = borda `1px #e5e5e5` + troca de fundo. (Únicas exceções: anel de foco e o halo do pino do mapa.)
2. **Tabelas, botões e selos nunca quebram linha.** `white-space: nowrap` + `overflow: hidden` + `text-overflow: ellipsis` em células; colunas de texto com `minmax(0, Nfr)`.
3. **Cor por status (sempre a mesma semântica):**
   - Verde = concluído / bom / ativo
   - Laranja = pendente / aguardando / rascunho / implantação
   - Azul = ação / atenção / em andamento
   - Vermelho = atraso / erro / risco / destrutivo
   - Cinza = neutro / encerrado / substituído
4. **Vocabulário:** sempre "solicitação / solicitar". Nunca "pedido / pedir".
5. **Nada de prefeitura no código:** nome, brasão, prefixo do protocolo, secretarias, serviços e prazos vêm do banco.
6. **Dados pessoais mascarados** (`222.•••.•••-22`, `(95) •••••-3380`, `m•••••@email.com`) salvo permissão.
7. Área de toque mínima **44 px** (PWA: 48–54 px nos botões principais). Inputs do PWA com **16 px** de fonte (evita zoom no iOS).

## Cores

| Token | Hex | Uso |
| --- | --- | --- |
| `primary` | `#0b63c4` | Botão primário, links, item ativo, foco |
| `primary-hover` | `#0a55a8` | Hover do primário |
| `primary-strong` | `#0a3d78` | Títulos de marca, texto sobre `primary-soft` |
| `primary-soft` | `#dcebfb` | Fundo de item ativo, ícone em caixa, selo de código |
| `primary-tint` | `#f3f8fe` | Linha selecionada, hover de linha, opção marcada |
| `text` | `#1a1a1a` | Texto principal |
| `text-2` | `#5b5b66` | Texto secundário, rótulos de `dt` |
| `page` (gestão) | `#f1f2f4` | Fundo da área de conteúdo do painel |
| `page` (PWA) | `#f4f6f9` | Fundo das telas do app |
| `surface` | `#ffffff` | Cards, tabelas, cabeçalhos |
| `surface-l2` | `#f5f5f5` | Cabeçalho de tabela, caixas informativas |
| `surface-l3` | `#ebebeb` | Trilho de progresso vazio |
| `border` | `#e5e5e5` | Bordas de card e tabela |
| `border-input` | `#dfe3ea` | Bordas de input no PWA |
| `success` / container / border / fg | `#16a34a` / `#f0fdf4` / `#a7e8bf` / `#15803d` | Concluído, ativo, senha forte |
| `warning` / container / border / fg | `#ea580c` / `#ffe6cc` / `#fdc7a2` / `#9a3412` | Pendente, rascunho, falta informação |
| `info` / container / border / fg | `#3b82f6` / `#eff6ff` / `#b1cdfb` / `#1d4ed8` | Em andamento (vistoria, execução) |
| `danger` / container / border / fg | `#ef4444` / `#fee2e2` / `#fecaca` / `#b91c1c` | Atraso, erro, risco, remover |
| Console Orbi menu | `#0f1f33` fundo, `#16294a` cartão, `#1b3150` hover, `#9fb3c8` texto 2 | Só o menu lateral do Orbi (diferencia do painel da prefeitura) |
| Faixa municipal | `#0a57a3` · `#1a96e8` · `#f7c900` · `#4caf3e` (3:2:1:2) | Barra de 5 px nas cores de Amajari (login e splash do PWA) |

**Cores de categoria** (fundo / ícone): Infraestrutura `#dcebfb/#0a3d78` · Meio ambiente `#e8f6e6/#2e7d32` · Documentos `#fff7d1/#6b5300` · Saúde `#fde8e8/#b91c1c` · Tributos `#eef0ff/#3f3fbf` · Social `#e6f6fb/#0e6a85`. Em produção, cor e ícone são atributos da categoria no banco.

**Cores de etapa no fluxo** (barra/ponto): Triagem/Recebida `#0b63c4` · Vistoria `#f59e0b` · Execução `#7c3aed` · Conclusão `#16a34a`.

## Tipografia — Poppins

| Papel | Tamanho / altura | Peso |
| --- | --- | --- |
| Título de tela (gestão) | 26 / 34 | 600 |
| Título de tela (portal) | 28–32 / 40–44, cor `primary-strong` | 600 |
| Título de tela (PWA) | 22–24 / 28 | 600 |
| Título de card | 16 / 24 | 600 |
| Corpo | 14 / 20–22 | 400–500 |
| Corpo PWA / inputs PWA | 15–16 | 400–500 |
| Secundário / meta | 12–13 | 400–500 |
| Cabeçalho de tabela | 11, `letter-spacing .1em`, MAIÚSCULAS, cor `#4b4b55` | 600 |
| Eyebrow de seção | 12, `letter-spacing .1–.16em`, MAIÚSCULAS | 600 |
| Selo / chip | 12 | 600 |
| Protocolo destacado | `ui-monospace`, 22–30 | 600 |

## Espaço e raio

- Espaçamento base 4 px. Usuais: 4 · 6 · 8 · 10 · 12 · 14 · 16 · 18 · 20 · 24 · 28 · 32.
- Padding do `main` no painel: `26px 28px 32px`. Gap entre blocos: 18–20 px. Card: padding 18–22 px.
- Raio: input/botão de tabela 8–10 · botão 12 · card 14 · card portal 16 · card PWA 16 · chip/selo 999 (pílula) · selo de etapa 6.
- Larguras: menu lateral 248 px; topbar 72 px de altura; header portal 72–76 px; conteúdo portal `max-width 1200px` (formulários 720–880 px); painel lateral (drawer) 500–520 px; diálogo 600 px.

## Componentes (anatomia)

**Botão primário:** altura 42–46 (PWA 54), padding 0 18–22, raio 12, fundo `primary`, texto branco 14/600, ícone 16–17 à esquerda ou seta à direita. Hover `primary-hover`. Sucesso (Concluir OS, Ativar município) usa `#16a34a` → hover `#15803d`.
**Botão secundário:** mesmo tamanho, fundo branco, borda `border`, texto 14/500; hover `surface-l2`.
**Botão destrutivo leve:** fundo transparente, texto `#b91c1c`; hover `danger-container`.
**Input:** altura 44 (portal 46–50, PWA 50–52), padding 0 12–14, raio 10 (PWA 14), borda `border`. Foco: borda 1.5 px `primary` + anel `0 0 0 3px rgba(11,99,196,.15)`. Rótulo acima 13/500, ajuda abaixo 12/400 `text-2`. Obrigatório: `*`. Erro/pendência: borda e texto `#9a3412` (pendente) ou `#b91c1c` (erro).
**Selo de status:** pílula, padding 3–4 × 10, 12/600, fundo/cor/borda do status, ponto de 6 px `currentColor` à esquerda.
**Selo de etapa:** raio 6, quadradinho 6 px, cor da etapa.
**Card:** fundo branco, borda 1 px `border`, raio 14, sem sombra. Card em foco/atual: borda 1.5 px `primary`.
**Tabela:** grid de colunas fixas + `minmax(0,fr)`; cabeçalho `surface-l2` com bordas sup./inf.; linhas com padding 11–14 × 20, borda inferior, hover `primary-tint`; ação "Atender" como botão secundário pequeno (32 px).
**Abas:** texto 14, ativa 600 `primary-strong` com barra inferior 2–3 px `primary`; contador em pílula (ativa: fundo `primary`, texto branco).
**Stepper de etapas:** grade horizontal; etapa concluída = círculo verde com check; atual = círculo azul, fundo `primary-tint`, barra inferior 3 px; futura = círculo vazio cinza.
**Barra de progresso (PWA/cards):** 4–6 segmentos de 4–6 px, raio 99; cinza `#e6e9ef` vazio, azul em andamento, verde quando concluído, âmbar quando falta informação.
**Drawer (painel lateral):** 500–520 px à direita, fundo branco, cabeçalho com título 20/600 e fechar 36 px; rodapé com ações à direita. Backdrop `rgba(10,24,45,.48–.55)`.
**Switch:** 40×22 (PWA 44×26), ligado `primary`, desligado `#c9ced6`.
**Menu lateral (gestão):** fundo `#fafafa`, borda, raio 16, logo + "Conecta+ / Painel de gestão", seletor de município (abre G-00), grupos "Atendimento" e "Configuração" (o segundo só com permissão), item 40 px raio 8, ativo `primary-soft`/`primary-strong`, contador em pílula; cartão do usuário no rodapé abre Meu perfil.
**Topbar (gestão):** 72 px, busca pílula `#f5f5f5` 42 px com atalho `/`, selo "Ao vivo" verde, ajuda (link externo), sino com contador vermelho 16 px no canto sup. direito com contorno branco 2 px.
**Header do portal:** 72 px, logo, navegação (Serviços · Minhas solicitações · Notificações com contador), seletor de município pílula, avatar com menu da conta.
**Tab bar do PWA:** 5 itens (Início · Solicitações · **Solicitar** central em destaque 52 px `primary` · Avisos · Perfil), item ativo com caixa `primary-soft` 44 px, padding inferior 30 px (área segura).

## Estados

- **Hover:** linhas e cards → `primary-tint` ou borda `primary`; botões → passo mais escuro.
- **Foco:** `outline: 2px solid #0b63c4; outline-offset: 2px` em todo interativo.
- **Desabilitado:** botão primário `#a9c8ec`, cursor `not-allowed` (ex.: "Enviar e liberar atendimento" sem a foto).
- **Bloqueado por regra:** situações com ícone de cadeado e fundo `surface-l2` quando há pendências (G-03).
- **Vazio / sem permissão / erro:** ver G-02b, C-06b, C-03c, C-04c, M-09b, M-04b, M-13.
- **Ao vivo:** selo verde com ponto pulsante na topbar e em Notificações (SSE).

## Responsividade

- Painel e Console: desktop ≥ 1280 px; menu lateral fixo.
- Portal: fluido até `max-width 1200px`; grades de 3 colunas caem para 2 e 1; abaixo de 768 px usar o layout do PWA.
- PWA: 360–430 px de largura; uma coluna; ação principal fixa no rodapé; formulários em passos.


## Densidade (escala compacta — vale para painel, portal e Console)

| Elemento | Medida |
| --- | --- |
| Título de tela | 22/28 · 600 (portal 24–26) |
| Título de card | 14–15 · 600 |
| Corpo / tabela | 13–14 |
| Meta, selos, cabeçalho de tabela | 11–12 |
| Botão e input | 34–36 px de altura (destaque 38–40) |
| Linha de menu | 34 px · raio 6 |
| KPI | padding 12–14, valor 24/28 |
| Card | padding 14–16 · raio 10 |
| Botão | raio 8 · input raio 8 |
| Gaps entre blocos | 14–16 |
PWA mantém as medidas de toque (44–54 px) e inputs de 16 px.

## Responsividade (1366 · 1440 · 1920)

- **Fixo:** menu lateral 232 px, topbar 56 px, coluna de navegação interna (Configurações 200 px), largura das colunas de ação/status nas tabelas.
- **Fluido:** `main` ocupa todo o resto (`flex:1; min-width:0`) — **nunca** centralizar um bloco de 1440 dentro de 1920.
- Grades de cards: `repeat(auto-fill, minmax(300px,1fr))` → 3 colunas em 1366/1440 e 4–5 em 1920 (mais colunas, não cards maiores).
- KPIs: 4 colunas `minmax(0,1fr)`; altura fixa pela densidade.
- Painéis laterais de detalhe: `minmax(0,1fr) minmax(320px,26%)` → a lateral cresce até ~420 px em 1920.
- Tabelas: colunas de texto `minmax(0,Nfr)` com ellipsis; colunas de status/prazo/ação em px.
- Topbar: busca `flex:1 1 auto; min-width:0; max-width:520px`; grupo da direita `flex:none`. Nada quebra linha; abaixo de 1280 px a busca encolhe primeiro.
- Portal: contêiner `max-width` 1140 (1366) · 1200 (1440) · 1560 (1920), com `padding:0 32px`.
- **Login sem rolagem** em 1366×768, 1440×900 e 1920×1080: altura = `100dvh`, conteúdo centralizado; só rola abaixo de 640 px de altura.
- No protótipo, o Tweak **largura** (1366/1440/1920) aplica `--fw`, `--fh` e `--pw` em todas as telas.

## Modo escuro

Alternância pelo botão sol/lua na topbar e no cabeçalho do portal, ou em Configurações › Aparência; preferência salva por usuário. Mesma estrutura nos dois temas — só os tokens mudam.

| Token | Claro | Escuro |
| --- | --- | --- |
| page / sidebar / surface / surface-2 / surface-3 | #f1f2f4 / #fafafa / #fff / #f5f5f5 / #ebebeb | #0e1217 / #12171e / #161b22 / #1c222b / #262d37 |
| border / border-2 | #e5e5e5 / #dfe3ea | #2a313c / #353d4a |
| text / text-2 / text-3 | #1a1a1a / #5b5b66 / #4b4b55 | #e6e9ee / #a3acb9 / #b8c0cc |
| primary (fundo de botão, texto branco) | #0b63c4 | #1f6fd1 (5:1 com branco) |
| link (texto/ícone/borda de foco) | #0b63c4 | #7db4ff |
| strong / soft / tint | #0a3d78 / #dcebfb / #f3f8fe | #a9cdf7 / #17304f / #13243a |
| ok bg/bd/fg | #f0fdf4 / #a7e8bf / #15803d | #0f2a1c / #1f5636 / #6ee7a0 |
| warn bg/bd/fg | #ffe6cc / #fdc7a2 / #9a3412 | #33200f / #6b3d16 / #fdba74 |
| info bg/bd/fg | #eff6ff / #b1cdfb / #1d4ed8 | #12223f / #274a84 / #93c5fd |
| bad bg/bd/fg | #fee2e2 / #fecaca / #b91c1c | #3a1517 / #7a2a2e / #fca5a5 |
| mapa | sem filtro | `brightness(.72) contrast(1.08) saturate(.8)` |
Todos os pares texto/fundo ≥ 4,5:1; bordas de controle e ícones ≥ 3:1. Lista completa (categorias, controles) em `conecta-theme.js`.

## Elementos informativos (não interativos)
Bloco município/perfil do menu · indicador "Tempo real" · Dados institucionais · Vínculos e perfis em Configurações · selos de status. Nunca usar seta, cursor de clique ou hover nesses elementos.

## Avatares
Sempre foto (círculo, `object-fit:cover`, 18/24/30/36/64 px). Fallback em produção: iniciais em `var(--c-soft)`/`var(--c-strong)` só quando o cadastro não tiver foto. Equipes usam o ícone `users`.
