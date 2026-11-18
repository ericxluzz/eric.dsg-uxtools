# Conecta+ — BFFs

Oct 27, 2026 · @Pablo

## Visão geral

São dois BFFs, um por tipo de cliente, na frente de uma API de domínio (o core) que concentra todas as regras do modelo. O BFF Cidadão atende o portal e o aplicativo; o BFF Gestão atende o painel dos servidores e o admin da carta de serviços.

&#91;embedded content: arquitetura · 4 frontends, 2 BFFs, 1 core\]

Cada BFF chama o core com a própria credencial e o token do usuário da sessão.

| Camada | Faz | Não faz |
| --- | --- | --- |
| BFF | Sessão; junta várias consultas do core numa resposta por tela; converte o modelo normalizado em JSON pronto para desenhar; define o canal no BFF Cidadão | Decidir permissão, validar formulário, mover fluxo, versionar, notificar |
| Core | Todas as regras que hoje estão nas funções do `conecta_poc.sql`; isolamento por município; envio de e-mail | Saber como cada tela é desenhada |

Uma regra que aparece no frontend (esconder um campo pela condição, esconder um botão sem permissão) é só conforto de tela: o core decide de novo em toda escrita.

## Autenticação e sessão

A sessão fica no BFF: o frontend nunca vê o token do core. O login é sempre CPF + senha, porque a conta (`users`) pertence à pessoa e vale em qualquer município.

| Cliente | Como guarda a sessão | Observação |
| --- | --- | --- |
| Portal do cidadão (web) | Cookie `httpOnly`, `Secure`, `SameSite=Lax` | Requisições que alteram dados levam o header `X-CSRF-Token` |
| Aplicativo | Token opaco no header `Authorization: Bearer` | Expiração deslizante; revogado no logout |
| Painel e admin (web) | Cookie, como o portal | Mesmo BFF Gestão, mesma sessão |

**Fluxo de login.** `POST /v1/sessao` com `cpf` e `senha` → o BFF autentica no core, recebe o token do usuário e guarda os dois numa sessão do lado do servidor (Redis ou equivalente). O frontend recebe só o cookie ou o token opaco.

**BFF → core.** Cada chamada leva duas identidades: a credencial do próprio BFF (qual BFF está chamando) e o token do usuário. Assim o core recusa uma operação de gestão que chegue pelo BFF Cidadão, mesmo que o usuário tenha um vínculo de servidor.

**Canal.** O canal da solicitação não vem do frontend no BFF Cidadão: o BFF o define pelo cliente (`portal` no web, `aplicativo` no app). No BFF Gestão, o atendente informa `presencial` ou `central_telefonica`. O core confere se o serviço está liberado no canal.

**Senha esquecida.** Como o e-mail é opcional, quem redefine é o atendente: `POST /v1/pessoas/{cpf}/redefinir-senha` no BFF Gestão. Exige a permissão redefinir\_senha.

## Convenções comuns

Os dois BFFs falam REST/JSON, um endpoint por tela ou ação, com prefixo `/v1`, campos em `snake_case` e datas ISO 8601 com fuso (`2026-10-25T08:58:00-04:00`).

- **Município ativo:** header `X-Municipio: <id>` em todo request depois do login. O BFF repassa ao core, que aplica o isolamento por linha. Quem tem vínculo em mais de um município escolhe o ativo a partir de `GET /v1/eu`.
- **Identificadores:** o cidadão usa o protocolo (`AMA-2026-000001`) nas rotas; a gestão usa o `id`.
- **Listas:** `?cursor=&limite=` → `{"itens": [...], "proximo_cursor": "..."}`.
- **Permissões na tela:** `GET /v1/eu` devolve os slugs de permissão do vínculo ativo, só para mostrar ou esconder botões. Quem decide é sempre o core.

**Erros.** O core devolve um código de regra, e o BFF repassa código e mensagem sem reescrever a regra.

