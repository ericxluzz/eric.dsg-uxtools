# Fluxos e regras de negócio

> Fonte da verdade: `docs-origem/conecta_poc.sql` (core) e `docs-origem/bff.md` (contrato). Este arquivo resume e liga as regras às telas.

## 1. Arquitetura

| Camada | Onde | Responsabilidade |
| --- | --- | --- |
| Core | Funções PL/pgSQL do `conecta_poc.sql` no Postgres do Supabase | **Todas** as regras: permissão, isolamento por município, validação de formulário, fluxo, versionamento, notificação, e-mail |
| BFF Cidadão | Rotas de servidor do Nuxt (`server/api`) do portal/PWA | Sessão, monta resposta por tela, define o **canal** (`portal` no web, `aplicativo` no app) |
| BFF Gestão | Rotas de servidor do Nuxt do painel | Sessão, monta a tela de detalhe numa chamada; atendente informa canal `presencial` ou `central_telefonica` |
| Frontend | Nuxt 4 + PrimeVue 4 | Desenha. **Não fala direto com o Supabase.** Esconder botão/campo é só conforto; o core decide de novo em toda escrita |

- Sessão no servidor; frontend **nunca** vê o token do core. Web: cookie `httpOnly; Secure; SameSite=Lax` + header `X-CSRF-Token` em escrita. App: `Authorization: Bearer` opaco.
- Município ativo: header `X-Municipio: <id>` em todo request após login.
- REST/JSON, prefixo `/v1`, `snake_case`, datas ISO 8601 com fuso (`America/Boa_Vista`).
- Listas: `?cursor=&limite=` → `{ itens, proximo_cursor }`.
- Cidadão usa **protocolo** na rota; gestão usa **id**.

**Erros (mostrar `mensagem` do core sem reescrever):**

| Status | `codigo` | Tratamento de tela |
| --- | --- | --- |
| 401 | `sessao_expirada` | Volta ao login preservando a rota |
| 403 | `sem_permissao`, `fora_do_setor` | Estado "Sem permissão" (G-02b) |
| 404 | `nao_encontrado` | Estado vazio com volta |
| 409 | `versao_desatualizada` | Recarrega o formulário novo e pede revisão antes de enviar |
| 409 | `situacao_ja_registrada` | Toast + recarrega o detalhe (G-03) |
| 409 | `cpf_ja_cadastrado` | Cadastro: "Já existe conta, entre" |
| 422 | `campo_obrigatorio`, `campo_oculto`, `canal_indisponivel`, `confirmacao_indisponivel` | Erro por campo (`campos["<formulario_id>.<chave>"]`) |
| 5xx / rede | — | Banner de erro com rascunho preservado (C-04c); PWA offline (M-13) |

## 2. Modelo de dados (resumo)

- **municipios** → localidades (Sede, Vila Tepequém…) e **secretarias → setores** (dois níveis fixos).
- **pessoas** (CPF, nome, e-mail?, telefone?) · **users** (login da pessoa; **uma conta vale em qualquer município**).
- **perfis** por município com **permissões** (`perfil_permissao`). Seed: Atendente (`abrir_para_terceiros`, `redefinir_senha`), Técnico (`criar_os`), Gestor da carta (`gerenciar_servicos`, `gerenciar_formularios`).
- **vinculos**: user × município × perfil × secretaria/setor × `inicio`/`fim`. É o que dá acesso ao painel; vínculo encerrado aparece esmaecido (G-00, G-13).
- **canais**: `portal`, `aplicativo`, `presencial`, `central_telefonica`. Restrição por categoria (`categoria_canais`) ou serviço (`servico_canais`); lista vazia = sem restrição; serviço herda da categoria até ter restrição própria.
- **categorias** (árvore) → **servicos** → **servico_versoes** (`rascunho | publicada | substituida`) → **etapas** (setor, `rotulo_publico`, `inicial`, `final`, `notifica_solicitante`, `mensagem_notificacao` com `{protocolo} {servico} {etapa} {situacao}`) → **situacoes** (origem → destino; destino nulo = encerra; `rotulo_publico`).
- **formularios** → **formulario_versoes** → **secoes** → **campos** (tipo, chave, rótulo, obrigatório) → opções, validações, **condicao_grupos/condicoes** (E/OU aninhado).
- **servico_versao_formularios**: vínculo do formulário à abertura (etapa nula) ou a uma etapa; flag `visivel_cidadao`.
- **solicitacoes** (protocolo único por município, solicitante, `aberta_por`, canal, versão do serviço, `etapa_atual_id` — nulo = encerrada, endereço, descrição) → **tramites** (etapa, situação, user, entrou/saiu, observação) → **respostas** (+ opções, arquivos).
- **notificacoes** / **notificacao_envios** — canais de notificação: `sistema`, `email`.
- **confirmacoes_cadastro** (código, 10 min, até 5 tentativas) — canais de confirmação: e-mail, SMS. `mensagens_saida` simula envio em dev.
- **ordens_servico** (secretaria, solicitação opcional — nula = **avulsa**, endereço, título, descrição, status, responsável, previsões).

