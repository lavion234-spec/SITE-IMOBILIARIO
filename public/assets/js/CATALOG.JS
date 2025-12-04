/* Copiado de CATALOG.JS para public/assets/js */
document.addEventListener('DOMContentLoaded',()=>{
  const catalog = document.getElementById('catalogList');
  const perPage = 6;
  const cards = Array.from(document.querySelectorAll('.card'));
  let page = 1;

  function render(){
    const visible = cards.filter(c=>c.style.display!=='none');
    const total = visible.length;
    const pages = Math.max(1, Math.ceil(total / perPage));
    const start = (page-1)*perPage;
    visible.forEach((c,i)=>{
      c.style.display = (i>=start && i<start+perPage) ? '' : 'none';
    });
    const pager = document.getElementById('pager');
    if(pager) pager.textContent = `Página ${page} de ${pages}`;
  }

  // recompute when filters change
  const obsTarget = document.getElementById('catalogList') || document.body;
  const mo = new MutationObserver(()=>{ page=1; render(); });
  mo.observe(obsTarget,{childList:true,subtree:true,attributes:true,characterData:true});

  // next/prev
  document.getElementById('prevPage')?.addEventListener('click',()=>{ if(page>1){ page--; render(); }});
  document.getElementById('nextPage')?.addEventListener('click',()=>{ page++; render(); });

  render();
});
