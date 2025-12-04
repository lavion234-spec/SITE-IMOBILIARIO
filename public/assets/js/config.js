/* Config global do site - centraliza telefone e ajusta links de WhatsApp */
(function(){
  // Defina aqui o número da empresa no formato internacional sem sinais: exempl o 55 + DDD + número
  window.COMPANY_PHONE_GLOBAL = '5511999999999'; // SUBSTITUA pelo número real antes de publicar

  function patchWhatsAppLinks(){
    document.querySelectorAll('a[href*="wa.me/"]').forEach(a=>{
      try{
        // substitui o número presente na URL por COMPANY_PHONE_GLOBAL
        a.href = a.href.replace(/wa\.me\/[0-9]+/, 'wa.me/' + window.COMPANY_PHONE_GLOBAL);
      }catch(e){/* silenciar */}
    });
  }

  if(document.readyState === 'complete' || document.readyState === 'interactive') patchWhatsAppLinks();
  else document.addEventListener('DOMContentLoaded', patchWhatsAppLinks);

  // export útil para scripts que não carreguem após DOM
  window.applyCompanyPhone = patchWhatsAppLinks;
})();
