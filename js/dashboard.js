const STORAGE_KEY = 'imoprime_properties';
const DEFAULT_JSON_PATH = './data/properties.json';
const IMAGE_BASE_PATH = 'imagem/imoveis/';

const form = document.getElementById('propertyForm');
const listEl = document.getElementById('propertyList');
const resetBtn = document.getElementById('resetForm');
const exportBtn = document.getElementById('exportJson');
const exportDeployBtn = document.getElementById('exportDeployJson');
const clearCacheLocalBtn = document.getElementById('clearCacheLocal');
const importFile = document.getElementById('importFile');
const imagesListEl = document.getElementById('imagesList');
const addImageFieldBtn = document.getElementById('addImageField');

let editingId = null;
let properties = [];

const fields = {
  id: document.getElementById('id'),
  title: document.getElementById('title'),
  city: document.getElementById('city'),
  state: document.getElementById('state'),
  neighborhood: document.getElementById('neighborhood'),
  price: document.getElementById('price'),
  bedrooms: document.getElementById('bedrooms'),
  area: document.getElementById('area'),
  model3D: document.getElementById('model3D'),
  shortDescription: document.getElementById('shortDescription'),
  description: document.getElementById('description'),
  featured: document.getElementById('featured'),
  type: document.getElementById('type')
};

function addImageField(value = '') {
  const row = document.createElement('div');
  row.className = 'image-row';

  const input = document.createElement('input');
  input.className = 'image-url';
  input.placeholder = `${IMAGE_BASE_PATH}foto.jpg`;
  input.value = normalizeImagePath(value);

  const preview = document.createElement('img');
  preview.className = 'image-preview';
  preview.alt = 'Prévia da imagem';
  preview.src = input.value || 'imagem/apartamento-studio.jpg';
  preview.onerror = () => {
    preview.onerror = null;
    preview.src = 'imagem/apartamento-studio.jpg';
  };

  input.addEventListener('input', () => {
    const normalized = normalizeImagePath(input.value);
    preview.src = normalized || 'imagem/apartamento-studio.jpg';
  });
  input.addEventListener('blur', () => {
    input.value = normalizeImagePath(input.value);
    preview.src = input.value || 'imagem/apartamento-studio.jpg';
  });

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'btn btn-sm btn-ghost remove-image';
  removeBtn.textContent = 'Remover';
  removeBtn.addEventListener('click', () => {
    row.remove();
    if (!imagesListEl.querySelector('.image-row')) addImageField('');
  });

  row.appendChild(input);
  row.appendChild(preview);
  row.appendChild(removeBtn);
  imagesListEl.appendChild(row);
}

function normalizeImagePath(value) {
  const v = (value || '').trim();
  if (!v) return '';
  if (/^(https?:\/\/|data:|blob:)/i.test(v)) return v;
  if (/^[a-zA-Z]:\\/.test(v)) {
    const normalizedWindowsPath = v.replace(/\\/g, '/');
    const marker = '/imagem/imoveis/';
    const idx = normalizedWindowsPath.toLowerCase().lastIndexOf(marker);
    if (idx !== -1) return normalizedWindowsPath.slice(idx + 1);
    const fileName = normalizedWindowsPath.split('/').pop();
    return fileName ? `${IMAGE_BASE_PATH}${fileName}` : '';
  }
  if (v.startsWith('./') || v.startsWith('/') || v.startsWith(IMAGE_BASE_PATH)) return v;
  return `${IMAGE_BASE_PATH}${v.replace(/^\/+/, '')}`;
}

function isValidImagePath(value) {
  if (!value) return false;
  return /^(https?:\/\/|data:|blob:)/i.test(value) || value.startsWith(IMAGE_BASE_PATH) || value.startsWith('./') || value.startsWith('/');
}

function collectImages() {
  const urls = Array.from(imagesListEl.querySelectorAll('.image-url'))
    .map((input) => normalizeImagePath(input.value))
    .filter(Boolean);

  const invalid = urls.find((url) => !isValidImagePath(url));
  if (invalid) {
    alert(`Caminho de imagem inválido: ${invalid}. Use ${IMAGE_BASE_PATH}arquivo.jpg ou URL completa.`);
    return null;
  }

  return urls;
}

async function loadInitialProperties() {
  const local = localStorage.getItem(STORAGE_KEY);
  if (local) {
    try {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed)) {
        properties = parsed;
        renderList();
        return;
      }
    } catch (_) {}
  }

  try {
    const response = await fetch(DEFAULT_JSON_PATH);
    const data = await response.json();
    properties = Array.isArray(data.properties) ? data.properties : [];
    persist();
  } catch (_) {
    properties = [];
  }
  renderList();
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
}

function toPriceFormatted(value) {
  const n = Number(value || 0);
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
}

