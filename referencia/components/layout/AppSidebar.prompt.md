Sidebar padrão (236px): marca no topo, navegação do dia a dia, rodapé com Configurações, ajuda e cartão do usuário (mini menu com Sair).
```jsx
<AppSidebar logo="assets/logo-amajari.png" navTitle="Central de Triagem" value="fila" items={[{value:'painel',label:'Painel',icon:'layout-dashboard'},{value:'fila',label:'Fila da Central',icon:'inbox',count:7}]} footerItems={[{label:'Configurações',icon:'settings'},{label:'O que é cada coisa?',icon:'book-open'}]} user={{name:'Regina Matos',role:'Administração municipal'}} />
```
