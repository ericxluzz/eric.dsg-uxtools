(function(){
  function pascal(n){return n.split('-').map(function(s){return s[0].toUpperCase()+s.slice(1)}).join('')}
  class CIcon extends HTMLElement{
    static get observedAttributes(){return ['name','size','stroke']}
    connectedCallback(){this.render()}
    attributeChangedCallback(){if(this.isConnected)this.render()}
    render(){
      if(!window.lucide||!window.lucide.icons){(window.__cq=window.__cq||[]).push(this);return}
      var node=window.lucide.icons[pascal(this.getAttribute('name')||'circle')];if(!node)return;
      var svg=window.lucide.createElement(node),s=this.getAttribute('size')||16;
      svg.setAttribute('width',s);svg.setAttribute('height',s);svg.setAttribute('stroke-width',this.getAttribute('stroke')||1.5);
      svg.setAttribute('aria-hidden','true');svg.style.display='block';
      var r=this.shadowRoot||this.attachShadow({mode:'open'});r.replaceChildren(svg);
    }
  }
  if(!customElements.get('c-icon'))customElements.define('c-icon',CIcon);
  var t=setInterval(function(){if(window.lucide&&window.lucide.icons){clearInterval(t);(window.__cq||[]).forEach(function(e){e.render()});window.__cq=[]}},60);
})();
