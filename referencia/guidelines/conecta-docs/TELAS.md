# Inventário de telas

Formato: **código · nome** — rota sugerida · endpoint do BFF. Abaixo: propósito, layout/componentes e regras. Medidas e cores em `VISUAL.md`; regras completas em `FLUXOS.md`.
Layout padrão do **painel**: menu lateral 232 px + topbar 56 px (ver `gestao/Painel de Gestao.dc.html`) + `main` fluido (`var(--c-page)`, padding 20/24/24), cabeçalho (título 22/600, subtítulo 13) e ações à direita. Ver `VISUAL.md › Responsividade`.
Layout padrão do **portal**: cabeçalho do portal + faixa branca de título + conteúdo `max-width 1200` + rodapé (dados da prefeitura, links de termos, privacidade, acessibilidade, central 156).
Layout padrão do **PWA**: barra superior branca (voltar 44 px + título) ou cabeçalho de seção; conteúdo `#f4f6f9`; ação fixa no rodapé **ou** barra inferior de 5 abas (ver `portal/Portal PWA.dc.html`).

---

## Painel de gestão

**G-01 · Entrar** — `/login` · `POST /v1/sessao`
Duas colunas: formulário (logo do município, "Entrar no painel", CPF com ícone, senha com mostrar, Entrar, link Esqueci a senha → G-01b) e painel institucional do município. Rodapé com termos/privacidade. 401 → mensagem inline.

**G-01b · Esqueci a senha** — `/recuperar` · *(sem endpoint na POC — ver Divergências)*
Card 720 px: CPF, confirmação de envio (verde), caixa "sem e-mail? peça ao atendente → G-05", Voltar / Reenviar.

**G-01c · Primeiro acesso** — após login com senha provisória
Senha atual, nova senha com checklist (8+ caracteres, letras e números, diferente da atual, sem o CPF), confirmar, "Salvar e entrar".

**G-02 · Fila do setor** — `/fila` · `GET /v1/fila`
4 KPIs (na fila, etapa atrasada, com pendência, tempo médio). Card com abas por etapa (contador), filtros em chips (serviço, localidade, canal, com pendência), busca, ordenação "Prazo mais próximo". Tabela: Protocolo·serviço | Solicitante + canal (ícone) | Local + localidade | Etapa (selo colorido) + pendência laranja | Rótulo público (selo) | Prazo (cor por urgência) | **Atender** → G-03. "Carregar mais" (cursor). Só solicitações em etapas dos setores do usuário.

**G-02b · Estados** — vazio ("Nenhuma solicitação na Vistoria"), sem permissão (`403`), erro de carga (tentar de novo / suporte).

**G-03 · Solicitação (atendimento)** — `/solicitacoes/:id` · `GET /v1/solicitacoes/{id}`, `PUT …/etapa-atual/respostas`, `POST …/situacao`
Tudo numa tela. Cabeçalho: protocolo, selo do rótulo público, selo de atraso, serviço e versão, canal e data; ações Imprimir / Criar OS. Stepper das etapas. Coluna principal: **Etapa atual** (borda azul) com aviso de pendências, formulário da etapa e **situações** (bloqueadas com cadeado enquanto houver pendência; cada uma mostra o rótulo público resultante); **Abertura** (respostas, "visível ao cidadão"); **Etapas anteriores** (quem, situação, observação). Lateral: solicitante (CPF mascarado, contatos), local com mapa, OS vinculada ou "Criar OS", histórico interno. `pode_agir=false` → somente leitura. `409 situacao_ja_registrada` → recarregar.
**Canvas técnico (G-03):** substitui a timeline. Nós = Abertura, cada etapa da versão do serviço e o encerramento; arestas = situações. Estados: concluída (borda verde, check), atual (borda e fundo azuis, selo "Atual", responsável, atraso e pendências), pendente (borda tracejada). Arestas percorridas são linhas verdes cheias com o nome da situação aplicada; caminhos possíveis a partir da etapa atual são tracejados e saem **somente** das situações cadastradas (`situacoes` com origem = etapa atual); destino nulo = nó terminal "Encerrada"; situação que pausa leva ao nó "Aguardando cidadão". Abaixo, tabela de movimentações (data, etapa origem → destino, situação + observação, responsável, canais de aviso). Rolagem horizontal só abaixo de 980 px.


