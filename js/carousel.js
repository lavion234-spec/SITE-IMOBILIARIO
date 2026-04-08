/**
 * Carousel Module
 * Handles carousel/slider functionality for property showcases
 */

import { prefersReducedMotion } from './utils.js';

class Carousel {
  constructor(containerSelector, options = {}) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    this.options = {
      autoplay: true,
      interval: 5000,
      itemsPerView: 3,
      gap: 20,
      ...options
    };

    this.currentIndex = 0;
    this.items = [];
    this.isPlaying = false;
    this.intervalId = null;
    
    // Ajustar itemsPerView baseado no tamanho da tela
    this.updateItemsPerView();
    window.addEventListener('resize', () => this.updateItemsPerView());
  }
  
  updateItemsPerView() {
    const width = window.innerWidth;
    if (width <= 900) {
      this.options.itemsPerView = 1; // Mobile
    } else if (width <= 1200) {
      this.options.itemsPerView = 2; // Tablet
    } else {
      this.options.itemsPerView = 3; // Desktop
    }
  }

  init() {
    if (!this.container) return;

    this.items = Array.from(this.container.querySelectorAll('.card'));
    if (this.items.length === 0) return;

    this.setupControls();
    this.show(0);

    if (this.options.autoplay && !prefersReducedMotion()) {
      this.start();
    }

    this.setupAccessibility();
  }

  setupControls() {
    const prevButton = this.container.parentElement.querySelector('.carousel-control.prev');
    const nextButton = this.container.parentElement.querySelector('.carousel-control.next');

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        this.previous();
        this.pause();
      });
      prevButton.setAttribute('aria-label', 'Item anterior');
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        this.next();
        this.pause();
      });
      nextButton.setAttribute('aria-label', 'Próximo item');
    }

    // Keyboard navigation
    this.container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.previous();
        this.pause();
      } else if (e.key === 'ArrowRight') {
        this.next();
        this.pause();
      }
    });

    // Pause on hover
    this.container.addEventListener('mouseenter', () => this.pause());
    this.container.addEventListener('mouseleave', () => {
      if (this.options.autoplay && !prefersReducedMotion()) {
        this.start();
      }
    });
  }

  setupAccessibility() {
    this.container.setAttribute('role', 'region');
    this.container.setAttribute('aria-label', 'Carrossel de imóveis');
    
    this.items.forEach((item, index) => {
      item.setAttribute('role', 'group');
      item.setAttribute('aria-roledescription', 'slide');
      item.setAttribute('aria-label', `${index + 1} de ${this.items.length}`);
    });
  }

  show(index) {
    if (this.items.length === 0) return;

    this.currentIndex = this.normalizeIndex(index);
    
    this.items.forEach((item, i) => {
      const isVisible = i >= this.currentIndex && i < this.currentIndex + this.options.itemsPerView;
      
      if (isVisible) {
        item.style.display = 'flex';
        item.setAttribute('aria-hidden', 'false');
      } else {
        item.style.display = 'none';
        item.setAttribute('aria-hidden', 'true');
      }
    });
  }

  next() {
    const nextIndex = this.currentIndex + this.options.itemsPerView;
    this.show(nextIndex >= this.items.length ? 0 : nextIndex);
  }

  previous() {
    const prevIndex = this.currentIndex - this.options.itemsPerView;
    this.show(prevIndex < 0 ? Math.max(0, this.items.length - this.options.itemsPerView) : prevIndex);
  }

  start() {
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    this.intervalId = setInterval(() => {
      this.next();
    }, this.options.interval);
  }

  pause() {
    if (!this.isPlaying) return;
    
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  destroy() {
    this.pause();
    this.items.forEach(item => {
      item.style.display = '';
      item.removeAttribute('aria-hidden');
    });
  }

  normalizeIndex(index) {
    if (index < 0) return 0;
    if (index >= this.items.length) return this.items.length - this.options.itemsPerView;
    return index;
  }

  updateItems() {
    this.items = Array.from(this.container.querySelectorAll('.card:not([style*="display: none"])'));
    if (this.currentIndex >= this.items.length) {
      this.show(0);
    } else {
      this.show(this.currentIndex);
    }
  }
}

export default Carousel;
