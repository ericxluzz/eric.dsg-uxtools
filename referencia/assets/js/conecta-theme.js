/* Conecta+ — tokens semânticos claro/escuro. Fonte única de cor dos protótipos. */
(function () {
  if (window.ConectaTema) return;
  var T = {
    claro: {
      'desk':'#d9dbdf','page':'#e9ecf0','sidebar':'#fafafa','surface':'#ffffff','surface-2':'#f6f7f9','surface-3':'#ebedf0',
      'border':'#d9dde4','border-2':'#cfd5de','text':'#1a1a1a','text-2':'#5b5b66','text-3':'#4b4b55',
      'primary':'#0b63c4','primary-hover':'#0a55a8','link':'#0b63c4','strong':'#0a3d78','soft':'#dcebfb','soft-bd':'#b6d3f4','tint':'#f3f8fe',
      'control':'#8a8a96','control-off':'#c9ced6','disabled':'#a9c8ec','dot':'#d5d9e0','map-filter':'none',
      'ok-bg':'#f0fdf4','ok-bd':'#a7e8bf','ok-fg':'#15803d','warn-bg':'#ffe6cc','warn-bd':'#fdc7a2','warn-fg':'#9a3412',
      'info-bg':'#eff6ff','info-bd':'#b1cdfb','info-fg':'#1d4ed8','bad-bg':'#fee2e2','bad-bd':'#fecaca','bad-fg':'#b91c1c',
      'cat-y-bg':'#fff7d1','cat-y-bd':'#f2dd85','cat-y-fg':'#6b5300','cat-g-bg':'#e8f6e6','cat-g-fg':'#2e7d32',
      'cat-r-bg':'#fde8e8','cat-v-bg':'#eef0ff','cat-v-fg':'#3f3fbf','cat-c-bg':'#e6f6fb','cat-c-fg':'#0e6a85'
    },
    escuro: {
      'desk':'#080b0f','page':'#0e1217','sidebar':'#12171e','surface':'#161b22','surface-2':'#1c222b','surface-3':'#262d37',
      'border':'#2a313c','border-2':'#353d4a','text':'#e6e9ee','text-2':'#a3acb9','text-3':'#b8c0cc',
      'primary':'#1f6fd1','primary-hover':'#2b7ddf','link':'#7db4ff','strong':'#a9cdf7','soft':'#17304f','soft-bd':'#2a4e7d','tint':'#13243a',
      'control':'#7d8796','control-off':'#3a4250','disabled':'#2a3f5c','dot':'#252c36','map-filter':'brightness(.72) contrast(1.08) saturate(.8)',
      'ok-bg':'#0f2a1c','ok-bd':'#1f5636','ok-fg':'#6ee7a0','warn-bg':'#33200f','warn-bd':'#6b3d16','warn-fg':'#fdba74',
      'info-bg':'#12223f','info-bd':'#274a84','info-fg':'#93c5fd','bad-bg':'#3a1517','bad-bd':'#7a2a2e','bad-fg':'#fca5a5',
      'cat-y-bg':'#2e2810','cat-y-bd':'#5c4e14','cat-y-fg':'#f3d36b','cat-g-bg':'#13291a','cat-g-fg':'#7ed69a',
      'cat-r-bg':'#35181a','cat-v-bg':'#1f2045','cat-v-fg':'#b3b4ff','cat-c-bg':'#0f2a33','cat-c-fg':'#7fd3ea'
    }
  };
  var LARG = { '1366': [1366, 768, 1140], '1440': [1440, 900, 1200], '1920': [1920, 1080, 1560] };
  function apply(t) {
    var v = T[t] || T.claro, s = document.documentElement.style;
    for (var k in v) s.setProperty('--c-' + k, v[k]);
    var map = { 'ae3-surface':'surface','ae3-surface-l1':'surface','ae3-surface-l2':'surface-2','ae3-surface-l3':'surface-3','ae3-border':'border',
      'ae3-text-primary':'text','ae3-text-secondary':'text-2','ae3-background-primary':'page','ae3-primary':'link','ae3-primary-strong':'strong','ae3-primary-soft':'soft',
      'ae3-on-primary-soft':'strong','ae3-success-container':'ok-bg','ae3-success-border':'ok-bd','ae3-warning-container':'warn-bg','ae3-warning-border':'warn-bd',
      'ae3-info-container':'info-bg','ae3-info-border':'info-bd','ae3-danger-container':'bad-bg','ae3-danger-border':'bad-bd','z-page':'page','z-text-2':'text-2' };
    for (var m in map) s.setProperty('--' + m, v[map[m]]);
    s.setProperty('color-scheme', t === 'escuro' ? 'dark' : 'light');
    document.documentElement.setAttribute('data-tema', t === 'escuro' ? 'escuro' : 'claro');
  }
  var atual = 'claro';
  try { atual = localStorage.getItem('conecta-tema') || 'claro'; } catch (e) {}
  apply(atual);
  window.ConectaTema = {
    get: function () { return atual; },
    set: function (t) { atual = t === 'escuro' ? 'escuro' : 'claro'; apply(atual); try { localStorage.setItem('conecta-tema', atual); } catch (e) {} window.dispatchEvent(new CustomEvent('conecta-tema', { detail: atual })); },
    toggle: function () { this.set(atual === 'escuro' ? 'claro' : 'escuro'); },
    largura: function (w) { var l = LARG[String(w)] || LARG['1440'], s = document.documentElement.style; s.setProperty('--fw', l[0] + 'px'); s.setProperty('--fh', l[1] + 'px'); s.setProperty('--pw', l[2] + 'px'); },
    tokens: T
  };
  window.ConectaTema.largura(1440);
})();