function toPropertyObject() {
  const price = Number(fields.price.value);
  const bedrooms = Number(fields.bedrooms.value);
  const area = Number(fields.area.value);
  const images = collectImages();
  if (images === null) return null;

  if (!images.length) {
    alert('Adicione pelo menos uma imagem do imóvel.');
    return null;
  }

  const numericId = Number((properties.reduce((max, p) => Math.max(max, Number(p.numericId || 0)), 0) + 1));

  return {
    id: fields.id.value.trim(),
    numericId,
    title: fields.title.value.trim(),
    slug: fields.id.value.trim(),
    price,
    priceFormatted: toPriceFormatted(price),
    location: {
      city: fields.city.value.trim(),
      state: fields.state.value.trim().toUpperCase(),
      neighborhood: fields.neighborhood.value.trim(),
      address: '',
      zipCode: '',
      coordinates: { lat: 0, lng: 0 }
    },
    details: {
      bedrooms,
      bathrooms: 1,
      parkingSpaces: 1,
      area,
      builtYear: new Date().getFullYear(),
      furnished: false
    },
    features: [],
    description: fields.description.value.trim(),
    shortDescription: fields.shortDescription.value.trim(),
    images,
    thumbnail: images[0] || '',
    model3D: fields.model3D.value.trim(),
    type: fields.type.value,
    status: 'available',
    featured: fields.featured.value === 'true',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

function fillForm(property) {
  fields.id.value = property.id || '';
  fields.title.value = property.title || '';
  fields.city.value = property.location?.city || '';
  fields.state.value = property.location?.state || '';
  fields.neighborhood.value = property.location?.neighborhood || '';
  fields.price.value = property.price || 0;
  fields.bedrooms.value = property.details?.bedrooms || 0;
  fields.area.value = property.details?.area || 0;
  imagesListEl.innerHTML = '';
  if (Array.isArray(property.images) && property.images.length) {
    property.images.forEach((img) => addImageField(img));
  } else {
    addImageField('');
  }
  fields.model3D.value = property.model3D || '';
  fields.shortDescription.value = property.shortDescription || '';
  fields.description.value = property.description || '';
  fields.featured.value = property.featured ? 'true' : 'false';
  fields.type.value = property.type || 'apartment';
}

function clearForm() {
  form.reset();
  imagesListEl.innerHTML = '';
  addImageField('');
  editingId = null;
}

function removeProperty(id) {
  properties = properties.filter(p => p.id !== id);
  persist();
  renderList();
  if (editingId === id) clearForm();
}

function renderList() {
  listEl.innerHTML = '';
  if (!properties.length) {
    listEl.innerHTML = '<p class="muted-note">Nenhum imóvel cadastrado.</p>';
    return;
  }

  properties
    .slice()
    .sort((a, b) => Number(b.numericId || 0) - Number(a.numericId || 0))
    .forEach(property => {
      const item = document.createElement('article');
      item.className = 'item';
      item.innerHTML = `
        <div>
          <strong>${property.title}</strong>
          <p>${property.location?.city || ''}/${property.location?.state || ''} • ${property.priceFormatted || ''}</p>
        </div>
        <div class="item-actions">
          <button class="btn btn-sm btn-ghost" data-edit="${property.id}">Editar</button>
          <button class="btn btn-sm btn-danger" data-remove="${property.id}">Excluir</button>
        </div>
      `;
      listEl.appendChild(item);
    });

  listEl.querySelectorAll('[data-edit]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-edit');
      const property = properties.find(p => p.id === id);
      if (!property) return;
      editingId = id;
      fillForm(property);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  listEl.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-remove');
      removeProperty(id);
    });
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const payload = toPropertyObject();
  if (!payload) return;

  if (!payload.id) return;

  const duplicate = properties.find(p => p.id === payload.id && p.id !== editingId);
  if (duplicate) {
    alert('Já existe um imóvel com esse ID.');
    return;
  }

  if (editingId) {
    properties = properties.map(p => (p.id === editingId ? { ...payload, numericId: p.numericId, createdAt: p.createdAt, updatedAt: new Date().toISOString() } : p));
  } else {
    properties.push(payload);
  }

  persist();
  renderList();
  clearForm();
});

resetBtn.addEventListener('click', clearForm);

exportBtn?.addEventListener('click', () => {
  const data = { properties };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'properties-export.json';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

exportDeployBtn.addEventListener('click', () => {
  const data = { properties };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'properties.json';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

importFile.addEventListener('change', async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  try {
    const content = await file.text();
    const json = JSON.parse(content);
    if (!Array.isArray(json.properties)) throw new Error('JSON inválido');
    properties = json.properties;
    persist();
    renderList();
    clearForm();
  } catch {
    alert('Não foi possível importar o JSON.');
  }
  importFile.value = '';
});

addImageFieldBtn.addEventListener('click', () => addImageField(''));

clearCacheLocalBtn?.addEventListener('click', async () => {
  const confirmed = window.confirm('Isso vai limpar os dados locais do painel e o cache do site neste navegador. Deseja continuar?');
  if (!confirmed) return;

  localStorage.removeItem(STORAGE_KEY);

  if ('caches' in window) {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => caches.delete(key)));
  }

  alert('Cache/local limpos com sucesso. A página será recarregada.');
  window.location.reload();
});

loadInitialProperties();
if (!imagesListEl.querySelector('.image-row')) addImageField('');
