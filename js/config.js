/**
 * Configuration Module
 * Loads and provides access to site configuration
 */

class Config {
  constructor() {
    this.config = null;
    this.properties = null;
    this.storageKey = 'imoprime_properties';
  }

  normalizeImagePath(path) {
    const value = String(path || '').trim();
    if (!value) return '';
    if (/^(https?:\/\/|data:|blob:)/i.test(value)) return value;
    if (/^[a-zA-Z]:\\/.test(value)) {
      const normalizedWindowsPath = value.replace(/\\/g, '/');
      const marker = '/imagem/imoveis/';
      const idx = normalizedWindowsPath.toLowerCase().lastIndexOf(marker);
      if (idx !== -1) return normalizedWindowsPath.slice(idx + 1);
      const fileName = normalizedWindowsPath.split('/').pop();
      return fileName ? `imagem/imoveis/${fileName}` : '';
    }
    return value;
  }

  normalizeProperties(properties) {
    if (!Array.isArray(properties)) return [];

    return properties.map((property) => {
      const images = Array.isArray(property?.images)
        ? property.images.map((img) => this.normalizeImagePath(img)).filter(Boolean)
        : [];

      const thumbnail = this.normalizeImagePath(property?.thumbnail) || images[0] || '';

      return {
        ...property,
        images,
        thumbnail
      };
    });
  }

  async loadConfig() {
    try {
      const response = await fetch('./config/site-config.json');
      if (!response.ok) throw new Error('Failed to load configuration');
      this.config = await response.json();
      return this.config;
    } catch (error) {
      console.error('Error loading config:', error);
      return this.getDefaultConfig();
    }
  }

  async loadProperties() {
    let localProperties = null;
    try {
      const local = localStorage.getItem(this.storageKey);
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          localProperties = this.normalizeProperties(parsed);
        }
      }
    } catch (error) {
      console.warn('Invalid local properties data:', error);
    }

    try {
      const response = await fetch('./data/properties.json');
      if (!response.ok) throw new Error('Failed to load properties');
      const data = await response.json();
      const jsonProperties = this.normalizeProperties(Array.isArray(data.properties) ? data.properties : []);
      this.properties = localProperties || jsonProperties;
      return this.properties;
    } catch (error) {
      console.error('Error loading properties:', error);
      this.properties = localProperties || [];
      return this.properties;
    }
  }

  getDefaultConfig() {
    return {
      site: {
        name: 'ImoPrime',
        fullName: 'THE FUTURE IMOBILIÁRIA',
        tagline: 'Encontre o imóvel ideal com tecnologia 3D',
        url: window.location.origin
      },
      contact: {
        phone: '558488884875',
        phoneFormatted: '(84) 88884-875',
        email: 'contato@imoprime.com',
        whatsapp: '558488884875'
      },
      features: {
        enableDarkMode: true,
        enable3DTours: true,
        itemsPerPage: 9,
        carouselAutoplayInterval: 5000
      }
    };
  }

  get(path) {
    if (!this.config) return null;
    
    const keys = path.split('.');
    let value = this.config;
    
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return null;
      }
    }
    
    return value;
  }

  getProperty(id) {
    if (!this.properties) return null;
    return this.properties.find(p => p.id === id || p.numericId === parseInt(id));
  }

  getProperties() {
    return this.properties || [];
  }

  getFeaturedProperties() {
    return this.getProperties().filter(p => p.featured);
  }
}

// Singleton instance
const config = new Config();
export default config;
