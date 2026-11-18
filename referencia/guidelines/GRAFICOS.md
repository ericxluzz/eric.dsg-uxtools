# ERIC · Gráficos

Paleta: `--c-chart-1` … `--c-chart-7` (azul, verde, âmbar, violeta, ciano, rosa, cinza), `--c-chart-grid`, `--c-chart-axis`, `--c-chart-goal`, `--c-chart-late`.

- **Barra** para comparar dias ou categorias; **linha** para tendência com 8+ pontos; **barra empilhada horizontal** para distribuição de status. Pizza e rosca: não.
- No máximo 4 séries. Mais que isso: tabela.
- Legenda acima, à esquerda, com quadrado 10px. Rótulo direto na barra quando houver até 5.
- Eixo Y começa em 0. Grade horizontal tracejada `--c-chart-grid`; sem grade vertical.
- Meta: linha `--c-chart-goal` 2px com rótulo "Meta". Atraso sempre `--c-chart-late`.
- Cores de status seguem a regra (verde concluído, âmbar pendente, azul em andamento, vermelho atrasado).
- Barras: raio 3 no topo, largura máx. 10px por série, 2px entre séries.
- Sempre há o número em texto ao lado (KPI ou tooltip) e um link "Ver dados" com tabela para leitor de tela.

## Gráficos bonitos e fáceis de ler
1. **O título é a conclusão.** "Atrasos caíram 18% em outubro", não "Atrasos por mês".
2. **Destaque o que importa.** Uma ou duas séries em cor; o resto em `--c-chart-muted`.
3. **Rótulo direto** no ponto/barra em vez de legenda distante.
4. **Ordene** rankings do maior para o menor (ou do pior para o melhor).
5. **Número dentro** da célula do mapa de calor e da barra empilhada (≥ 10%).
6. **Escala sequencial** `--c-seq-1…5` para intensidade; texto branco nos dois tons fortes.
7. **Acessível:** `role="img"` + frase-resumo; botão "Ver dados" troca por tabela; nunca só cor (rótulo, posição, seta ↑↓).
8. Tipos do sistema: linha com meta, sparkline, barras agrupadas, ranking, empilhado 100%, mapa de calor, funil, antes × agora (dumbbell), bullet com faixas.
