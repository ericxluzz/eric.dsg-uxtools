/* ERIC · alterna tema claro/escuro via data-tema no <html>. Preferência salva. */
(function(){var K='eric-tema',d=document.documentElement;function set(t){t=t==='escuro'?'escuro':'claro';d.setAttribute('data-tema',t);try{localStorage.setItem(K,t)}catch(e){}window.dispatchEvent(new CustomEvent('eric-tema',{detail:t}))}
var s=null;try{s=localStorage.getItem(K)}catch(e){}set(s||'claro');
window.EricTema={get:function(){return d.getAttribute('data-tema')},set:set,toggle:function(){set(this.get()==='escuro'?'claro':'escuro')}};})();