| Status | Quando | `codigo` de exemplo |
| --- | --- | --- |
| 401 | Sem sessão ou sessão expirada | `sessao_expirada` |
| 403 | Falta permissão ou lotação no setor da etapa | `sem_permissao`, `fora_do_setor` |
| 404 | Não existe ou é de outro município | `nao_encontrado` |
| 409 | O estado mudou entre carregar e enviar | `versao_desatualizada`, `situacao_ja_registrada` |
| 422 | Regra de negócio ou validação de formulário | `canal_indisponivel`, `campo_obrigatorio`, `campo_oculto` |

```json
{
  "erro": {
    "codigo": "campo_obrigatorio",
    "mensagem": "Campos obrigatórios sem resposta: Fotos do problema.",
    "campos": { "1.fotos": "Obrigatório." }
  }
}
```

As chaves de `campos` são `<formulario_id>.<chave>`, porque a mesma chave pode existir em dois formulários do mesmo momento.

**Formulário pronto para desenhar.** O core guarda formulários normalizados (versão, seções, campos, opções, validações, grupos e condições). Os dois BFFs entregam o mesmo formato aninhado, usado na abertura, nas etapas e no admin:

```json
{
  "formulario_id": 1,
  "versao": 2,
  "nome": "Dados do poste",
  "secoes": [
    {
      "id": 5,
      "titulo": "Sobre o poste",
      "exibir_se": null,
      "campos": [
        {
          "chave": "possui_numero",
          "tipo": "selecao",
          "rotulo": "O poste tem número pintado?",
          "obrigatorio": true,
          "opcoes": [{ "valor": "sim", "rotulo": "Sim" }, { "valor": "nao", "rotulo": "Não" }],
          "regras": {},
          "exibir_se": null
        },
        {
          "chave": "numero_poste",
          "tipo": "texto",
          "rotulo": "Qual o número?",
          "obrigatorio": true,
          "regras": { "mascara": "P-####" },
          "exibir_se": {
            "logica": "E",
            "condicoes": [{ "formulario_id": 1, "chave": "possui_numero", "operador": "igual", "valor": "sim" }],
            "grupos": []
          }
        }
      ]
    }
  ]
}
```

O frontend avalia `exibir_se` enquanto a pessoa preenche, para mostrar e esconder campos e seções. Ao enviar, o core avalia de novo e recusa resposta em campo oculto.

**Respostas.** Sempre uma lista, nos dois BFFs:

```json
"respostas": [
  { "formulario_id": 1, "chave": "tipo_local", "valor": "estrada_vicinal" },
  { "formulario_id": 1, "chave": "fotos", "valor": ["arq_8f2c", "arq_91ab"] }
]
```

`valor` é texto, o `valor` da opção (lista em múltipla escolha) ou a lista de ids de arquivos.

**Arquivos.** Vão direto para o storage, nos dois BFFs: `POST /v1/arquivos` devolve uma URL assinada e o id do arquivo, o frontend envia o arquivo com `PUT` nessa URL e a resposta do formulário cita o id. Ao gravar a resposta, o core confere se o arquivo chegou, o tipo e o tamanho.

```json
POST /v1/arquivos
{ "nome": "poste1.jpg", "mime": "image/jpeg", "tamanho_bytes": 812345 }

201
{ "arquivo_id": "arq_8f2c", "upload_url": "https://storage.exemplo/…?assinatura=…", "expira_em": "2026-10-27T09:20:00-04:00" }
```

## BFF Cidadão (portal e aplicativo)

O portal e o app usam os mesmos endpoints; a única diferença é a sessão (cookie ou token) e o canal que o BFF grava.

