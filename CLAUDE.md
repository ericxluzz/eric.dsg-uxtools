# ERIC · regras do repositório (colar no CLAUDE.md)

- Design system: ERIC 1.2. Tokens em `@eric/tokens`. Nunca use hex solto: sempre `var(--c-*)` / `--e-*` (Flutter: `EricColors`).
- Sem sombras e sem degradês em botões e cards. Profundidade = borda 1px + troca de fundo.
- Tabelas, botões, selos, abas e menus nunca quebram linha (nowrap + ellipsis). Abas rolam na horizontal.
- Cor por status: verde = concluído, laranja = pendente, azul = ação/andamento, vermelho = atraso/erro, cinza = neutro. Sempre com texto ou ícone junto.
- "Solicitação/solicitar", nunca "pedido/pedir". Botão = verbo. Nunca OK/Sim/Não.
- Fonte Poppins; ícones Lucide traço 1.5; nada de emoji.
- Tema claro é o padrão; o escuro precisa funcionar em toda tela.
- WCAG 2.2 AA: foco visível 2px, `<label>` real, aria em menus/diálogos, toque ≥ 44 no mobile, campo 16px no mobile.
- Toda lista: vazio, carregando (skeleton), erro e sem permissão.
- Gráficos: título = conclusão, "Ver dados" com tabela, role="img" + resumo, sem pizza, eixo em 0.
- Datas dd/mm/aaaa, moeda R$ 1.250,00, separador " · ". CPF e telefone mascarados.
- Exemplo de dados: Amajari · RR, protocolo AMA-2026-000000.
- Referência visual: site de docs (`apps/docs`, rode `pnpm --filter @eric/docs dev`).
