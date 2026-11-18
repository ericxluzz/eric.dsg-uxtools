# Prompt inicial para o Claude Code

Cole o bloco abaixo como primeira mensagem no Claude Code, com a pasta `conecta/` já dentro do repositório (sugestão: `docs/conecta/docs/`).

---

```
Você vai implementar o Conecta+ (plataforma de atendimento ao cidadão para prefeituras, produto da Orbi Softwares) a partir de um pacote de handoff de design. O objetivo é reproduzir com fidelidade total o visual, a organização e os fluxos que estão no pacote. Não invente telas, cores, textos ou regras: se não estiver no material, pergunte.

## 1. Leia tudo antes de escrever código

Leia nesta ordem, inteiros, sem pular:
1. docs/conecta/docs/README.md
2. docs/conecta/docs/REGRAS.md
3. docs/conecta/docs/VISUAL.md
4. docs/conecta/docs/FLUXOS.md
5. docs/conecta/docs/TELAS.md
6. docs/conecta/docs/origem/bff.md
7. docs/conecta/docs/origem/revisao-mapa-de-telas-pos-poc.md
8. docs/conecta/docs/origem/conecta_poc.sql (tabelas, funções, seeds de tipos de campo, validações, operadores, status de OS, perfis e permissões)

Depois abra os protótipos para ver cada tela renderizada:
- Rode `npx serve docs/conecta` e abra `gestao/Painel de Gestao.dc.html`, `portal/Portal Web.dc.html` e `portal/Portal PWA.dc.html` (navegáveis).
- Apps nativos (Flutter, outro repositório): `apps/App Cidadao.dc.html` e `apps/App Equipe Tecnica.dc.html`, com `apps/README.md`.
- Para medidas exatas, leia o HTML do protótipo: todos os estilos estão inline (cores, tamanhos, paddings, raios, pesos). Os dados de cada lista estão no `<script data-dc-script>` no fim do arquivo (método `renderVals`).
- Ignore `support.js`: é só o runtime do protótipo.

Ao terminar a leitura, me devolva em até 30 linhas:
- seu entendimento da arquitetura (core no Postgres, dois BFFs nas rotas de servidor do Nuxt, frontend que não fala com o Supabase);
- a lista de apps e telas que você vai criar, agrupadas por app;
- as divergências da seção 8 do FLUXOS.md que precisam de decisão minha antes de implementar.
Só comece a codar depois da minha confirmação.

## 2. Ordem de precedência

Em conflito, vale: conecta_poc.sql (regra do core) > bff.md (contrato) > FLUXOS.md > TELAS.md > protótipo.
O protótipo manda no VISUAL e na ORGANIZAÇÃO da tela. O core manda na REGRA. Nunca mude uma regra para caber no layout, nem o layout para simplificar a regra: me avise.

## 3. Regras inegociáveis de visual

- Fonte Poppins 400/500/600/700. Ícones Lucide com traço 1.75 (lucide-vue-next).
- Primário #0b63c4 (hover #0a55a8), forte #0a3d78, suave #dcebfb, tint #f3f8fe. Os demais tokens estão em VISUAL.md. Os tokens válidos estão em conecta-theme.js; o arquivo tokens/colors.css tem um primário roxo herdado: IGNORE.
- Sem sombra e sem degradê em botão e card. Separação só com borda 1px #e5e5e5 e troca de fundo.
- Tabela, botão e selo nunca quebram linha: white-space:nowrap + overflow:hidden + text-overflow:ellipsis; colunas de texto com minmax(0, Nfr).
- Cor por status, sempre a mesma: verde = concluído/bom/ativo, laranja = pendente/rascunho, azul = ação/em andamento, vermelho = atraso/erro/risco, cinza = neutro/encerrado.
- Área de toque mínima de 44 px; no PWA, inputs com 16 px de fonte e botão principal de 54 px fixo no rodapé.
- Foco visível: outline 2px #0b63c4, offset 2px.
- Crie o preset PrimeVue "Orbi" com esses tokens e use os componentes PrimeVue tematizados. Nenhum hex solto em componente: tudo via token.

## 4. Regras inegociáveis de texto e dados

- Sempre "solicitação" e "solicitar". Nunca "pedido" ou "pedir".
- Copie os textos dos protótipos literalmente (títulos, rótulos, ajudas, mensagens de estado vazio e de erro).
- Dados pessoais sempre mascarados (222.•••.•••-22, (95) •••••-3380).
- Nada de prefeitura, brasão, secretaria, serviço, prazo ou prefixo de protocolo no código: tudo vem do banco.
- Datas no fuso America/Boa_Vista. Seed de dev: Amajari · RR, protocolo AMA-2026-000000.

## 5. Regras inegociáveis de arquitetura

- Nuxt 4 + TypeScript strict + PrimeVue 4 + Tailwind v4 (só layout) + Pinia + Zod, monorepo pnpm.
- Apps: painel de gestão e portal do cidadão (também PWA). Console Orbi sem protótipo nesta versão.
- Frontend → só o BFF do seu app (server/api). Sessão no servidor; cookie httpOnly; X-CSRF-Token nas escritas; X-Municipio em todo request.
- Os endpoints, payloads e códigos de erro são EXATAMENTE os do bff.md. As regras ficam nas funções do conecta_poc.sql; o BFF não decide regra.
- O formulário dinâmico (abertura, etapas e prévia do admin) é UM componente só, que recebe o JSON aninhado do bff.md e avalia `exibir_se` ao vivo.
- Trate 401/403/404/409/422 como descrito em FLUXOS.md §1, mostrando a `mensagem` do core.

## 6. Como trabalhar cada tela

Para cada tela, nesta ordem:
1. Abra o protótipo da tela e o item correspondente no TELAS.md.
2. Liste os componentes e estados que ela tem (incluindo vazio, erro, sem permissão, carregando, bloqueado por pendência).
3. Implemente usando os componentes compartilhados (ZSidebar, ZTopbar, ZSeloStatus, ZStepperEtapas, ZTabela, ZFormularioDinamico, ZDrawer…).
4. Ligue ao endpoint do BFF indicado.
5. Compare lado a lado com o protótipo em 1440 px (painel e portal) e 390 px (PWA) e corrija até ficar idêntico: espaçamento, tamanho de fonte, peso, cor, raio, borda, alinhamento e texto.
6. Confira o checklist da seção 7 antes de passar para a próxima.

Ordem sugerida: preset e componentes base → login e escolha de município (G-01, G-00) → fila e solicitação (G-02, G-03) → nova solicitação e pessoas (G-04, G-05) → portal (C-01 a C-08) → PWA (M-*) → admin da carta (G-06 a G-11) → OS (G-12*) → complementos.

## 7. Checklist por tela (não marque pronto sem todos)

- [ ] Visual idêntico ao protótipo nas larguras de referência
- [ ] Nenhuma sombra ou degradê em botão ou card
- [ ] Nenhum texto quebrando em tabela, botão ou selo
- [ ] Cores de status conforme a regra
- [ ] Textos copiados do protótipo; "solicitação", nunca "pedido"
- [ ] Endpoint e payload conforme o bff.md
- [ ] Estados: carregando, vazio, erro, sem permissão e bloqueado
- [ ] Foco visível, rótulos e navegação por teclado (WCAG AA)
- [ ] Nada de município fixo no código

## 8. Quando estiver em dúvida

Não suponha. Pare e me pergunte, citando o código da tela, o trecho do documento e as opções que você vê. Não deixe para depois as divergências do FLUXOS.md §8: pergunte antes de implementar a tela afetada.
```
