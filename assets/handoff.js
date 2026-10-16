/* Hands a PDF from one tool to another (organizer <-> PDF editor) through IndexedDB,
   so large files never touch the URL. Everything stays inside this browser.
     Handoff.send('toEditor', { bytes, name, docId })   // then navigate
     const payload = await Handoff.take('toEditor')     // read once, then it is deleted
   Payloads older than 10 minutes are ignored. */
(function(){
  var DB = 'sdo_handoff', STORE = 'kv', TTL = 10 * 60 * 1000;
  function open(){
    return new Promise(function(resolve, reject){
      if(!('indexedDB' in window)){ reject(new Error('IndexedDB not available')); return; }
      var req = indexedDB.open(DB, 1);
      req.onupgradeneeded = function(){ req.result.createObjectStore(STORE); };
      req.onsuccess = function(){ resolve(req.result); };
      req.onerror = function(){ reject(req.error); };
    });
  }
  function run(mode, fn){
    return open().then(function(db){
      return new Promise(function(resolve, reject){
        var tx = db.transaction(STORE, mode), out = fn(tx.objectStore(STORE));
        tx.oncomplete = function(){ db.close(); resolve(out && out.result); };
        tx.onerror = tx.onabort = function(){ db.close(); reject(tx.error); };
      });
    });
  }
  window.Handoff = {
    send: function(key, payload){ payload.ts = Date.now(); return run('readwrite', function(s){ return s.put(payload, key); }); },
    take: function(key){
      return run('readwrite', function(s){ var r = s.get(key); s.delete(key); return r; }).then(function(p){
        return (p && Date.now() - p.ts < TTL) ? p : null;
      }).catch(function(){ return null; });
    }
  };
})();
