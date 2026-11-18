Área de diagrama: fundo pontilhado 18px (--c-dot), barra de ferramentas e zoom fixas no topo, conteúdo em linha (FlowNode → FlowEdge → FlowNode → AddStep). Inspector à direita com .e-inspector.
```jsx
<FlowCanvas toolbar={<button className="e-canvas__tool">Etapa</button>}><FlowNode n={1} title="Triagem" /><FlowEdge label="Enviar para o setor" /><FlowNode n={2} title="Vistoria" selected /></FlowCanvas>
```
