// Kalokai Tech: botones para copiar el correo y el WhatsApp de la sección de contacto
document.querySelectorAll('.copy').forEach(function(b){
  b.addEventListener('click',function(){
    var t=b.getAttribute('data-copy');
    var done=function(){b.textContent='Copiado';setTimeout(function(){b.textContent='Copiar'},1600)};
    try{
      navigator.clipboard.writeText(t).then(done,function(){selectNear(b)});
    }catch(e){selectNear(b)}
  });
});
function selectNear(b){
  var s=b.parentElement.querySelector('strong');var r=document.createRange();r.selectNodeContents(s);
  var sel=window.getSelection();sel.removeAllRanges();sel.addRange(r);
}