**Tipos de campo:** `texto`, `texto_longo`, `numero`, `data`, `selecao`, `multipla_escolha`, `foto`, `video`, `arquivo`.
**Validações:** `tamanho_min`, `tamanho_max`, `mascara` (`#` = dígito), `data_min`, `data_max` (aceitam "hoje"), `extensao`, `tamanho_arquivo_max` (MB), `quantidade_min`, `quantidade_max`.
**Operadores de condição:** `igual`, `diferente`, `maior`, `menor`, `contem`, `preenchido`, `vazio`.
**Status de OS:** `rascunho`, `planejada`, `programada`, `em_execucao`, `suspensa`, `concluida` (final), `cancelada` (final).

## 3. Fluxo da solicitação

```
Cidadão/atendente abre ─► etapa inicial (ex.: Triagem · Protocolo)
   │   respostas de abertura podem ficar em branco → "pendências"
   │   (primeira situação BLOQUEADA até completar — C-05 / M-08 / G-03)
   ▼
Servidor lotado no setor da etapa ─► preenche formulário da etapa (sem avançar)
   ─► escolhe uma SITUAÇÃO ─► tramite fechado, etapa_atual = destino
         └ se etapa notifica_solicitante: notificação com mensagem da etapa
   ▼
… repete até situação com destino nulo ─► encerrada (Concluída / Encerrada)
   ▼
(opcional) Avaliação do atendimento — C-09 / M-14 (ver Divergências)
```

Regras-chave:
1. **Abrir** (`abrir_solicitacao` + `responder_abertura`, atômico): canal precisa estar liberado para o serviço; envia `servico_versao` carregada — se mudou → `409 versao_desatualizada`.
2. **Obrigatórios** valem igual para cidadão e atendente: abertura aceita em branco; `faltando()` lista pendências; `aplicar_situacao` recusa a primeira situação enquanto houver pendência.
3. **Completar abertura**: só antes de qualquer andamento; no painel, só quem abriu.
4. **Agir na etapa** exige estar lotado no setor da etapa (`esta_lotado`) → senão `403 fora_do_setor`; `pode_agir` vem calculado no detalhe.
5. **Condições** (`exibir_se`): o frontend avalia ao vivo para mostrar/esconder; o core reavalia e recusa resposta em campo oculto (`422 campo_oculto`).
6. **Corrida**: se outro servidor registrou situação antes → `409 situacao_ja_registrada`, recarregar.
7. **Timeline pública** (C-07/M-10) usa `rotulo_publico` da etapa e da situação (ou o nome, se não houver rótulo); mostra só respostas de formulários `visivel_cidadao`. **Histórico interno** (G-03) usa nomes internos, quem registrou, observação e canais de notificação.
8. **Abrir para terceiros** (G-04) exige `abrir_para_terceiros`; cria a pessoa se o CPF não existir.
9. **OS**: criar exige `criar_os`. Da solicitação copia o endereço (uma OS por solicitação). **Avulsa** (G-12b) sem solicitação, não notifica cidadão.

## 3b. Município e perfil automáticos

- **Não existe seleção de município** em nenhum ambiente (sem tela intermediária, sem seletor no menu, sem troca no portal/PWA).
- Servidores são cadastrados pela administração (banco / Console Orbi) com **um** vínculo ativo: município + perfil + secretaria/setor. Após o login, o BFF lê esse vínculo e já entrega o ambiente filtrado.
- O BFF define `X-Municipio` a partir do vínculo (servidor) ou do domínio do portal (`<municipio>.conecta.app`, cidadão). O frontend nunca envia um município escolhido pelo usuário.
- O bloco "Amajari · RR / Técnico · Iluminação Pública" do menu é **informativo** (`role="note"`, sem seta, sem clique). Alterar vínculo é função administrativa (Console Orbi O-04).
- "Tempo real" é comportamento padrão (SSE/consulta automática). O indicador é só um ponto verde com texto, **não interativo**.

## 4. Conta, login e senha

- Login sempre **CPF + senha**, nos dois ambientes (`POST /v1/sessao`).
- **Cadastro** (`POST /v1/cadastro`):
  - CPF novo → `201` cria pessoa e login.
  - CPF já com login → `409 cpf_ja_cadastrado`.
  - CPF é pessoa sem login (atendida pela central) → `202 confirmacao_pendente`: código enviado ao **e-mail/telefone já cadastrados**, nunca aos informados agora (C-02b / M-03). Ao confirmar, passa a ver as solicitações antigas.
  - Pessoa sem e-mail nem telefone → `422 confirmacao_indisponivel`: orientar o atendimento.
