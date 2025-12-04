/* Copiado de PROPERTY.JS para public/assets/js */
// usa a constante global definida em `config.js`
const COMPANY_PHONE = (window.COMPANY_PHONE_GLOBAL) ? window.COMPANY_PHONE_GLOBAL : '5511999999999'; // substitua em config.js

const PROPERTIES = [
  { id:1, title:'Apartamento Luxo', location:'São Paulo', price:1200000, bedrooms:3, images:['/assets/img/p1-1.jpg','/assets/img/p1-2.jpg'], model:'/assets/models/p1.glb' },
  { id:2, title:'Casa Espaçosa', location:'Campinas', price:850000, bedrooms:4, images:['/assets/img/p2-1.jpg','/assets/img/p2-2.jpg'], model:'/assets/models/p2.glb' },
  { id:3, title:'Loft Moderno', location:'São Paulo', price:600000, bedrooms:1, images:['/assets/img/p3-1.jpg'], model:'/assets/models/p3.glb' },
  { id:4, title:'Cobertura', location:'Rio de Janeiro', price:2000000, bedrooms:5, images:['/assets/img/p4-1.jpg'], model:'/assets/models/p4.glb' },
  { id:5, title:'Flat Compacto', location:'Belo Horizonte', price:320000, bedrooms:1, images:['/assets/img/p5-1.jpg'], model:'/assets/models/p5.glb' },
  { id:6, title:'Sítio Aconchegante', location:'Campinas', price:450000, bedrooms:2, images:['/assets/img/p6-1.jpg'], model:'/assets/models/p6.glb' }
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

  if(gallery){
    gallery.innerHTML = '';
    prop.images.forEach(src=>{
      const img = document.createElement('img');
      img.src = src; img.className='thumb';
      img.addEventListener('click',()=>{ document.getElementById('mainImage').src = src; });
      gallery.appendChild(img);
    });
  }

  tourBtn?.addEventListener('click', ()=>{
    const modal = document.getElementById('tourModal');
    const modalModel = document.getElementById('modalModel');
    if(modal && modalModel){ modalModel.setAttribute('src', prop.model); modal.setAttribute('aria-hidden','false'); }
  });

  document.getElementById('whatsappSchedule')?.addEventListener('click', ()=>{
    const text = encodeURIComponent(`Olá, tenho interesse no imóvel: ${prop.title} (ID ${prop.id}). Gostaria de agendar uma visita.`);
    window.open(`https://wa.me/${COMPANY_PHONE}?text=${text}`,'_blank');
  });

});
