Bloco de formulário: número + título, corpo com grade auto-fill (240px), rodapé com ações à direita. Use .e-formsec__grid para campos lado a lado.
```jsx
<FormSection n={1} title="Onde é o problema?" footer={<Button>Continuar</Button>}><div className="e-formsec__grid"><TextField label="Endereço" /><TextField label="Ponto de referência" /></div></FormSection>
```
