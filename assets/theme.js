/* Light / dark theme, shared by every page.
   Light is the default. The choice is remembered in this browser and applied before the page paints
   (this script sits in <head>), so there is no flash. Any element with [data-theme-toggle] switches theme.
     Theme.get() -> 'light' | 'dark'     Theme.set('dark') */
(function(){
  var KEY = 'pdfsortTheme', root = document.documentElement;
  function stored(){ try{ return localStorage.getItem(KEY); }catch(e){ return null; } }
  function current(){ return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }

  function apply(t){
    if(t === 'dark') root.setAttribute('data-theme', 'dark'); else root.removeAttribute('data-theme');
    // keep the phone's status bar / browser chrome in step with the page
    var m = document.querySelector('meta[name="theme-color"]:not([media])');
    if(m){ if(!m.dataset.light) m.dataset.light = m.getAttribute('content'); m.setAttribute('content', t === 'dark' ? '#000000' : m.dataset.light); }
    sync();
  }
  function sync(){
    var dark = current() === 'dark';
    document.querySelectorAll('[data-theme-toggle]').forEach(function(b){
      var label = dark ? 'Switch to light mode' : 'Switch to dark mode';
      b.setAttribute('aria-pressed', dark ? 'true' : 'false'); b.setAttribute('aria-label', label); b.title = label;
    });
  }
  function set(t){ apply(t); try{ localStorage.setItem(KEY, t); }catch(e){} }

  apply(stored() === 'dark' ? 'dark' : 'light');
  document.addEventListener('click', function(e){
    var b = e.target.closest && e.target.closest('[data-theme-toggle]');
    if(b) set(current() === 'dark' ? 'light' : 'dark');
  });
  window.addEventListener('storage', function(e){ if(e.key === KEY) apply(e.newValue === 'dark' ? 'dark' : 'light'); });   // other tabs
  document.addEventListener('DOMContentLoaded', function(){ apply(current()); });                                         // buttons + meta now exist
  window.Theme = { get:current, set:set };
})();
