/* Interatividade: menu, filtros, busca, modal 3D */
document.addEventListener('DOMContentLoaded',()=>{
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  menuToggle?.addEventListener('click',()=>{
    if(mainNav.style.display==='block') mainNav.style.display=''; else mainNav.style.display='block';
  });

  /* THEME: toggle dark/light (single button) */
  const themeToggle = document.getElementById('themeToggle');
  const applyTheme = (theme)=>{
    const html = document.documentElement;
    if(theme==='dark') html.setAttribute('data-theme','dark'); else html.removeAttribute('data-theme');
    try{ localStorage.setItem('site-theme', theme); }catch(e){}
    if(themeToggle) themeToggle.textContent = theme==='dark' ? '\u263E' : '\u2600';
  }

  // init
  const saved = localStorage.getItem('site-theme');
  if(saved==='dark' || saved==='light') applyTheme(saved);
  else applyTheme('light');

  themeToggle?.addEventListener('click', ()=>{
    const current = localStorage.getItem('site-theme')==='dark' ? 'dark' : 'light';
    const next = current==='dark' ? 'light' : 'dark';
    applyTheme(next);
  });

  // Filtros
  const cards = Array.from(document.querySelectorAll('.card'));
  const filterLocation = document.getElementById('filterLocation');
  const filterBedrooms = document.getElementById('filterBedrooms');
  const filterPrice = document.getElementById('filterPrice');
  const searchInput = document.getElementById('searchInput');

  function applyFilters(){
    const loc = filterLocation?.value || '';
    const beds = filterBedrooms?.value || '';
    const price = filterPrice?.value || '';
    const q = searchInput?.value?.toLowerCase() || '';

    cards.forEach(card=>{
      const cardLoc = (card.dataset.location||'').toLowerCase();
      const cardBeds = card.dataset.bedrooms || '';
      const cardPrice = Number(card.dataset.price || 0);
      let ok = true;
      if(loc && !cardLoc.includes(loc.toLowerCase())) ok=false;
      if(beds){
        if(beds==='3' && Number(cardBeds) < 3) ok=false;
        if(beds!=='3' && Number(cardBeds)!==Number(beds)) ok=false;
      }
      if(price){
        if(price.includes('-')){
          const [min,max]=price.split('-').map(Number);
          if(!(cardPrice>=min && cardPrice<=max)) ok=false;
        } else if(price.endsWith('+')){
          const min = Number(price.replace('+',''));
          if(cardPrice<min) ok=false;
        }
      }
      if(q){
        const txt = (card.innerText || '').toLowerCase();
        if(!txt.includes(q)) ok=false;
      }
      card.style.display = ok ? '' : 'none';
    });
  }

  [filterLocation,filterBedrooms,filterPrice,searchInput].forEach(el=>el?.addEventListener('change',applyFilters));
  searchInput?.addEventListener('input',applyFilters);

  // Modal 3D
  const modal = document.getElementById('tourModal');
  const modalClose = document.getElementById('modalClose');
  const modalModel = document.getElementById('modalModel');

  document.querySelectorAll('.open-tour').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const model = btn.dataset.model;
      if(modal && modalModel){
        modalModel.setAttribute('src', model);
        modal.setAttribute('aria-hidden','false');
      }
    });
  });

  modalClose?.addEventListener('click',()=>{
    if(modal){
      modal.setAttribute('aria-hidden','true');
      if(modalModel) modalModel.setAttribute('src','');
    }
  });

  // Fechar modal ao clicar fora
  modal?.addEventListener('click',(e)=>{
    if(e.target===modal){
      modal.setAttribute('aria-hidden','true');
      modalModel && modalModel.setAttribute('src','');
    }
  });

  // Smooth links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',(e)=>{
      const href = a.getAttribute('href');
      if(href && href.startsWith('#')){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

});