| Tela | Método e rota | Devolve ou faz |
| --- | --- | --- |
| Login | `POST /v1/sessao` · `DELETE /v1/sessao` | Abre ou encerra a sessão |
| Cadastro | `POST /v1/cadastro` · `POST /v1/cadastro/confirmar` | Cria pessoa e login; confirma por código quando o CPF já é pessoa (detalhe abaixo) |
| Topo do app | `GET /v1/eu` | Nome, município ativo, notificações não lidas |
| Catálogo | `GET /v1/catalogo` | Árvore de categorias só com os serviços liberados no canal do cliente |
| Serviço | `GET /v1/servicos/{id}` | Conteúdo público, versão atual, formulários de abertura, localidades |
| Envio de foto ou arquivo | `POST /v1/arquivos` | URL assinada para enviar direto ao storage e o id do arquivo |
| Abrir solicitação | `POST /v1/solicitacoes` | Protocolo e situação inicial |
| Completar abertura | `PUT /v1/solicitacoes/{protocolo}/abertura` | Grava o que faltou; só antes de qualquer andamento |
| Minhas solicitações | `GET /v1/solicitacoes` | Lista paginada com a situação pública de cada uma |
| Acompanhamento | `GET /v1/solicitacoes/{protocolo}` | Dados, timeline pública, respostas visíveis e pendências da abertura |
| Notificações | `GET /v1/notificacoes` · `POST /v1/notificacoes/lidas` · `GET /v1/notificacoes/stream` | Lista, marca como lidas, recebe em tempo real no portal (SSE) |

**Cadastro.** Pede os mesmos dados que o atendente usa (CPF, nome, e-mail e telefone opcionais) e a senha. O resultado depende do CPF:

| CPF | Resposta |
| --- | --- |
| Não existe | `201`: cria pessoa e login |
| Já tem login | `409 cpf_ja_cadastrado` |
| É pessoa sem login (já atendida pela central) | `202 confirmacao_pendente`: envia um código ao e-mail ou telefone **já cadastrados** na pessoa, nunca aos informados agora |
| É pessoa sem login e sem e-mail nem telefone | `422 confirmacao_indisponivel`: orienta procurar o atendimento |

```json
POST /v1/cadastro
{ "cpf": "22222222222", "nome": "João Macuxi", "email": null, "telefone": "95991234567", "senha": "…" }

202
{ "confirmacao": { "id": "cf_31a9", "canal": "telefone", "destino": "(95) 9****-4567", "expira_em": "2026-10-27T09:21:00-04:00" } }

POST /v1/cadastro/confirmar
{ "confirmacao_id": "cf_31a9", "codigo": "482913" }

201
{ "sessao": "aberta" }
```

Só depois da confirmação o login é ligado à pessoa e ela passa a ver as solicitações antigas. Se a pessoa tem e-mail e telefone, ela escolhe por onde receber o código.

**Catálogo.** O BFF resolve a hierarquia de canais no core e devolve só o que aparece; categorias vazias no canal não vêm.

```json
{
  "canal": "aplicativo",
  "categorias": [
    {
      "id": 1,
      "nome": "Infraestrutura urbana",
      "servicos": [],
      "categorias": [
        {
          "id": 2,
          "nome": "Iluminação",
          "servicos": [{ "id": 1, "nome": "Poste apagado", "resumo": "Prazo estimado de 10 dias úteis." }],
          "categorias": []
        }
      ]
    }
  ]
}
```

**Serviço.** Junta o conteúdo público, a versão que será usada e os formulários de abertura no formato das convenções.

```json
{
  "id": 1,
  "nome": "Poste apagado",
  "conteudo_publico": "Prazo estimado de 10 dias úteis. Informe o local e, se possível, o número do poste. Gratuito.",
  "servico_versao": 2,
  "localidades": [{ "id": 1, "nome": "Sede" }, { "id": 3, "nome": "Vila Tepequém" }],
  "formularios": [{ "formulario_id": 1, "versao": 2, "nome": "Dados do poste", "secoes": ["..."] }]
}
```

**Abrir solicitação.** O frontend devolve a versão que carregou. Se o serviço ganhou versão nova nesse meio-tempo, a resposta é `409 versao_desatualizada` com o formulário novo, e a pessoa revisa antes de enviar.

```json
POST /v1/solicitacoes
{
  "servico_id": 1,
  "servico_versao": 2,
  "localidade_id": 3,
  "logradouro": "Estrada da Serra do Tepequém, km 4",
  "referencia": "Próximo à ponte",
  "descricao": "Poste apagado há uma semana.",
  "respostas": [
    { "formulario_id": 1, "chave": "tipo_local", "valor": "estrada_vicinal" },
    { "formulario_id": 1, "chave": "possui_numero", "valor": "nao" },
    { "formulario_id": 1, "chave": "periodo_apagado", "valor": "noite" },
    { "formulario_id": 1, "chave": "fotos", "valor": ["arq_8f2c"] }
  ]
}

201
{ "protocolo": "AMA-2026-000001", "situacao": "Recebida pela central" }
```

