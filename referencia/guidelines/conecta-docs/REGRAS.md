# Conecta+ — regras para o Claude Code (colar no CLAUDE.md do repositório)

- Referências: docs/VISUAL.md, docs/TELAS.md, docs/FLUXOS.md e os protótipos em conecta/. Em conflito: conecta_poc.sql > bff.md > FLUXOS > protótipo.
- Poppins; ícones Lucide 1.75. Cores **só** via tokens semânticos (`--c-*`, ver conecta-theme.js) com tema claro e escuro equivalentes.
- Sem sombra e sem degradê em botões e cards. Tabelas, botões e selos nunca quebram linha (nowrap + ellipsis).
- Cor por status: verde concluído · laranja pendente · azul ação/andamento · vermelho atraso/erro · cinza neutro.
- Densidade compacta: título 22, corpo 13–14, botões/inputs 34–36 px, cards raio 10 e padding 14–16. PWA mantém toque ≥ 44 px.
- Responsivo de verdade em 1366/1440/1920: menu 232 e topbar 56 fixos, conteúdo fluido, grades auto-fill — nunca centralizar layout de 1440 em 1920.
- Login sem rolagem nas resoluções desktop.
- **Não existe seleção de município nem de perfil.** Vêm do vínculo no banco (servidor) ou do domínio (cidadão). Bloco município/perfil é só informativo.
- "Tempo real" é padrão; indicador discreto e não interativo.
- Menu lateral só com uso diário (Fila, Nova solicitação, OS, Pessoas). Todo ajuste fica em Configurações (G-16), filtrado por permissão.
- Detalhe da solicitação usa o canvas técnico de etapas/situações reais do serviço — nunca inventar transições.
- Avatares sempre foto; fallback por iniciais só sem foto cadastrada.
- Sempre "solicitação/solicitar", nunca "pedido/pedir". Dados de exemplo: Amajari · RR, AMA-2026-000000.
