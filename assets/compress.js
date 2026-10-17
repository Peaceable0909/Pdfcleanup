/* PDF compression shared by the organizer and the PDF editor.

   Every page of a finished PDF is re-rendered as a downscaled JPEG and written into a new PDF with the same
   page sizes, so edits, rotation, watermarks and page numbers are all included. The result is never larger
   than the input: if compressing would not help, the original bytes are returned.

     PDFCompress.LEVELS                         level table (none / light / balanced / strong)
     await PDFCompress.best(bytes, level, gray, onProgress)  -> { bytes, before, after, used }
     PDFCompress.loadPrefs() / savePrefs(p)     remembered { level, gray } (shared by both tools)
     PDFCompress.formatBytes(n), PDFCompress.summary(before, after)

   Needs pdf.js (pdfjsLib) and pdf-lib (PDFLib) on the page. */
(function(){
  var LEVELS = {
    none:     { label:'Off',      maxDim:0,    quality:1,    hint:'Original quality. Keeps text selectable.' },
    light:    { label:'Light',    maxDim:2200, quality:0.82, hint:'Sharp, print-quality scans. Typically 30–60% smaller.' },
    balanced: { label:'Balanced', maxDim:1600, quality:0.68, hint:'Good for email and online portals. Typically 50–80% smaller.' },
    strong:   { label:'Strong',   maxDim:1100, quality:0.5,  hint:'Smallest files, readable on screen. Typically 70–90% smaller.' }
  };
  var NOTE = ' Compressed pages are saved as images (text won’t be selectable).';
  var PREF_KEY = 'pdfsortCompress', MAX_PIXELS = 16e6;

  function formatBytes(n){
    if(n < 1024) return n + ' B';
    if(n < 1024 * 1024) return (n / 1024).toFixed(n < 10 * 1024 ? 1 : 0) + ' KB';
    return (n / (1024 * 1024)).toFixed(1) + ' MB';
  }
  function summary(before, after){
    var pct = Math.max(0, Math.round((1 - after / before) * 100));
    return pct > 0 ? 'Saved ' + pct + '% · ' + formatBytes(before) + ' → ' + formatBytes(after) : 'Already small · ' + formatBytes(after);
  }

  function loadPrefs(){
    var p = { level:'none', gray:false };
    try{
      var raw = localStorage.getItem(PREF_KEY);
      if(raw){ var o = JSON.parse(raw); if(o && LEVELS[o.level]) p.level = o.level; p.gray = !!(o && o.gray); }
      else {   // older versions kept these under separate keys
        var lv = localStorage.getItem('compressLevel');
        if(lv && LEVELS[lv]) p.level = lv;
        p.gray = localStorage.getItem('compressGray') === '1';
      }
    }catch(e){}
    return p;
  }
  function savePrefs(p){ try{ localStorage.setItem(PREF_KEY, JSON.stringify({ level:p.level, gray:!!p.gray })); }catch(e){} }

  // Draws a canvas flattened onto white (optionally grayscale), longest side <= maxDim (0 = keep), as JPEG bytes.
  async function canvasToJpegBytes(source, srcW, srcH, maxDim, quality, gray){
    var ratio = maxDim ? Math.min(1, maxDim / Math.max(srcW, srcH)) : 1;
    var w = Math.max(1, Math.round(srcW * ratio)), h = Math.max(1, Math.round(srcH * ratio));
    var c = document.createElement('canvas'); c.width = w; c.height = h;
    var ctx = c.getContext('2d', { willReadFrequently: !!gray });
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.imageSmoothingQuality = 'high'; ctx.drawImage(source, 0, 0, w, h);
    if(gray){
      var id = ctx.getImageData(0, 0, w, h), d = id.data;
      for(var i = 0; i < d.length; i += 4){ var y = (d[i] * 0.299 + d[i+1] * 0.587 + d[i+2] * 0.114) | 0; d[i] = d[i+1] = d[i+2] = y; }
      ctx.putImageData(id, 0, 0);
    }
    var blob = await new Promise(function(res){ c.toBlob(res, 'image/jpeg', quality); });
    var bytes = new Uint8Array(await blob.arrayBuffer());
    c.width = c.height = 0;
    return bytes;
  }

  // Re-renders every page of `bytes` as a JPEG and returns the new (image-only) PDF.
  async function rasterize(bytes, level, gray, onProgress){
    var cfg = LEVELS[level];
    var pdf = await pdfjsLib.getDocument({ data: new Uint8Array(bytes) }).promise;
    var out = await PDFLib.PDFDocument.create();
    try{
      for(var i = 1; i <= pdf.numPages; i++){
        if(onProgress) onProgress(i, pdf.numPages);
        var page = await pdf.getPage(i);
        var base = page.getViewport({ scale:1 });                     // page size as it is displayed (rotation applied)
        var scale = Math.min(4, cfg.maxDim / Math.max(base.width, base.height));
        scale = Math.min(scale, Math.sqrt(MAX_PIXELS / (base.width * base.height)));
        var vp = page.getViewport({ scale:scale });
        var canvas = document.createElement('canvas'); canvas.width = Math.ceil(vp.width); canvas.height = Math.ceil(vp.height);
        var ctx = canvas.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext:ctx, viewport:vp }).promise;
        var jpg = await canvasToJpegBytes(canvas, canvas.width, canvas.height, 0, cfg.quality, gray);
        canvas.width = canvas.height = 0; page.cleanup();
        var img = await out.embedJpg(jpg), p = out.addPage([base.width, base.height]);
        p.drawImage(img, { x:0, y:0, width:base.width, height:base.height });
      }
    } finally { pdf.destroy(); }
    return out.save();
  }

  async function best(bytes, level, gray, onProgress){
    if(level === 'none' || !LEVELS[level]) return { bytes:bytes, before:bytes.length, after:bytes.length, used:false };
    var small = await rasterize(bytes, level, gray, onProgress), used = small.length < bytes.length;
    return { bytes: used ? small : bytes, before:bytes.length, after: Math.min(small.length, bytes.length), used:used };
  }

  window.PDFCompress = { LEVELS:LEVELS, NOTE:NOTE, best:best, rasterize:rasterize, loadPrefs:loadPrefs, savePrefs:savePrefs, formatBytes:formatBytes, summary:summary };
})();
