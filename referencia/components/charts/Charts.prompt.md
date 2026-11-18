Gráficos ERIC. Sempre dentro de ChartCard: título = a conclusão ("Atrasos caíram 18%"), subtítulo = o que é medido, summary para leitor de tela, tabela "Ver dados".
- Tendência no tempo → LineChart (com meta). KPI pequeno → Sparkline.
- Comparar categorias → RankBars (ordenado; destaque 1–2 barras, resto cinza --c-chart-muted).
- Distribuição de status → StackedBars 100% (rótulo dentro quando ≥ 10%).
- Dia × hora → Heatmap (escala --c-seq-1…5, número dentro da célula).
- Etapas → Funnel (% que segue). Antes × agora → Dumbbell (verde melhorou, vermelho piorou).
```jsx
<ChartCard title="Abertas caíram 18% em 4 semanas" sub="Solicitações abertas por dia" summary="Caiu de 52 para 43; meta 45" table={{head:['Dia','Abertas'],rows:[['05/11',43]]}}><LineChart data={[52,50,47,43]} goal={45} /></ChartCard>
```