O solicitante é sempre a pessoa da sessão. Abrir em nome de outra pessoa só existe no BFF Gestão.

A abertura aceita campos obrigatórios em branco, igual ao atendimento: a solicitação nasce incompleta, o acompanhamento lista as pendências e a primeira situação é barrada até completar. Na abertura, o `422` vem só de valor inválido (máscara, opção, extensão, quantidade) ou de resposta em campo oculto.

**Acompanhamento.** A timeline mostra o rótulo público da etapa e da situação (ou o nome, sem rótulo) e o setor. As respostas de etapa só vêm quando o formulário está marcado como visível ao cidadão naquele serviço.

```json
{
  "protocolo": "AMA-2026-000001",
  "servico": "Poste apagado",
  "encerrada": true,
  "local": { "localidade": "Vila Tepequém", "logradouro": "Estrada da Serra do Tepequém, km 4", "referencia": "Próximo à ponte" },
  "timeline": [
    { "etapa": "Recebida pela central", "setor": "Central de Atendimento", "situacao": "Encaminhada para vistoria", "entrou_em": "2026-10-25T08:11:00-04:00", "saiu_em": "2026-10-25T08:58:00-04:00" },
    { "etapa": "Vistoria", "setor": "Vistoria", "situacao": "Reparo necessário", "entrou_em": "2026-10-25T08:58:00-04:00", "saiu_em": "2026-10-25T09:45:00-04:00" },
    { "etapa": "Em reparo", "setor": "Iluminação Pública", "situacao": "Problema resolvido", "entrou_em": "2026-10-25T09:45:00-04:00", "saiu_em": "2026-10-25T12:17:00-04:00" }
  ],
  "respostas": [
    { "momento": "Abertura", "pergunta": "Onde fica o poste?", "resposta": "Estrada vicinal" },
    { "momento": "Vistoria", "pergunta": "Tipo de reparo", "resposta": "Reator" }
  ]
}
```

**Notificações.** `GET /v1/notificacoes` lista as notificações da pessoa: mensagem já montada, protocolo, data e se foi lida. No portal, chegam em tempo real por SSE: `GET /v1/notificacoes/stream` (`text/event-stream`), em que cada evento `notificacao` traz o mesmo JSON de um item da lista. O app, por enquanto, consulta a lista e o contador de `GET /v1/eu` ao abrir e ao voltar para a tela; push fica para depois.

O e-mail sai do core e não passa pelo BFF. Quem não tem login nem e-mail não recebe notificação.

## BFF Gestão — painel dos servidores

O trabalho do BFF aqui é montar a tela de detalhe: uma solicitação junta dados, abertura, respostas por etapa, formulário da etapa atual, situações, pendências, OS e histórico, que no core são consultas separadas.

| Tela | Método e rota | Devolve ou faz |
| --- | --- | --- |
| Login e contexto | `POST /v1/sessao` · `GET /v1/eu` | Vínculos (município, perfil, secretaria, setor) e permissões do vínculo ativo |
| Fila | `GET /v1/fila` | Solicitações paradas em etapas dos setores onde a pessoa está lotada |
| Detalhe | `GET /v1/solicitacoes/{id}` | A tela inteira em uma chamada (exemplo abaixo) |
| Completar abertura | `PUT /v1/solicitacoes/{id}/abertura` | Grava respostas de abertura; só quem abriu e antes de qualquer andamento |
| Formulário da etapa | `PUT /v1/solicitacoes/{id}/etapa-atual/respostas` | Grava respostas da etapa atual sem avançar |
| Registrar situação | `POST /v1/solicitacoes/{id}/situacao` | Move o fluxo e, se a etapa notifica, gera a notificação |
| Buscar pessoa | `GET /v1/pessoas?cpf=` | Nome e se tem login, para o atendimento |
| Cadastrar pessoa | `POST /v1/pessoas` | CPF e nome de quem não tem cadastro |
| Redefinir senha | `POST /v1/pessoas/{cpf}/redefinir-senha` | Redefine a senha (sem e-mail); exige redefinir\_senha |
| Catálogo do atendimento | `GET /v1/catalogo?canal=presencial` | Serviços liberados no canal escolhido pelo atendente |
| Abertura do serviço | `GET /v1/servicos/{id}/abertura` | Os mesmos formulários do BFF Cidadão |
| Novo atendimento | `POST /v1/solicitacoes` | Abre em nome do CPF informado; exige `abrir_para_terceiros` se não for o próprio |
| Ordens de serviço | `GET /v1/os` · `POST /v1/solicitacoes/{id}/os` · `POST /v1/os` · `PATCH /v1/os/{id}/status` | Lista, cria a partir da solicitação (endereço copiado), cria avulsa, muda status; criar exige criar\_os |

