/* Paginação simples para a página do catálogo */
document.addEventListener('DOMContentLoaded',()=>{
  const cardsContainer = document.getElementById('cards');
  if(!cardsContainer) return;
  const allCards = Array.from(cardsContainer.querySelectorAll('.card'));
  const pageInfo = document.getElementById('pageInfo');
  const prevBtn = document.getElementById('prevPage');
  const nextBtn = document.getElementById('nextPage');
  const pageSize = 4; // cards por página
  let currentPage = 1;

  function totalPages(){
    const visibleCards = allCards.filter(c=>c.style.display!=='none');
    return Math.max(1, Math.ceil(visibleCards.length / pageSize));
  }

  function visibleCards(){
    return allCards.filter(c=>c.style.display!=='none');
  }

  function showPage(page){
    const v = visibleCards();
    const t = Math.max(1, Math.ceil(v.length / pageSize));
    currentPage = Math.min(Math.max(1,page), t);
    v.forEach((card,idx)=>{
      const start = (currentPage-1)*pageSize;
      card.style.display = (idx>=start && idx<start+pageSize) ? '' : 'none';
    });
    pageInfo && (pageInfo.textContent = `Página ${currentPage} de ${t}`);
    prevBtn && (prevBtn.disabled = currentPage===1);
    nextBtn && (nextBtn.disabled = currentPage===t);
  }

  prevBtn?.addEventListener('click',()=> showPage(currentPage-1));
  nextBtn?.addEventListener('click',()=> showPage(currentPage+1));

  // Quando filtros aplicam, recomendamos recalcular a paginação
  // Observador simples para detectar mudanças de estilo (display)
  const observer = new MutationObserver(()=>{
    // reset to page 1 on filter change
    showPage(1);
  });
  allCards.forEach(c=>observer.observe(c,{attributes:true,attributeFilter:['style']}));

  // inicial
  showPage(1);
});
