# Conecta+ — Revisão do Mapa de Telas após a POC

Oct 29, 2026 · @North Stack

O Mapa de Telas precisa de revisão, mas não de um recomeço. A POC do Pablo (repositório conectaplus-alpha, `conecta_poc.sql`, BFFs e simulação) detalha o modelo de dados mais do que o mapeamento anterior e traz para o início do projeto peças que estavam previstas só para o fim.

## O que a POC mudou

### 1. Modelo de dados mais simples e concreto

| No mapeamento anterior | Na POC do Pablo |
| --- | --- |
| Órgão | **Município** (o protocolo é `AMA-2026-000001`) |
| Árvore livre de unidades | **Secretaria → Setor**, dois níveis fixos |
| Lotação e papel separados | **Vínculo**: usuário × município × perfil × secretaria/setor × início/fim |
| Território com polígonos | **Localidade** (Sede, Vila Tepequém) + logradouro + referência; latitude e longitude opcionais |
| 10 status públicos fixos | **Rótulo público** em cada etapa e situação |
| Login por CPF + código no WhatsApp | **CPF + senha**, uma conta por pessoa que vale em qualquer município |
| Canais: portal, 156, balcão, WhatsApp | **portal, aplicativo, presencial, central\_telefonica**, com restrição por categoria ou serviço |

### 2. As telas de configuração ficam no painel de gestão

Na POC, carta, formulários, canais e versões estão dentro do painel de gestão. Quem vê cada menu depende das permissões `gerenciar_servicos` e `gerenciar_formularios`. No mapeamento anterior, essas telas estavam num Console Orbi separado.

**Recomendação:** seguir o Pablo. As telas são as mesmas, e a equipe Orbi recebe essas permissões no município que está implantando. O Console Orbi fica pequeno: criar município, cadastrar a primeira estrutura e os vínculos, e fazer suporte. Cerca de 15 telas deixam de existir em dobro.

### 3. Editor de fluxo e construtor de formulário já existem

Estavam planejados para as Sprints 15 e 16. Agora são o centro do produto desde o início:

- **Serviço:** rascunho, etapas e situações em canvas, vínculo de formulários e publicação.
- **Formulário:** seções, campos, opções, validações e condições E/OU. Publicar um formulário gera versão nova dos serviços que o usam.

## Telas que entram

**Portal do cidadão**

- Cadastro com código de confirmação, para quem já foi atendido pela central e ainda não tem login.
- Seletor de município.
- Notificações em tempo real.
- Completar abertura: a solicitação pode nascer com pendências, e a primeira situação fica bloqueada até elas serem resolvidas.

**Painel de gestão**

- Seletor de município.
- Pessoas e senhas: o atendente redefine a senha de quem não tem e-mail.
- Matriz de canais.
- Versões, com quantas solicitações usam cada uma.
- Lista de formulários separada da lista de serviços.
- OS avulsa, além da OS criada a partir de uma solicitação.

## Telas que mudam

- **Fila e detalhe da solicitação:** passam a seguir o modelo da POC. O detalhe mostra numa tela só a abertura, as etapas anteriores, a etapa atual com formulário, as situações, as pendências, a OS e o histórico.
- **Logins:** CPF + senha nos dois ambientes.
- **Acompanhamento do cidadão:** a timeline usa os rótulos públicos das etapas e situações, e mostra só as respostas marcadas como visíveis ao cidadão.

## O que a POC ainda não tem

Prazos e SLA, mapa, duplicadas, lotes, contratos, avaliação, WhatsApp e transparência continuam no plano, porque estão no documento de produto. Devem ser redesenhados sobre o modelo novo.

## Telas atuais da POC

O fluxo das telas atuais funcionou nos testes; o visual não. As 19 telas da POC (12 na gestão e 7 no cidadão) servem como referência de fluxo e conteúdo no Claude Design, mas não de layout. O visual começa do zero, a partir do design system.

| Ambiente | Telas na POC |
| --- | --- |
| Gestão | Login, Fila do setor, Solicitação, Nova solicitação, Pessoas e senhas, Carta de serviços, Editor de serviço, Formulários, Editor de formulário, Canais, Versões, Ordens de serviço |
| Cidadão | Login, Cadastro, Catálogo, Serviço, Minhas solicitações, Acompanhamento, Notificações |

## Arquitetura

O Pablo definiu dois BFFs (Cidadão e Gestão) na frente de um core. A sessão fica no servidor, o frontend nunca vê o token, e o core decide todas as regras. Isso encaixa na stack escolhida:

| Camada | Onde fica |
| --- | --- |
| Core | Funções PL/pgSQL do `conecta_poc.sql`, rodando no Postgres do Supabase como estão hoje |
| BFFs | Rotas de servidor do Nuxt (`server/api`), com cookie httpOnly, um BFF por app |
| Frontend | Nuxt + PrimeVue; não fala direto com o Supabase |

Isso muda o documento de estrutura enviado ao Claude Code, que pressupunha acesso direto ao Supabase com RLS.

## Próximos passos

- [ ] Decidir se as telas de configuração ficam no painel de gestão, liberadas por permissão
- [ ] Confirmar a arquitetura: core no Supabase e BFFs nas rotas de servidor do Nuxt
- [ ] Atualizar o Mapa de Telas
- [ ] Atualizar o documento de estrutura do Claude Code
- [ ] Atualizar o checklist do Notion
- [ ] Trocar o nome "Zeladoria" por Conecta+ nos três documentos
