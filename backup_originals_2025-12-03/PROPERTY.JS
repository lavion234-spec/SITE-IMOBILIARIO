const COMPANY_PHONE = '5511999999999'; // placeholder

const PROPERTIES = [
  { id:1, title:'Apartamento Luxo', location:'São Paulo', price:1200000, bedrooms:3, images:[] },
  { id:2, title:'Casa Espaçosa', location:'Campinas', price:850000, bedrooms:4, images:[] }
];

document.addEventListener('DOMContentLoaded',()=>{
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get('id')) || null;
  const prop = PROPERTIES.find(p=>p.id===id) || PROPERTIES[0];

  const title = document.getElementById('propTitle');
  const price = document.getElementById('propPrice');
  const locationEl = document.getElementById('propLocation');
  const bedroomsEl = document.getElementById('propBedrooms');
  const gallery = document.getElementById('propGallery');
  const tourBtn = document.getElementById('openTour');

  if(title) title.textContent = prop.title;
  if(price) price.textContent = `R$ ${prop.price.toLocaleString('pt-BR')}`;
  if(locationEl) locationEl.textContent = prop.location;
  if(bedroomsEl) bedroomsEl.textContent = prop.bedrooms;

  tourBtn?.addEventListener('click', ()=>{
    const modal = document.getElementById('tourModal');
    const modalModel = document.getElementById('modalModel');
    if(modal && modalModel){ modalModel.setAttribute('src', prop.model || ''); modal.setAttribute('aria-hidden','false'); }
  });

  document.getElementById('whatsappSchedule')?.addEventListener('click', ()=>{
    const text = encodeURIComponent(`Olá, tenho interesse no imóvel: ${prop.title} (ID ${prop.id}). Gostaria de agendar uma visita.`);
    window.open(`https://wa.me/${COMPANY_PHONE}?text=${text}`,'_blank');
  });

});