**Detalhe.** Os blocos que o frontend só mostra quando pode agir vêm com uma flag de ação calculada pelo core para a pessoa da sessão.

```json
{
  "id": 2,
  "protocolo": "AMA-2026-000002",
  "servico": { "nome": "Poste apagado", "versao": 1 },
  "solicitante": { "nome": "João Macuxi", "tem_login": false, "tem_email": false },
  "aberta_por": { "nome": "Ana Lima", "canal": "presencial" },
  "local": { "localidade": "Sede", "logradouro": "Rua Principal, 120", "referencia": "Em frente à escola" },
  "descricao": "Lâmpada piscando a noite toda.",
  "abertura": {
    "pode_editar": true,
    "formularios": [{ "formulario_id": 1, "versao": 1, "secoes": ["..."] }],
    "respostas": [{ "formulario_id": 1, "chave": "tipo_local", "valor": "rua" }]
  },
  "etapas_anteriores": [],
  "etapa_atual": {
    "nome": "Triagem",
    "setor": "Central de Atendimento",
    "pode_agir": true,
    "notifica_solicitante": true,
    "formularios": [],
    "respostas": [],
    "situacoes": [
      { "id": 1, "nome": "Procedente", "leva_para": "Vistoria" },
      { "id": 2, "nome": "Improcedente — fora da competência", "leva_para": null }
    ],
    "pendencias": [{ "formulario_id": 1, "chave": "fotos", "pergunta": "Fotos do problema" }]
  },
  "os": null,
  "historico": [
    { "etapa": "Triagem", "setor": "Central de Atendimento", "situacao": null, "por": null, "entrou_em": "2026-10-24T15:50:00-04:00", "notificacao": null }
  ]
}
```

O histórico interno usa nomes internos (não os rótulos públicos), quem registrou cada situação, a observação e, quando houve notificação, por quais canais saiu (ou que não havia canal).

**Registrar situação.**

```json
POST /v1/solicitacoes/2/situacao
{ "situacao_id": 1, "observacao": "Local confirmado por telefone." }

200
{
  "encerrada": false,
  "etapa_atual": "Vistoria",
  "notificacao": { "enviada": true, "canais": [] }
}
```

`canais` vazio com `enviada: true` é o caso de quem não tem login nem e-mail: a notificação fica registrada, mas não chega. Se outra pessoa do setor registrou uma situação antes, a resposta é `409 situacao_ja_registrada` e o frontend recarrega o detalhe.

## BFF Gestão — admin da carta

Toda edição acontece no rascunho: as rotas de escrita ficam sob `/rascunho`, e editar algo publicado começa criando o rascunho, que o core copia da versão atual. Exige `gerenciar_servicos` ou `gerenciar_formularios`.

**Apoio.** `GET /v1/referencias` devolve numa chamada as listas que os editores usam: setores com secretaria, canais, tipos de campo, tipos de validação e operadores. Mudam pouco e podem ficar em cache.

**Serviços e fluxo**

