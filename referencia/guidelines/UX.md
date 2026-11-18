# ERIC · Padrões de UX

- **Filas** (Central, Setor): abas por status com contador; faixa de dica logo abaixo das abas; linhas com kicker (ocorrência · prazo), título, endereço, selos e UMA ação à direita. Atrasada: barra vermelha 3px à esquerda + selo vermelho com a data.
- **Detalhe:** drawer à direita (520px) ou página com stepper de etapas; ações no rodapé à direita.
- **Confirmação destrutiva/irreversível:** diálogo com ícone, título em pergunta ("Devolver à Central?"), motivo quando exigido, primário à direita.
- **Feedback:** toast 3–4 s após toda ação; erros de campo junto ao campo; nunca alert() do navegador.
- **Formulários:** rótulo sempre visível acima; ajuda abaixo; obrigatório com *; validar ao sair do campo e ao enviar; foco vai para o 1º erro.
- **Menus suspensos:** fecham ao clicar fora e com Esc; item atual marcado com check.
- **Abas que não cabem:** rolam na horizontal, nunca encolhem a fonte.
- **Sessão:** Sair → login com aviso; Entrar volta à última tela.
- **Tempo real:** padrão; indicador discreto, não interativo.
- **Vazio:** ícone em caixa `--c-soft`, título curto, próximo passo.
- **Responsivo:** desktop ≥1280 com menu fixo; portal fluido até 1200; abaixo de 768 usa layout PWA.
