# Handoff: Conecta+ — Painel de gestão, Portal do cidadão, PWA e apps nativos

## Visão geral

Conecta+ é uma plataforma SaaS de atendimento ao cidadão para prefeituras (produto da Orbi Softwares). O cidadão abre **solicitações** de serviços públicos (poste apagado, tapa-buraco, certidão…). Cada solicitação percorre um **fluxo configurável por serviço** (etapas → situações) até ser encerrada, e o cidadão é avisado a cada etapa. Primeiro município: **Amajari · RR** (protocolo `AMA-2026-000000`).

Frentes de interface:

| Frente | Quem usa | Protótipo |
| --- | --- | --- |
| Painel de gestão (web) | Central, setores, técnico, gestor | `../gestao/Painel de Gestao.dc.html` (navegável) |
| OS impressa | Equipe de campo | `../gestao/OS impressa (A4).html` |
| Portal do cidadão (web) | Cidadão | `../portal/Portal Web.dc.html` (navegável) |
| PWA do cidadão | Cidadão | `../portal/Portal PWA.dc.html` (navegável, moldura de celular) |
| App nativo do cidadão (Flutter) | Cidadão | `../apps/App Cidadao.dc.html` (telas M-* e A-*) |
| App nativo da equipe técnica (Flutter) | Técnico de vistoria | `../apps/App Equipe Tecnica.dc.html` (telas T-*) |

Fora deste pacote: Console Orbi (telas O-* do TELAS.md) não tem protótipo atual.

## Estrutura do projeto

```
conecta/
  README.md     índice do handoff
  gestao/       painel de gestão + OS impressa
  portal/       portal web + PWA do cidadão
  apps/         apps nativos Flutter (cidadão e equipe técnica) + README de tokens para Flutter
  video/        vídeo de 90 s para gestores + roteiro e locução
  docs/         esta documentação + origem/ (bff.md, revisão do mapa, SQL)
```

Cada pasta é independente: traz o próprio `support.js`, `conecta-theme.js` (tokens claro/escuro), `conecta-icons.js` e `assets/`.

## Sobre os arquivos de design

Os arquivos em `../` são **referências de design feitas em HTML**: protótipos estáticos que mostram aparência, conteúdo e fluxo esperados. **Não são código de produção para copiar.** A tarefa é **recriar essas telas no ambiente do projeto** — Nuxt 4 + PrimeVue 4 + Tailwind v4 (ver `origem/` e seção Arquitetura de `FLUXOS.md`) — seguindo os padrões e bibliotecas do repositório.

Para abrir: sirva a pasta `conecta/` por HTTP (ex.: `npx serve conecta`) e abra os arquivos da tabela acima. Painel, portal e PWA são navegáveis (clique para seguir o fluxo); os apps nativos são pranchas com cada tela marcada pelo código (M-10, T-04…) e um índice no topo. Os arquivos `.dc.html` usam um runtime próprio (`support.js`); ignore-o, ele só existe para o protótipo.

## Fidelidade

**Alta fidelidade (hi-fi).** Cores, tipografia, espaçamentos, raios, estados e textos são finais. Recrie pixel a pixel usando componentes PrimeVue tematizados com os tokens de `VISUAL.md`. Os dados são de exemplo, mas o formato (protocolo, máscaras de CPF, datas, rótulos) é o definitivo.

## Documentos deste pacote

| Arquivo | Conteúdo |
| --- | --- |
| `README.md` | Este resumo |
| `VISUAL.md` | Tokens (cores, tipografia, espaço, raio), regras visuais obrigatórias e anatomia dos componentes |
| `TELAS.md` | Inventário das telas por código: rota, propósito, layout, componentes, endpoint do BFF, regras e estados |
| `FLUXOS.md` | Modelo de dados, regras de negócio, fluxo da solicitação, permissões, versionamento, arquitetura BFF/core |
| `REGRAS.md` | Regras curtas para colar no `CLAUDE.md` do repositório |
| `origem/` | Documentos-fonte: `bff.md` (contrato dos BFFs), `revisao-mapa-de-telas-pos-poc.md`, `conecta_poc.sql` (core) |

**Precedência quando houver conflito:** `conecta_poc.sql` (regra do core) > `bff.md` (contrato) > `FLUXOS.md` > protótipo. O protótipo define **visual e organização**; o core define **regra**. Divergências conhecidas estão listadas em `FLUXOS.md › Divergências entre protótipo e core`.

## Assets

| Asset | Origem | Uso |
| --- | --- | --- |
| `assets/logo-amajari.png` (em cada pasta) | Brasão de Amajari fornecido pelo cliente | Login, menu, cabeçalhos, impressos. Em produção vem do cadastro do município (`municipios`), nunca fixo no código |
| Ícones | [Lucide](https://lucide.dev) 0.460, traço 1.75 (2–2.25 em ícones pequenos de estado) | Todos os ícones. Em PrimeVue use `lucide-vue-next` |
| Fotos de pessoas | randomuser.me (placeholder) | Avatares; em produção, iniciais quando não houver foto |
| Fotos de campo | Wikimedia Commons (placeholder) | Exemplos de anexos |
| Mapa | Tiles Esri World Street Map, ilustrativo | Em produção: MapLibre GL + OSM (conforme estrutura do projeto) |
| Fonte | Poppins 400/500/600/700 (Google Fonts) | Toda a interface |