| Ação | Método e rota |
| --- | --- |
| Árvore da carta (categorias, serviços, status) | `GET /v1/carta` |
| Criar categoria | `POST /v1/categorias` |
| Criar serviço (nasce em rascunho) | `POST /v1/servicos` |
| Editor do serviço (rascunho ou publicada) | `GET /v1/servicos/{id}/editor` |
| Começar a editar · descartar rascunho | `POST /v1/servicos/{id}/rascunho` · `DELETE /v1/servicos/{id}/rascunho` |
| Etapas | `POST /v1/servicos/{id}/rascunho/etapas` · `PATCH` e `DELETE …/etapas/{etapa_id}` |
| Situações | `POST …/etapas/{etapa_id}/situacoes` · `DELETE …/situacoes/{situacao_id}` |
| Vincular formulário (abertura ou etapa) | `POST /v1/servicos/{id}/rascunho/formularios` · `DELETE …/formularios/{vinculo_id}` |
| Publicar | `POST /v1/servicos/{id}/publicar` |

```json
POST /v1/servicos/1/rascunho/etapas
{
  "nome": "Execução",
  "setor_id": 3,
  "rotulo_publico": "Em reparo",
  "inicial": false,
  "notifica_solicitante": true,
  "mensagem_notificacao": "{servico} ({protocolo}): {situacao}. Obrigado por avisar."
}

POST /v1/servicos/1/rascunho/etapas/7/situacoes
{ "nome": "Devolver à central", "leva_para_etapa_id": 6, "rotulo_publico": "Em reanálise" }

POST /v1/servicos/1/rascunho/formularios
{ "formulario_id": 2, "etapa_id": 7, "visivel_cidadao": true }
```

`leva_para_etapa_id: null` encerra a solicitação. Publicar é recusado com `422` se o serviço não tem etapa, não tem exatamente uma etapa inicial ou tem etapa sem situação; a mensagem diz qual.

**Formulários**

| Ação | Método e rota |
| --- | --- |
| Lista com status | `GET /v1/formularios` |
| Criar (nasce em rascunho) | `POST /v1/formularios` |
| Editor (rascunho ou publicada, no formato das convenções) | `GET /v1/formularios/{id}/editor` |
| Começar a editar · descartar rascunho | `POST` e `DELETE /v1/formularios/{id}/rascunho` |
| Seções | `POST /v1/formularios/{id}/rascunho/secoes` · `PATCH` e `DELETE …/secoes/{secao_id}` |
| Campos | `POST …/secoes/{secao_id}/campos` · `PATCH` e `DELETE /v1/formularios/{id}/rascunho/campos/{chave}` |
| Opções | `POST …/campos/{chave}/opcoes` · `DELETE …/opcoes/{valor}` |
| Regras | `POST …/campos/{chave}/regras` · `DELETE …/regras/{regra_id}` |
| Condição de exibição | `PUT` e `DELETE …/campos/{chave}/exibir-se` · `PUT` e `DELETE …/secoes/{secao_id}/exibir-se` |
| Publicar | `POST /v1/formularios/{id}/publicar` |

Campos e opções são endereçados por chave e valor, que se mantêm entre versões; os ids mudam a cada cópia de rascunho.

A condição vai inteira, como árvore. O core guarda grupos e condições em linhas; o `PUT` substitui a árvore toda do alvo, para o frontend não ter de controlar ids de grupo.

```json
PUT /v1/formularios/2/rascunho/secoes/4/exibir-se
{
  "logica": "OU",
  "condicoes": [{ "formulario_id": 1, "chave": "tipo_local", "operador": "igual", "valor": "praca" }],
  "grupos": [
    {
      "logica": "E",
      "condicoes": [
        { "formulario_id": 1, "chave": "tipo_local", "operador": "igual", "valor": "estrada_vicinal" },
        { "formulario_id": 1, "chave": "possui_numero", "operador": "igual", "valor": "nao" }
      ],
      "grupos": []
    }
  ]
}
```

Publicar um formulário já usado devolve também os serviços que ganharam versão nova:

```json
{ "formulario": { "id": 1, "versao": 2 }, "servicos_atualizados": [{ "id": 1, "nome": "Poste apagado", "versao": 2 }] }
```

**Canais**

| Ação | Método e rota |
| --- | --- |
| Matriz de canais (marcados e efetivos por serviço) | `GET /v1/canais/matriz` |
| Definir canais | `PUT /v1/categorias/{id}/canais` · `PUT /v1/servicos/{id}/canais` |

