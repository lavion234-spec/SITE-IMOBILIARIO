/* PROPERTY.JS
   Carrega dados do imóvel via query param ?id=<n>
   Exibe imagens, modelo 3D e botão para agendar via WhatsApp
*/
document.addEventListener('DOMContentLoaded',()=>{
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || '1';

  // Telefone da empresa em formato internacional sem sinais: ex: +55 (11) 99999-9999 -> 5511999999999
  const companyPhone = '5511999999999';

  const properties = {
    '1':{
      title:'Apartamento Luxuoso no Centro',
      price:'R$ 1.200.000',
      location:'Rua Exemplo, Centro — São Paulo',
      short:'3 quartos • 150m² • Condomínio com piscina',
      features:'Piso aquecido, automação, varanda gourmet',
      desc:'Apartamento de alto padrão com acabamento premium, varanda gourmet e infraestrutura completa de lazer.',
      model:'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
      images:[
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3b3f6b',
        'https://images.unsplash.com/photo-1560184897-6b580b2b0b3b?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=1a2b3c',
        'https://images.unsplash.com/photo-1560449810-0defabf1b3b9?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=7a8b9c'
      ]
    },
    '2':{
      title:'Casa à Beira-Mar',
      price:'R$ 800.000',
      location:'Orla — Rio de Janeiro',
      short:'2 quartos • 120m² • Vista mar',
      features:'Varanda com vista, acesso à praia',
      desc:'Casa confortável com vista para o mar e acabamentos modernos.',
      model:'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb',
      images:[
        'https://images.unsplash.com/photo-1572120360610-d971b9b1b93e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2e5e5c',
        'https://images.unsplash.com/photo-1582582494703-8a3f2fd4c0a9?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=4d5e6f'
      ]
    },
    '3':{
      title:'Estúdio Moderno',
      price:'R$ 450.000',
      location:'Bairro Moderno — São Paulo',
      short:'1 quarto • 42m²',
      features:'Planta aberta e varanda',
      desc:'Estúdio compacto com projeto moderno, ideal para investidores ou jovem casal.',
      model:'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
      images:[
        'https://images.unsplash.com/photo-1572121914540-0d7c9b5fbf1f?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=9a9b9c'
      ]
    },
    '4':{
      title:'Casa Familiar',
      price:'R$ 650.000',
      location:'Porto Alegre — Bairro Tranquilo',
      short:'3 quartos • 130m²',
      features:'Quintal amplo e garagem',
      desc:'Residência ideal para família, com área externa e segurança.',
      model:'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb',
      images:[
        'https://images.unsplash.com/photo-1560449889-6b8c8a8b8d6f?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=abcd12'
      ]
    },
    '5':{
      title:'Apartamento com Varanda',
      price:'R$ 980.000',
      location:'São Paulo — Região Nobre',
      short:'2 quartos • 100m²',
      features:'Varanda, vista e segurança 24h',
      desc:'Apartamento com planta eficiente, varanda gourmet e excelente posição solar.',
      model:'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
      images:[
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=efgh34'
      ]
    },
    '6':{
      title:'Cobertura Penthouse',
      price:'R$ 2.200.000',
      location:'Rio de Janeiro — Cobertura',
      short:'4 quartos • 320m²',
      features:'Piscina privativa e vista panorâmica',
      desc:'Cobertura de alto padrão com piscina privativa e acabamentos exclusivos.',
      model:'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb',
      images:[
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=ijkl56'
      ]
    }
  };

  const prop = properties[id] || properties['1'];

  // Populate DOM
  document.getElementById('propertyTitle').textContent = prop.title;
  document.getElementById('propertyShort').textContent = prop.short;
  document.getElementById('propertyPrice').textContent = prop.price;
  document.getElementById('propertyLocation').textContent = prop.location;
  document.getElementById('propertyFeatures').innerHTML = '<strong>Diferenciais:</strong> ' + prop.features;
  document.getElementById('propertyDesc').textContent = prop.desc;

  const mainImg = document.getElementById('propertyMainImage');
  const thumbnails = document.getElementById('thumbnails');
  const galleryGrid = document.getElementById('galleryGrid');
  const modelViewer = document.getElementById('propertyModel');

  function setMainImage(src){
    if(mainImg) mainImg.src = src;
  }

  // thumbnails
  if(thumbnails && prop.images){
    thumbnails.innerHTML = '';
    prop.images.forEach((src,idx)=>{
      const t = document.createElement('img');
      t.src = src; t.alt = `thumb-${idx}`; t.style.width='80px'; t.style.height='60px'; t.style.objectFit='cover'; t.style.borderRadius='6px'; t.style.cursor='pointer';
      t.addEventListener('click',()=> setMainImage(src));
      thumbnails.appendChild(t);
    });
  }

  // gallery
  if(galleryGrid && prop.images){
    galleryGrid.innerHTML = '';
    prop.images.forEach(src=>{
      const img = document.createElement('img');
      img.src = src; img.alt = prop.title; img.style.width='100%'; img.style.borderRadius='8px';
      galleryGrid.appendChild(img);
    });
  }

  if(modelViewer && prop.model){
    modelViewer.setAttribute('src', prop.model);
  }

  // set initial main image
  if(prop.images && prop.images.length) setMainImage(prop.images[0]);

  // Schedule buttons -> WhatsApp
  const btnPres = document.getElementById('btnSchedulePres');
  const btnVirt = document.getElementById('btnScheduleVirt');

  function openWhatsApp(type){
    const message = encodeURIComponent(`Olá, tenho interesse no imóvel: ${prop.title} (ID ${id}). Gostaria de agendar uma visita ${type}. Por favor, entrem em contato.`);
    const url = `https://wa.me/${companyPhone}?text=${message}`;
    window.open(url,'_blank');
  }

  btnPres && btnPres.addEventListener('click',()=> openWhatsApp('presencial'));
  btnVirt && btnVirt.addEventListener('click',()=> openWhatsApp('virtual'));
});
