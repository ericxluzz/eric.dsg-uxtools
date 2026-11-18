# Prompt inicial para o Claude Code

Cole isto no Claude Code, na raiz do repositório novo, com esta pasta copiada para `docs/design_handoff_eric_design_system/`:

---

Leia `docs/design_handoff_eric_design_system/README.md`, `PLANO.md`, `COMPONENTES.md` e `CLAUDE.md`. Copie o `CLAUDE.md` para a raiz.

Implemente o ERIC Design System seguindo o `PLANO.md`, **uma fase por vez**:
1. Crie o monorepo (pnpm + Turborepo) com `packages/tokens`, `packages/react`, `packages/charts`, `packages/flutter` e `apps/docs` (Storybook 8).
2. Fase 1: copie `referencia/tokens/*.css` para `@eric/tokens` e gere JSON, preset Tailwind e Dart a partir deles com Style Dictionary. Crie o teste de contraste do CI com os 19 pares da seção Contraste.
3. Pare e me mostre o Storybook com a página de Cores (claro e escuro) antes de seguir para a Fase 2.

Regras:
- Os arquivos em `referencia/` são protótipos HTML: recrie, não copie os `.jsx`.
- Use Radix UI (ou React Aria) para comportamento e acessibilidade; o visual é 100% dos tokens ERIC.
- Cada componente sai com stories de todos os estados, teste axe e teste de teclado.
- Siga todas as regras do `CLAUDE.md`.
