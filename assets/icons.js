/* SF Symbols–style stroke icons (24×24 grid, rounded caps). Use <el data-icon="name"> and
   the icon is prepended; or call window.iosIcon('name') for the raw <svg> markup. */
(function(){
  var P = {
    doc:      '<path d="M7 3h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
    docs:     '<path d="M8 7V5a2 2 0 0 1 2-2h5l4 4v8a2 2 0 0 1-2 2h-2"/><path d="M5 9a2 2 0 0 1 2-2h5l3 3v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9Z"/>',
    plus:     '<path d="M12 5v14M5 12h14"/>',
    minus:    '<path d="M5 12h14"/>',
    sparkle:  '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="M18.5 16.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8Z"/>',
    upload:   '<path d="M12 15V4m0 0L8 8m4-4 4 4"/><path d="M5 13v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5"/>',
    download: '<path d="M12 4v11m0 0-4-4m4 4 4-4"/><path d="M5 15v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3"/>',
    zip:      '<path d="M5 8l7-4 7 4v8l-7 4-7-4V8Z"/><path d="M5 8l7 4 7-4M12 12v8"/>',
    trash:    '<path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/><path d="M6.5 7l.8 11.2a2 2 0 0 0 2 1.8h5.4a2 2 0 0 0 2-1.8L17.5 7M10 11v5M14 11v5"/>',
    rotate:   '<path d="M4 12a8 8 0 1 0 2.6-5.9"/><path d="M4 4v4.5h4.5"/>',
    expand:   '<path d="M4 9V5a1 1 0 0 1 1-1h4M15 4h4a1 1 0 0 1 1 1v4M20 15v4a1 1 0 0 1-1 1h-4M9 20H5a1 1 0 0 1-1-1v-4"/>',
    pen:      '<path d="M4 20l1-4L16.5 4.5a2 2 0 0 1 2.8 0l.2.2a2 2 0 0 1 0 2.8L8 19l-4 1Z"/><path d="M14.5 6.5l3 3"/>',
    pencil:   '<path d="M4 20l1-4L16.5 4.5a2 2 0 0 1 2.8 0l.2.2a2 2 0 0 1 0 2.8L8 19l-4 1Z"/><path d="M14.5 6.5l3 3"/>',
    signature:'<path d="M3 17c2.5 0 3.5-9 5.5-9 2 0 .5 8 2.5 8s2-4 3.5-4 1 3 3 3h3"/><path d="M3 21h18"/>',
    eraser:   '<path d="M8.5 20H19M5.3 14.7l8.5-8.5a2 2 0 0 1 2.8 0l2.2 2.2a2 2 0 0 1 0 2.8L11 19.5a2 2 0 0 1-1.4.6H8a2 2 0 0 1-1.4-.6l-1.3-1.3a2 2 0 0 1 0-2.8Z"/><path d="M9 11l5 5"/>',
    crop:     '<path d="M7 3v14a2 2 0 0 0 2 2h12M3 7h14a2 2 0 0 1 2 2v12"/>',
    wand:     '<path d="M5 19L16 8"/><path d="M14.5 6.5l3 3"/><path d="M6 4v3M4.5 5.5h3M18 14v3M16.5 15.5h3"/>',
    undo:     '<path d="M9 8L4.5 12.5 9 17"/><path d="M5 12.5h8.5a5.5 5.5 0 0 1 0 11"/>',
    clear:    '<circle cx="12" cy="12" r="8.5"/><path d="M9 9l6 6M15 9l-6 6"/>',
    close:    '<path d="M6 6l12 12M18 6L6 18"/>',
    check:    '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    left:     '<path d="M15 5l-7 7 7 7"/>',
    right:    '<path d="M9 5l7 7-7 7"/>',
    redo:     '<path d="M3.5 12a8.5 8.5 0 0 1 14.7-5.8L20.5 8.5M20.5 4v4.5H16"/>',
    reset:    '<path d="M4 12a8 8 0 1 1 2.4 5.7"/><path d="M4 18v-4.5h4.5"/>',
    compress: '<path d="M4 10h6V4M20 14h-6v6"/><path d="M10 10L3.5 3.5M14 14l6.5 6.5"/>',
    word:     '<path d="M7 3h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M14 3v5h5M8.5 12.5l1.3 5 1.7-4.5 1.7 4.5 1.3-5"/>',
    arrowRight:'<path d="M5 12h14M13 6l6 6-6 6"/>',
    bold:     '<path d="M7 5h6a3.5 3.5 0 0 1 0 7H7zM7 12h7a3.5 3.5 0 0 1 0 7H7z"/>',
    italic:   '<path d="M14 5h-4M14 19h-4M15 5l-6 14"/>',
    underline:'<path d="M7 4v7a5 5 0 0 0 10 0V4M5 20h14"/>',
    strike:   '<path d="M5 12h14M16.5 7.5C16 5.8 14.3 5 12 5c-2.4 0-4 1.1-4 3 0 1.4.9 2.2 2.5 2.7M7.5 16.5C8 18.2 9.7 19 12 19c2.4 0 4-1.1 4-3 0-.5-.1-1-.3-1.4"/>',
    alignLeft:'<path d="M4 6h16M4 10h10M4 14h16M4 18h10"/>',
    alignCenter:'<path d="M4 6h16M7 10h10M4 14h16M7 18h10"/>',
    alignRight:'<path d="M4 6h16M10 10h10M4 14h16M10 18h10"/>',
    listBullet:'<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r=".8" fill="currentColor"/><circle cx="4.5" cy="12" r=".8" fill="currentColor"/><circle cx="4.5" cy="18" r=".8" fill="currentColor"/>',
    listNumber:'<path d="M10 6h10M10 12h10M10 18h10M4 5l1.5-1v4M3.8 13.5c.3-.9 2.2-1 2.2.2 0 1-1.7 1.3-2.2 2.3H6M4 18.3c.6-.5 2-.5 2 .5s-1 1.2-1 1.2 1.2 0 1.2 1-1.6 1.2-2.3.5"/>',
    outdent:  '<path d="M4 5h16M12 10h8M12 14h8M4 19h16"/><path d="M8 9.5L4.5 12 8 14.5z"/>',
    indent:   '<path d="M4 5h16M12 10h8M12 14h8M4 19h16"/><path d="M4.5 9.5L8 12l-3.5 2.5z"/>',
    image:    '<rect x="3.5" y="5" width="17" height="14" rx="2.5"/><circle cx="9" cy="10" r="1.6"/><path d="M4 17l5-4.5 3.5 3 3-2.5 4.5 4"/>',
    shield:   '<path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3Z"/><path d="M9 12l2 2 4-4"/>',
    cursor:   '<path d="M5 3l14 7.5-6 1.8-2.2 6.2L5 3Z"/>',
    type:     '<path d="M5 7V4.5h14V7M12 4.5v15M9 19.5h6"/>',
    highlighter:'<path d="M15 4l5 5-9 9H6v-5l9-9Z"/><path d="M4 21h9"/>',
    square:   '<rect x="4.5" y="4.5" width="15" height="15" rx="2.5"/>',
    circle:   '<circle cx="12" cy="12" r="8"/>',
    lineDiag: '<path d="M5 19L19 5"/>',
    arrow:    '<path d="M5 19L19 5M10 5h9v9"/>',
    hash:     '<path d="M9.5 4L7.5 20M16.5 4l-2 16M4 9h16M3.5 15h16"/>',
    filePlus: '<path d="M7 3h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M14 3v5h5M12 11v6M9 14h6"/>',
    zoomFit:  '<path d="M4 9V5h4M20 9V5h-4M4 15v4h4M20 15v4h-4"/>'
  };
  window.iosIcon = function(name, cls){
    return '<svg class="ico' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[name] || '') + '</svg>';
  };
  window.hydrateIcons = function(root){
    (root || document).querySelectorAll('[data-icon]').forEach(function(el){
      if(el.dataset.iconDone) return;
      el.insertAdjacentHTML('afterbegin', window.iosIcon(el.dataset.icon));
      el.dataset.iconDone = '1';
    });
  };
  // Icon-only buttons get an accessible name from their tooltip.
  function labelIconOnly(){
    document.querySelectorAll('button[title], a[title]').forEach(function(el){
      if(el.hasAttribute('aria-label')) return;
      if(!el.textContent.trim()) el.setAttribute('aria-label', el.getAttribute('title'));
    });
  }
  var pending = false;
  function schedule(){ if(pending) return; pending = true; requestAnimationFrame(function(){ pending = false; labelIconOnly(); }); }
  function boot(){
    window.hydrateIcons(); labelIconOnly();
    if('MutationObserver' in window) new MutationObserver(schedule).observe(document.body, { childList:true, subtree:true });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