**G-04 · Nova solicitação** — `/nova` · `GET /v1/pessoas?cpf=`, `GET /v1/catalogo?canal=`, `GET /v1/servicos/{id}/abertura`, `POST /v1/solicitacoes`
Passos em cards: 1 Solicitante (CPF + buscar → resultado; cria pessoa se não existir), canal (Presencial | Central telefônica); 2 Serviço e local (serviço com versão, localidade, logradouro, referência, descrição); 3 Formulário de abertura (campo pendente em laranja "Fica pendente"). Resumo lateral com primeira etapa, aviso "Abre com N pendências", Abrir solicitação, imprimir comprovante (G-04b). Exige `abrir_para_terceiros` se o CPF não é do usuário.

**G-04b · Comprovante do protocolo** (= C-04d) — impresso A4
Cabeçalho com brasão e município, protocolo em destaque + QR, dados da solicitação, descrição, pendência, próximas etapas, assinaturas atendente/solicitante, rodapé com endereço.

**G-05 · Pessoas e senhas** — `/pessoas` · `GET /v1/pessoas?cpf=`, `POST /v1/pessoas`, `POST /v1/pessoas/{cpf}/redefinir-senha`
Duas colunas: Buscar pessoa (cartão com selo "Sem e-mail", contatos, último acesso, solicitações; bloco **Redefinir senha** com aviso "entregue pessoalmente, troca no primeiro acesso") e Cadastrar pessoa (CPF, nome, e-mail e telefone opcionais, liberar acesso ao portal + senha inicial).

**G-06 · Carta de serviços** — `/carta` · `GET /v1/carta` · `gerenciar_servicos`
Árvore de categorias à esquerda; tabela de serviços: nome + categoria | versão (+ "v3 em rascunho") | status | canais | em uso | → G-07. Ações Nova categoria / Novo serviço.

**G-07 · Editor de serviço** — `/servicos/:id` · `GET /v1/servicos/{id}/editor`, rotas `/rascunho/*`, `POST …/publicar`
Cabeçalho com selo "Rascunho vN", versão publicada e uso; canais (link G-10); ações Descartar rascunho / Prévia (G-07d) / Publicar (G-07b). Fluxo de etapas em colunas (nome, setor, rótulo público, situações com destino, formulário vinculado), etapa selecionada com painel de propriedades (nome, setor, rótulo público, formulário, notifica solicitante + mensagem com marcadores). Formulário de abertura vinculado.

**G-07b · Publicar versão** — diálogo · `POST /v1/servicos/{id}/publicar`
Quantas solicitações continuam na versão atual, canais, lista do que muda (Nova / Alterada / Formulário), nota da versão. `422` → listar o motivo (sem etapa inicial única, etapa sem situação…).

**G-07c · Editar situação** — drawer · `POST/DELETE …/situacoes`
Nome interno, rótulo público, destino (avançar para etapa X / voltar / encerrar = `leva_para_etapa_id null`), opções (avisar cidadão, exigir formulário completo, pedir justificativa), remover.

**G-07d · Prévia do serviço** — tela cheia
Barra escura com selo "Prévia · rascunho", alternar Computador/Celular, simular canal, fechar. Renderiza C-04 com o rascunho e as etapas que o cidadão verá (novas marcadas).

**G-08 · Formulários** — `/formularios` · `GET /v1/formularios` · `gerenciar_formularios`
Busca, segmentado Todos / Publicados / Rascunhos. Tabela: formulário | versão (+ rascunho) | status | seções · campos | usado em | publicado | ações.

**G-09 · Editor de formulário** — `/formularios/:id` · `GET …/editor`, rotas `/rascunho/*`, `PUT …/exibir-se`, `POST …/publicar`
Aviso de impacto (serviços que ganham versão nova). Três colunas: Estrutura (seções e campos arrastáveis, selo "se" em campo condicional), Propriedades do campo (rótulo, tipo, máscara, validação, ajuda, obrigatório, visível ao cidadão, **Mostrar quando** com Todas (E) / Qualquer (OU) e linhas campo-operador-valor) e Prévia no portal.

**G-10 · Canais** — `/canais` · `GET /v1/canais/matriz`, `PUT /v1/categorias|servicos/{id}/canais`
Matriz categoria/serviço × Portal · Aplicativo · Presencial · Central telefônica. Linhas de categoria com fundo cinza; serviço com selo "Herda da categoria" (checks azul-claro) ou "Restrição própria". Contador de alterações não salvas + Salvar. Mostrar `avisos` de serviços sem canal.

