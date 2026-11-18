# ERIC · Regras (obrigatórias)

## UI
1. Sem sombras e sem degradês em botões e cards. Profundidade = borda 1px + troca de fundo.
2. Tabelas, botões, selos, abas e itens de menu nunca quebram linha (`white-space:nowrap` + `overflow:hidden` + `text-overflow:ellipsis`; colunas `minmax(0,Nfr)`).
3. Cor por status: verde = concluído/bom · laranja = pendente · azul = ação/atenção · vermelho = atraso/erro · cinza = neutro.
4. Cores só por token `var(--c-*)`. Nenhum hex solto, exceto branco sobre sólido.
5. Poppins em tudo; Lucide traço 1.5; nada de emoji.
6. Separar fundo e componente: página `--c-page` ≠ card `--c-surface` + borda `--c-border`.
7. Tema claro e escuro equivalentes: mesma estrutura, só os tokens mudam.
8. Densidade compacta: título 22, corpo 13–14, botão/campo 34, card raio 12 e padding 16.

## UX
9. "Solicitação/solicitar", nunca "pedido/pedir".
10. Um botão primário por área. Botão = verbo.
11. Sair sempre leva ao login (com aviso "Sessão encerrada com segurança").
12. Perfil/usuário no rodapé do menu abre mini menu: Minha conta · Notificações · Sair.
13. Menu lateral só com uso diário; todo ajuste fica em Configurações, filtrado por permissão.
14. Não existe seleção de município nem de perfil para o usuário final: vem do vínculo.
15. Elementos informativos (bloco município/perfil, "Tempo real", selos) não têm hover, seta nem cursor de clique.
16. Toda lista tem estado vazio, carregando e erro.
17. Login sem rolagem em 1366×768 / 1440×900 / 1920×1080; em telas menores, rola sem cortar o topo.
18. Dados de exemplo: Amajari · RR, AMA-2026-000000. Dados pessoais mascarados.

## Layout
19. Menu 236 e topbar 58 fixos; conteúdo fluido; grades auto-fill. Nunca centralizar 1440 em 1920.
20. Painéis laterais têm largura mínima que comporte o conteúdo (≥320px); campos lado a lado viram coluna quando não cabem.
21. Mobile: toque ≥ 44px (botões principais 52–54), campo com fonte 16px, ação principal fixa no rodapé.
