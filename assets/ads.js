/* Fills every <div data-ad-slot="name"> with an ad, only when ads are switched on in ads-config.js.
   Off by default: the slot stays hidden, takes no space and no third-party script is requested.
   Also stays off on localhost, file:// and inside iframes so testing never counts as ad traffic. */
(function(){
  var cfg = window.PDFSORT_ADS || {};
  var slots = [].slice.call(document.querySelectorAll('[data-ad-slot]'));
  if(!slots.length) return;
  var ID = /^ca-pub-\d{16}$/, UNIT = /^\d{6,}$/;
  var live = /^(localhost|127\.|0\.0\.0\.0|\[::1\])/.test(location.hostname) || location.protocol === 'file:' || window.top !== window.self;
  if(!cfg.enabled || !ID.test(cfg.client || '') || /^ca-pub-0+$/.test(cfg.client) || live) return;

  var todo = slots.filter(function(el){
    var unit = (cfg.slots || {})[el.getAttribute('data-ad-slot')];
    if(!UNIT.test(unit || '') || /^0+$/.test(unit)) return false;
    el.setAttribute('data-ad-unit', unit);
    return true;
  });
  if(!todo.length) return;

  window.adsbygoogle = window.adsbygoogle || [];
  if(!cfg.personalized) window.adsbygoogle.requestNonPersonalizedAds = 1;

  var s = document.createElement('script');
  s.async = true; s.crossOrigin = 'anonymous';
  s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + cfg.client;
  s.onload = function(){
    todo.forEach(function(el){
      el.classList.add('ad-on');
      el.innerHTML = '<span class="ad-label">Advertisement</span>' +
        '<ins class="adsbygoogle" style="display:block" data-ad-client="' + cfg.client + '" data-ad-slot="' + el.getAttribute('data-ad-unit') + '" data-ad-format="auto" data-full-width-responsive="true"></ins>';
      try{ (window.adsbygoogle = window.adsbygoogle || []).push({}); }catch(e){}
    });
  };
  document.head.appendChild(s);
})();