O `PUT` recebe a lista de slugs (lista vazia = sem restrição) e devolve `avisos` com os serviços que ficaram sem nenhum canal; não bloqueia.

**Versões.** `GET /v1/versoes` lista as versões de serviços e formulários com status, e quantas solicitações usam cada versão de serviço.

## O que cada BFF consome do core

O core expõe as operações que hoje estão como funções no `conecta_poc.sql`; a tabela usa esses nomes. Telas que viram uma única chamada ao core (criar etapa, adicionar opção, mudar status de OS) ficam de fora.

| BFF | Endpoint do BFF | Operações do core que ele junta |
| --- | --- | --- |
| Cidadão | `GET /v1/catalogo` | categorias · `servicos_por_canal` (canal do cliente) |
| Cidadão | `GET /v1/servicos/{id}` | serviço e versão atual · formulários de abertura da versão (`ver_formulario`) · localidades |
| Cidadão | `POST /v1/solicitacoes` | `abrir_solicitacao` · `responder_abertura` para cada resposta, na mesma transação |
| Cidadão | `GET /v1/solicitacoes/{protocolo}` | solicitação · `timeline` · `ver_respostas(cidadao = true)` |
| Gestão | `GET /v1/eu` | vínculos ativos · permissões do perfil (`tem_permissao`) |
| Gestão | `GET /v1/fila` | `fila` |
| Gestão | `GET /v1/solicitacoes/{id}` | solicitação · `ver_respostas` · formulários da etapa atual · `situacoes_disponiveis` · `faltando` · OS · histórico com notificações · `esta_lotado` (para `pode_agir`) |
| Gestão | `POST /v1/solicitacoes/{id}/situacao` | `aplicar_situacao` (que já chama a notificação) |
| Gestão | `POST /v1/solicitacoes` | busca da pessoa por CPF · `criar_pessoa` se faltar · `abrir_solicitacao` · `responder_abertura` |
| Gestão | `GET /v1/servicos/{id}/editor` | `servico_em_edicao` ou versão publicada · `ver_servico` |
| Gestão | `PUT …/exibir-se` | apaga a árvore atual · `condicao_no_campo` ou `condicao_na_secao` · `subgrupo` · `adicionar_condicao`, numa transação |
| Gestão | `POST /v1/formularios/{id}/publicar` | `publicar_formulario` (que gera as versões novas dos serviços) |
| Gestão | `GET /v1/canais/matriz` | categorias e serviços com canais marcados · `servicos_por_canal` |

Duas operações precisam ser atômicas no core, e não montadas pelo BFF com várias chamadas: abrir a solicitação com as respostas enviadas (senão uma falha no meio deixa parte das respostas para trás) e substituir a árvore de condições. A proposta é o core aceitar as duas num payload só, igual ao do BFF.

## Decisões

Decidido em 27/10/2026:

| Ponto | Decisão |
| --- | --- |
| Stack dos BFFs | Fica em aberto; o contrato é agnóstico |
| Município ativo | Header `X-Municipio` |
| Autocadastro | Portal e app cadastram com os mesmos dados do atendimento, mais a senha |
| CPF que já é pessoa | Confirmação por código no e-mail ou telefone já cadastrados |
| Permissões | Novas permissões `redefinir_senha` e `criar_os` |
| Arquivos | URL assinada, direto no storage |
| Obrigatórios | Mesma regra para cidadão e atendente: a abertura aceita em branco e a primeira situação barra |
| Tempo real | SSE no portal; push no app fica para depois |
| Sem login e sem e-mail | Não recebe notificação |

**Mudanças no modelo que essas decisões pedem**

- [x] Permissões `redefinir_senha` e `criar_os` no seeder (Atendente recebe `redefinir_senha`; Técnico recebe `criar_os`).
- [x] Tabela `confirmacoes_cadastro` (pessoa, canal, destino, hash do código, hash da senha, expiração em 10 minutos, até 5 tentativas, confirmada em) e a lista global `canais_confirmacao` (e-mail, SMS).
- [x] Provedor de SMS e e-mail simulado: grava em `mensagens_saida` em vez de enviar.