**G-11 · Versões** — `/versoes` · `GET /v1/versoes`
Tabela: nome | tipo (serviço/formulário) | versão | status (Rascunho laranja, Publicado verde, Substituído cinza) | publicada em | solicitações que usam | ação.

**G-12 · Ordens de serviço** — `/os` · `GET /v1/os`, `PATCH /v1/os/{id}/status`
KPIs-filtro por status. Tabela: OS | título + responsável | solicitação vinculada ou — | origem (Solicitação / **Avulsa** laranja) | setor | status | criada.

**G-12b · OS avulsa** — drawer · `POST /v1/os` · `criar_os`
Secretaria e setor, título, localidade, responsável, instruções; aviso "não gera aviso ao cidadão".

**G-12c · Detalhe da OS** — `/os/:id`
Cabeçalho com status e solicitação de origem; Imprimir (G-12d) / Concluir OS. Instruções com selos (risco elétrico, materiais), registro de execução (formulário da etapa, fotos), materiais usados; lateral com responsável, mapa e histórico.

**G-12d · OS impressa** — A4 para a equipe de campo (ver `gestao/OS impressa (A4).html`)
Dados, instruções com alerta de risco, tabela de materiais previsto/usado, campos início/término/poste, observações, checkboxes de resultado, assinaturas.

**G-16 · Configurações** — `/configuracoes` (item fixo no rodapé do menu)
Hub único de ajustes, filtrado por perfil: Preferências (Meu perfil, Aparência claro/escuro, Notificações) · Catálogo e atendimento (Carta, Formulários, Canais, Versões — exige `gerenciar_servicos`/`gerenciar_formularios`) · Usuários e acessos (vínculos e perfis: **somente informativo**) · Dados institucionais (somente leitura, mantidos pela Orbi).

**G-13 · Meu perfil** — `/perfil` (cartão do usuário no menu)
Dados pessoais, lista de vínculos (ativo/encerrado), trocar senha, sessões ativas + "Sair de todas".

**G-14 · Notificações** — painel do sino
Abas Não lidas / Todas, itens com ícone por tipo (atraso vermelho, pendência resolvida verde, nova solicitação azul), ponto azul de não lida, marcar como lidas, link Preferências → G-13.

**G-15 · Busca global** — atalho `/` na topbar
Resultados agrupados: Solicitações (com selo de status), Pessoas, Localidades e OS; navegação por teclado; "Ver todos".

## Console Orbi (menu escuro `Conecta Orbi Sidebar`)

**O-01 · Municípios** — KPIs (ativos, em implantação, vínculos, chamados); tabela: município + UF | prefixo | implantação (4 segmentos + fase) | vínculos | serviços | status.
**O-02 · Novo município, passo 1** — dados da prefeitura (município, UF, IBGE, nome no portal, **prefixo do protocolo** 3 letras imutável, site, central, e-mail, brasão); prévia do protocolo `PAC-2026-000001`. · `criar_municipio`
**O-02b · Passo 2: estrutura** — modelo inicial (pequena / média / em branco) + secretarias com setores; localidade Sede. · `criar_secretaria`, `criar_setor`, `criar_localidade`
**O-02c · Passo 3: primeiros vínculos** — tabela editável CPF | nome | perfil | setor | acesso (já tem conta / senha provisória); importar planilha. · `criar_pessoa`, `criar_usuario`, `vincular`
**O-02d · Passo 4: revisar e ativar** — lista de verificação (ok verde / atenção laranja com link), prévia do portal, switches Ativar painel / Abrir portal, "Ativar <município>".
**O-03 · Estrutura** — secretarias expansíveis com setores e nº de pessoas; localidades com tipo e nº de endereços; importar planilha.
**O-04 · Vínculos** — tabela pessoa | perfil · setor | status; drawer Novo vínculo (CPF com verificação de conta existente, perfil em cards, secretaria/setor, início/fim, permissões extras).
**O-05 · Suporte** — lista de chamados (prioridade por cor) + detalhe com conversa, **diagnóstico do vínculo** (conta, vínculo, setor) e resposta.

## Portal do cidadão (web)

