/**
 * Main Application Module
 * Coordinates all modules and initializes the application
 */

import config from './config.js';
import themeManager from './theme.js';
import FilterManager from './filters.js';
import Carousel from './carousel.js';
import { TourModal } from './modal.js';
import { lazyLoadImages, scrollToElement } from './utils.js';

class App {
  constructor() {
    this.config = config;
    this.themeManager = themeManager;
    this.filterManager = new FilterManager();
    this.carousel = null;
    this.tourModal = null;
    this.menuOpen = false;
    this.analyticsMeasurementId = null;
  }

  async init() {
    try {
      // Load configuration
      await this.config.loadConfig();
      await this.config.loadProperties();

      // Initialize analytics and conversion tracking
      this.initAnalytics();
      this.setupConversionTracking();

      // Initialize core features
      this.themeManager.init();
      this.setupNavigation();
      this.setupSmoothScrolling();
      
      // Initialize lazy loading for images
      lazyLoadImages();

      // Page-specific initialization
      const page = this.detectCurrentPage();
      await this.initPage(page);

      console.log('✅ Application initialized successfully');
    } catch (error) {
      console.error('Error initializing application:', error);
    }
  }

  initAnalytics() {
    const configuredId = this.config.get('analytics.ga4MeasurementId') || this.config.get('analytics.googleAnalyticsId');
    const fallbackId = 'G-P4E25SY5VZ';
    const measurementId = configuredId || fallbackId;

    if (!/^G-[A-Z0-9]+$/i.test(measurementId)) {
      return;
    }

    this.analyticsMeasurementId = measurementId;

    if (!document.querySelector('script[data-ga4="true"]')) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      script.setAttribute('data-ga4', 'true');
      document.head.appendChild(script);
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() {
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      anonymize_ip: true,
      transport_type: 'beacon'
    });
  }

  trackEvent(eventName, params = {}) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, params);
  }

  setupConversionTracking() {
    document.addEventListener('click', (event) => {
      const detailsLink = event.target.closest('a[href*="PROPERTY.HTML?id="]');
      if (detailsLink) {
        const url = new URL(detailsLink.href, window.location.origin);
        const propertyId = url.searchParams.get('id') || 'unknown';
        this.trackEvent('select_property', {
          property_id: propertyId,
          source_page: this.detectCurrentPage()
        });
      }

      const whatsappLink = event.target.closest('a[href*="wa.me"]');
      if (whatsappLink) {
        this.trackEvent('generate_lead', {
          method: 'whatsapp',
          source_page: this.detectCurrentPage()
        });
      }
    });
  }

  detectCurrentPage() {
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1).toLowerCase();

    if (filename.includes('catalog')) return 'catalog';
    if (filename.includes('property')) return 'property';
    return 'home';
  }

  async initPage(page) {
    switch (page) {
      case 'home':
        await this.initHomePage();
        break;
      case 'catalog':
        await this.initCatalogPage();
        break;
      case 'property':
        await this.initPropertyPage();
        break;
    }
  }

  async initHomePage() {
    // Render dynamic properties for home carousel
    this.renderHomeProperties();

    // Initialize carousel for home page
    this.initializeHomeCarousel();

    // Initialize 3D tour modal
    this.tourModal = new TourModal('#tourModal');
    this.tourModal.init();

    // Setup tour buttons
    this.setupTourButtons();

    // Initialize filters
    this.filterManager.init();
    this.filterManager.setOnFilterChange(() => {
      this.renderHomeProperties();
      this.initializeHomeCarousel();
    });
  }

  initializeHomeCarousel() {
    if (this.carousel) {
      this.carousel.destroy();
    }

    this.carousel = new Carousel('.carousel-container', {
      autoplay: true,
      interval: this.config.get('features.carouselAutoplayInterval') || 5000,
      itemsPerView: 3
    });
    this.carousel.init();
  }

  renderHomeProperties() {
    const carouselContainer = document.querySelector('.carousel-container');
    if (!carouselContainer) return;

    const properties = this.config.getProperties() || [];
    const filteredProperties = this.filterManager.filterProperties(properties);

    carouselContainer.innerHTML = '';

    if (filteredProperties.length === 0) {
      carouselContainer.innerHTML = `
        <div class="no-results" role="status" aria-live="polite">
          <p>Nenhum imóvel encontrado com os filtros selecionados.</p>
          <button class="btn btn-secondary" id="resetFilters">Limpar Filtros</button>
        </div>
      `;

      document.getElementById('resetFilters')?.addEventListener('click', () => {
        this.filterManager.reset();
      });
      return;
    }

    filteredProperties.forEach((property) => {
      const card = this.createPropertyCard(property);
      carouselContainer.appendChild(card);
    });

    lazyLoadImages();
  }

  async initCatalogPage() {
    // Load and render properties
    await this.renderCatalogProperties();

    // Initialize filters
    this.filterManager.init();
    this.filterManager.setOnFilterChange(() => {
      this.renderCatalogProperties();
    });

    // Initialize 3D tour modal
    this.tourModal = new TourModal('#tourModal');
    if (this.tourModal.modal) {
      this.tourModal.init();
      this.setupTourButtons();
    }

    // Initialize pagination
    this.setupPagination();
  }

  async initPropertyPage() {
    await this.renderPropertyDetails();
    
    // Setup schedule buttons
    this.setupScheduleButtons();
  }

  async renderCatalogProperties() {
    const cardsContainer = document.getElementById('cards');
    if (!cardsContainer) return;

    const properties = this.config.getProperties();
    const filteredProperties = this.filterManager.filterProperties(properties);

    cardsContainer.innerHTML = '';

    if (filteredProperties.length === 0) {
      cardsContainer.innerHTML = `
        <div class="no-results" role="status" aria-live="polite">
          <p>Nenhum imóvel encontrado com os filtros selecionados.</p>
          <button class="btn btn-secondary" id="resetFilters">Limpar Filtros</button>
        </div>
      `;
      
      document.getElementById('resetFilters')?.addEventListener('click', () => {
        this.filterManager.reset();
      });
      return;
    }

    filteredProperties.forEach(property => {
      const card = this.createPropertyCard(property);
      cardsContainer.appendChild(card);
    });

    // Re-initialize lazy loading
    lazyLoadImages();

    // Setup tour buttons for new cards
    this.setupTourButtons();
  }

  createPropertyCard(property) {
    const imageSrc = property.images?.[0] || property.thumbnail || 'imagem/apartamento-studio.jpg';
    const card = document.createElement('article');
    card.className = 'card';
    card.setAttribute('data-location', property.location.city);
    card.setAttribute('data-bedrooms', property.details.bedrooms);
    card.setAttribute('data-price', property.price);

    card.innerHTML = `
      <figure class="card-image">
        <img 
          data-src="${imageSrc}" 
          alt="${property.title} - ${property.location.neighborhood}, ${property.location.city}"
          loading="lazy"
        />
      </figure>
      <div class="card-body">
        <h3>${property.title}</h3>
        <p class="muted">${property.shortDescription}</p>
        <div class="card-footer">
          <strong class="price" aria-label="Preço do imóvel">${property.priceFormatted}</strong>
          <div class="card-actions">
            <a 
              class="btn btn-sm" 
              href="PROPERTY.HTML?id=${property.id}"
              aria-label="Ver detalhes de ${property.title}"
            >
              Ver detalhes
            </a>
          </div>
        </div>
      </div>
    `;

    return card;
  }

  async renderPropertyDetails() {
    const propertyId = new URLSearchParams(window.location.search).get('id');
    if (!propertyId) {
      window.location.href = 'CATALOG.HTML';
      return;
    }

    const property = this.config.getProperty(propertyId);
    if (!property) {
      window.location.href = 'CATALOG.HTML';
      return;
    }

    // Update page title
    document.title = `${property.title} - ImoPrime`;

    // Populate property details
    this.populatePropertyDetails(property);

    // Initialize 3D model
    const modelViewer = document.getElementById('propertyModel');
    if (modelViewer && property.model3D) {
      modelViewer.setAttribute('src', property.model3D);
    }
  }

  populatePropertyDetails(property) {
    // Title and basic info
    const titleEl = document.getElementById('propertyTitle');
    if (titleEl) titleEl.textContent = property.title;

    const shortEl = document.getElementById('propertyShort');
    if (shortEl) shortEl.textContent = property.shortDescription;

    const priceEl = document.getElementById('propertyPrice');
    if (priceEl) priceEl.textContent = property.priceFormatted;

    const locationEl = document.getElementById('propertyLocation');
    if (locationEl) locationEl.textContent = `${property.location.address}, ${property.location.neighborhood} - ${property.location.city}/${property.location.state}`;

    const featuresEl = document.getElementById('propertyFeatures');
    if (featuresEl) {
      featuresEl.innerHTML = `<strong>Diferenciais:</strong> ${property.features.join(', ')}`;
    }

    const descEl = document.getElementById('propertyDesc');
    if (descEl) descEl.textContent = property.description;

    // Main image
    const mainImg = document.getElementById('propertyMainImage');
    if (mainImg && property.images.length > 0) {
      mainImg.src = property.images[0];
      mainImg.alt = `${property.title} - Imagem principal`;
    }

    // Thumbnails
    const thumbnailsContainer = document.getElementById('thumbnails');
    if (thumbnailsContainer) {
      thumbnailsContainer.innerHTML = '';
      property.images.forEach((src, index) => {
        const thumb = document.createElement('img');
        thumb.src = src;
        thumb.alt = `${property.title} - Foto ${index + 1}`;
        thumb.className = 'thumbnail';
        thumb.style.cssText = 'width:80px;height:60px;object-fit:cover;border-radius:6px;cursor:pointer';
        thumb.addEventListener('click', () => {
          if (mainImg) {
            mainImg.src = src;
            mainImg.alt = `${property.title} - Foto ${index + 1}`;
          }
        });
        thumbnailsContainer.appendChild(thumb);
      });
    }

    // Gallery
    const gallery = document.getElementById('galleryGrid');
    if (gallery) {
      gallery.innerHTML = '';
      property.images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `${property.title} - Foto ${index + 1}`;
        img.style.cssText = 'width:100%;border-radius:8px';
        gallery.appendChild(img);
      });
    }
  }

  setupNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
      const closeMenu = () => {
        this.menuOpen = false;
        mainNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menu');
      };

      const openMenu = () => {
        this.menuOpen = true;
        mainNav.classList.add('is-open');
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.setAttribute('aria-label', 'Fechar menu');
      };

      menuToggle.addEventListener('click', () => {
        if (this.menuOpen) {
          closeMenu();
        } else {
          openMenu();
        }
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (this.menuOpen && !mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
          closeMenu();
        }
      });

      // Close on link click (mobile UX expected behavior)
      mainNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          if (window.matchMedia('(max-width: 900px)').matches) {
            closeMenu();
          }
        });
      });

      // Keep state consistent when resizing to desktop
      window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
          closeMenu();
        }
      });

      // Accessibility: close menu with Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.menuOpen) {
          closeMenu();
        }
      });
    }
  }

  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
          e.preventDefault();
          scrollToElement(href, 80);
        }
      });
    });
  }

  setupTourButtons() {
    document.querySelectorAll('.open-tour').forEach(button => {
      const handler = () => {
        const modelUrl = button.getAttribute('data-model');
        const title = button.getAttribute('data-title') || '';
        
        if (this.tourModal && modelUrl) {
          this.tourModal.open3DTour(modelUrl, title);
        }
      };

      // Remove old listener if exists
      button.removeEventListener('click', handler);
      button.addEventListener('click', handler);
    });
  }

  setupScheduleButtons() {
    const phone = this.config.get('contact.whatsapp') || '5511999999999';
    const propertyId = new URLSearchParams(window.location.search).get('id');
    const property = this.config.getProperty(propertyId);

    const btnPresencial = document.getElementById('btnSchedulePres');
    const btnVirtual = document.getElementById('btnScheduleVirt');

    if (btnPresencial) {
      btnPresencial.addEventListener('click', () => {
        this.openWhatsApp(phone, property, 'presencial');
      });
    }

    if (btnVirtual) {
      btnVirtual.addEventListener('click', () => {
        this.openWhatsApp(phone, property, 'virtual');
      });
    }
  }

  openWhatsApp(phone, property, type) {
    this.trackEvent('generate_lead', {
      method: 'whatsapp',
      lead_type: type || 'geral',
      property_id: property?.id || 'none',
      property_title: property?.title || 'none',
      source_page: this.detectCurrentPage()
    });

    const message = property
      ? `Olá! Tenho interesse no imóvel "${property.title}" (${property.location.city}). Gostaria de agendar uma visita ${type}. Aguardo contato!`
      : `Olá! Gostaria de mais informações sobre os imóveis disponíveis.`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  setupPagination() {
    // Pagination logic would go here
    // For now, showing all filtered items
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
  });
} else {
  const app = new App();
  app.init();
}

export default App;