- **Senha esquecida**: e-mail é opcional, então o caminho oficial é o atendente redefinir em Pessoas e senhas (`POST /v1/pessoas/{cpf}/redefinir-senha`, exige `redefinir_senha`) — G-05.
- **Primeiro acesso** após senha definida por terceiro: troca obrigatória (G-01c, C-01b, M-01b).

## 5. Administração da carta

- Toda edição acontece em **rascunho** (`/rascunho`); editar algo publicado cria o rascunho copiando a versão atual.
- **Publicar serviço** recusa (`422`) se: não tem etapa, não tem exatamente **uma** etapa inicial, ou tem etapa sem situação. Mostrar a mensagem.
- **Publicar formulário** já usado gera versão nova de cada serviço que o usa e devolve `servicos_atualizados` (aviso em G-09).
- Solicitações abertas **continuam na versão em que nasceram** (G-07b mostra quantas).
- Campos/opções endereçados por **chave/valor** (estáveis entre versões); ids mudam a cada cópia.
- Condição de exibição: `PUT …/exibir-se` substitui a **árvore inteira** (E/OU com subgrupos).
- **Canais** (G-10): `PUT` com lista de slugs; devolve `avisos` com serviços que ficaram sem canal (não bloqueia).
- **Versões** (G-11): lista com status e quantas solicitações usam cada versão.

## 6. Notificações

- Geradas pelo core em `aplicar_situacao` quando a etapa notifica. Mensagem montada com marcadores.
- Portal: tempo real por **SSE** (`GET /v1/notificacoes/stream`). App: consulta lista e contador de `GET /v1/eu` ao abrir/voltar; push fica para depois.
- Quem não tem login nem e-mail **não recebe** (`enviada: true, canais: []`).

## 7. Permissões × telas

| Permissão | Libera |
| --- | --- |
| (vínculo ativo) | Fila do setor, Solicitação, OS do setor, Meu perfil |
| `abrir_para_terceiros` | G-04 Nova solicitação em nome de outro CPF |
| `redefinir_senha` | G-05 redefinir senha |
| `criar_os` | Criar OS (G-03, G-12b) |
| `gerenciar_servicos` | G-06, G-07, G-07b–d, G-10, G-11 |
| `gerenciar_formularios` | G-08, G-09 |
| Equipe Orbi | Console O-01…O-05 |

Sem a permissão: esconder o menu (grupo "Configuração" do menu lateral) **e** tratar `403` com o estado G-02b.

## 8. Divergências entre protótipo e core (resolver antes de implementar)

| Tema | Protótipo | Core / contrato | Recomendação |
| --- | --- | --- | --- |
| Status de OS | Aberta · Em execução · Concluída · Cancelada | rascunho · planejada · programada · em_execucao · suspensa · concluida · cancelada | Usar os 7 do core; "Aberta" = planejada/programada |
| Canais de notificação | Avisos por SMS, e-mail e app (C-10, M-12d) | `sistema` e `email` | SMS só para confirmação de cadastro por ora; esconder opção SMS de avisos ou marcar "em breve" |
| Esqueci a senha (G-01b, M-01c) | Link/código por e-mail ou SMS | Redefinição pelo atendente | Implementar só se o core ganhar fluxo de recuperação; senão, mostrar orientação do atendimento |
| Avaliação (C-09, M-14) | Desenhada | Fora da POC | Fase posterior |
| Prazos/SLA (fila, KPIs, "atrasada") | Exibidos | Fora da POC | Mostrar só quando o core tiver prazos; até lá, ocultar colunas de prazo |
| Mapa | Ilustrativo | Lat/long opcionais | MapLibre + OSM; sem coordenada, esconder o mapa |
| Console Orbi (O-01…O-05) | Desenhado | Funções `criar_municipio`, `criar_secretaria`, `criar_setor`, `criar_localidade`, `vincular` | Sem BFF definido ainda; prefixo do protocolo e modelos de estrutura são propostas de design |
| Busca global (G-15), Notificações da gestão (G-14) | Desenhadas | Sem endpoint | Definir endpoints no BFF Gestão |
| Seleção de município (G-00, C-03b, M-05) | Removidas | — | Município sempre do vínculo/domínio |
| Fonte | Poppins | Doc de estrutura cita Public Sans | **Poppins** (decisão de design) |
| Nomenclatura | Conecta+ | Doc de estrutura usa "Zeladoria", "órgão", "unidades/ltree" | Seguir modelo da POC: município, secretaria → setor, vínculo |