**C-01 · Entrar** — `/entrar` · `POST /v1/sessao` — CPF, senha, Entrar, Criar conta; nota para quem já foi atendido pela central; painel com imagem do município.
**C-01b · Primeiro acesso** — nova senha com medidor, confirmar, celular para avisos.
**C-02 · Cadastro (passo 1)** — `/cadastro` · `POST /v1/cadastro` — CPF, nome, e-mail, telefone, senha + medidor, confirmar, canal do código, aceite de termos. Tratar `201/202/409/422`.
**C-02b · Código de confirmação (passo 2)** — `POST /v1/cadastro/confirmar` — 6 dígitos, destino mascarado, reenviar com contador, trocar canal.
**C-03 · Catálogo** — `/` · `GET /v1/catalogo` — saudação, busca grande, banner laranja de pendência (→ C-05), chips de categoria (→ C-03d), grade 3 col. de serviços (ícone, categoria, resumo, prazo, Solicitar).
**C-03c · Busca sem resultado** — sugestões de termos, ver todos, solicitação geral; lateral com central 156 e Protocolo.
**C-03d · Categoria** — menu de categorias à esquerda, lista de serviços com prazo e Solicitar.
**C-04 · Serviço / abrir solicitação** — `/servicos/:id` · `GET /v1/servicos/{id}`, `POST /v1/arquivos`, `POST /v1/solicitacoes` — conteúdo público, passos Local (localidade, logradouro, referência, mapa/minha localização) e Sobre o problema (formulário dinâmico; foto "pode enviar depois"), resumo lateral com Enviar / Salvar rascunho, "Como funciona".
**C-04b · Solicitação enviada** — protocolo com copiar, Acompanhar / Voltar, "O que acontece agora".
**C-04c · Erro ao enviar** — banner vermelho, rascunho preservado, Tentar de novo, dicas e código do erro.
**C-04d · Comprovante** — igual a G-04b.
**C-05 · Completar abertura** — `PUT /v1/solicitacoes/{protocolo}/abertura` — aviso de que o atendimento só começa após o envio, campo pendente em destaque, "Já informado", botão desabilitado até preencher.
**C-06 · Minhas solicitações** — `GET /v1/solicitacoes` — abas Em andamento / Concluídas; cards com protocolo, rótulo público, progresso, local, atualização; ação "Completar agora" quando há pendência.
**C-06b · Vazio** — ilustração, "Fazer uma solicitação", sugestões, nota sobre atendimentos da central.
**C-07 · Acompanhamento** — `GET /v1/solicitacoes/{protocolo}` — stepper público, timeline com rótulos públicos, respostas visíveis, mapa do local, descrição.
**C-08 · Notificações** — `GET /v1/notificacoes`, `POST …/lidas`, SSE `…/stream` — selo "Ao vivo", marcar todas como lidas, itens com não lida em azul.
**C-09 · Avaliação** — nota em 5 níveis, o que deu certo (chips), comentário. *(fase posterior)*
**C-10 · Meu perfil** — dados (nome social opcional), avisos, excluir conta (LGPD).
**C-10b · Menu da conta** — perfil, minhas solicitações, trocar município, ajuda, sair.

## PWA do cidadão

**M-00 Instalar o app** (bottom sheet de instalação) · **M-01 Entrar** · **M-01b Primeiro acesso** · **M-01c Esqueci a senha** · **M-02 Cadastro** · **M-03 Código** · **M-04 Início** (saudação, busca, alerta de pendência, carrossel Em andamento, categorias → M-15) · **M-04b Busca sem resultado** · **M-06a Escolher serviço** (botão central Solicitar) · **M-06 Solicitar · local** (passo 1/3, mapa + campos) · **M-07 Solicitar · problema** (passo 2/3, opções em cartões, fotos câmera/galeria) · **M-07b Revisar** (passo 3/3, editar por bloco, confirmação) · **M-07c Enviada** (protocolo, compartilhar) · **M-08 Completar solicitação** · **M-09 Minhas solicitações** · **M-09b Vazio** · **M-10 Acompanhar** · **M-11 Avisos** (agrupados Hoje / Esta semana / Anteriores) · **M-12 Perfil** · **M-12b Dados pessoais** · **M-12c Senha** · **M-12d Avisos (preferências)** · **M-12e Tamanho do texto** (+ alto contraste) · **M-12f Privacidade e termos** · **M-13 Sem conexão** (banner amarelo, rascunho na fila de envio) · **M-14 Avaliação** · **M-15 Serviços da categoria**.

Mesmos endpoints do BFF Cidadão; canal gravado = `aplicativo`. Regras de PWA: manifest + service worker; rascunho salvo localmente e enviado quando a conexão voltar (proposta de design); câmera via `<input capture>`.
