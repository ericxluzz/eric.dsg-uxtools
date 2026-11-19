# ERIC Design System 1.2

Design system para os produtos do Conecta+ (atendimento ao cidadão para prefeituras): tokens,
componentes React, gráficos e helpers de formatação, com um tema Flutter para os apps mobile.

## Pacotes

| Pacote | O quê |
| --- | --- |
| [`@eric/tokens`](packages/tokens) | Cores (claro/escuro), tipografia, espaço, raio, camadas. Gera CSS vars, `tokens.json`, preset Tailwind e `eric_tokens.dart` a partir de um único CSS fonte. |
| [`@eric/react`](packages/react) | ~55 componentes (Button, Select, Dialog, DataTable, AppSidebar, FlowCanvas…), acessíveis (WCAG 2.2 AA, testados com axe e navegação por teclado). |
| [`@eric/charts`](packages/charts) | `ChartCard` + 7 gráficos SVG acessíveis (linha, ranking, empilhado, mapa de calor, funil, antes/depois). |
| [`@eric/format`](packages/format) | Datas, moeda, máscaras de CPF/telefone, protocolo e mensagens padrão em pt-BR. |
| [`eric_flutter`](packages/flutter) | Tema (`ericTheme()`) e widgets Flutter equivalentes. **Escrito sem acesso a um SDK Flutter** — ver o README do pacote antes de usar. |
| [`@eric/docs`](apps/docs) | Site com os componentes, cores e gráficos ao vivo — guia de estilo navegável. |

## Uso

```bash
pnpm install
pnpm build      # gera os tokens e compila os pacotes
pnpm test       # 79 testes (contraste, axe, teclado)
pnpm --filter @eric/docs dev   # sobe o site de docs em localhost:5173
```

```tsx
import { ThemeProvider, Button, DataTable } from "@eric/react";
import "@eric/tokens/css";

<ThemeProvider>
  <Button icon="save">Salvar</Button>
</ThemeProvider>;
```

## Regras inegociáveis

1. **Sem sombra e sem degradê** em botões e cards. A profundidade vem da borda de 1px mais a troca de fundo (`--c-page` mais escura que `--c-surface`). Exceções: anel de foco e halo do pino do mapa.
2. **Nada quebra linha** em tabela, botão, selo, aba ou item de menu — `nowrap` + `ellipsis`, colunas `minmax(0,Nfr)`. Abas que não cabem rolam na horizontal.
3. **Cor por status**: verde = concluído, laranja = pendente, azul = ação/andamento, vermelho = atraso/erro, cinza = neutro. Nunca só a cor — sempre com texto e/ou ícone.
4. **Vocabulário**: "solicitação/solicitar", nunca "pedido/pedir". Botão = verbo ("Receber", "Concluir OS"). Nunca "OK/Sim/Não".
5. **Tema claro é o padrão.** Escuro só por escolha do usuário (`data-tema="escuro"` no `<html>`).
6. **Ícones**: só Lucide, traço 1.5. Nunca emoji.
7. **Fonte**: só Poppins (400/500/600/700). Mono só no protocolo.
8. **Acessibilidade**: WCAG 2.2 AA — foco visível 2px, `<label>` real, aria em menus/diálogos, toque ≥ 44 no mobile, campo 16px no mobile.
9. **Toda lista** tem 4 estados: vazio, carregando (skeleton), erro (com "Tentar de novo") e sem permissão.
10. **Gráficos**: título = conclusão, botão "Ver dados" troca por tabela, `role="img"` + frase-resumo, sem pizza, eixo em 0.
11. **Formatos**: datas `dd/mm/aaaa`, moeda `R$ 1.250,00`, separador " · ". CPF e telefone mascarados por padrão (ver `@eric/format`).

## Design tokens (principais, tema claro)

- `primary` `#0b63c4` · `strong` `#0a3d78` · `soft` `#dcebfb` · `tint` `#f3f8fe`
- `page` `#e9ecf0` · `surface` `#ffffff` · `border` `#d9dde4` · `field-bd` `#8a8a96`
- `text` `#1a1a1a` · `text-2` `#5b5b66`
- `ok` `#15803d`/`#f0fdf4` · `warn` `#9a3412`/`#ffe6cc` · `info` `#1d4ed8`/`#eff6ff` · `bad` `#b91c1c`/`#fee2e2`
- Espaço: 4 6 8 10 12 14 16 18 20 24 28 32 40 48 64 · Raios: 4 6 8 10 12 14 18 999 (mobile: 14/16/20)

Todos os valores em [`packages/tokens/src/css`](packages/tokens/src/css) — nunca editar `dist/` à mão, só o CSS fonte.

## Regras do repositório

Ver [`CLAUDE.md`](CLAUDE.md).
