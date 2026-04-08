/**
 * Filters Module
 * Handles property filtering and search functionality
 */

import { debounce } from './utils.js';

class FilterManager {
  constructor() {
    this.filters = {
      location: '',
      bedrooms: '',
      price: '',
      search: ''
    };
    this.filterElements = {};
    this.onFilterChange = null;
  }

  init() {
    this.setupFilterElements();
    this.attachEventListeners();
  }

  setupFilterElements() {
    this.filterElements = {
      location: document.getElementById('filterLocation'),
      bedrooms: document.getElementById('filterBedrooms'),
      price: document.getElementById('filterPrice'),
      search: document.getElementById('searchInput')
    };
  }

  attachEventListeners() {
    Object.entries(this.filterElements).forEach(([key, element]) => {
      if (!element) return;
      
      if (key === 'search') {
        const debouncedHandler = debounce(() => {
          this.filters.search = element.value.toLowerCase().trim();
          this.triggerFilterChange();
        }, 300);
        
        element.addEventListener('input', debouncedHandler);
      } else {
        element.addEventListener('change', () => {
          this.filters[key] = element.value;
          this.triggerFilterChange();
        });
      }
    });
  }

  filterProperties(properties) {
    return properties.filter(property => {
      // Location filter
      if (this.filters.location) {
        const locationMatch = property.location.city.toLowerCase().includes(this.filters.location.toLowerCase());
        if (!locationMatch) return false;
      }

      // Bedrooms filter
      if (this.filters.bedrooms) {
        const bedroomsValue = parseInt(this.filters.bedrooms);
        if (bedroomsValue === 3) {
          // 3+ bedrooms
          if (property.details.bedrooms < 3) return false;
        } else {
          if (property.details.bedrooms !== bedroomsValue) return false;
        }
      }

      // Price filter
      if (this.filters.price) {
        const price = property.price;
        
        if (this.filters.price.includes('-')) {
          const [min, max] = this.filters.price.split('-').map(Number);
          if (price < min || price > max) return false;
        } else if (this.filters.price.endsWith('+')) {
          const min = Number(this.filters.price.replace('+', ''));
          if (price < min) return false;
        }
      }

      // Search filter
      if (this.filters.search) {
        const searchText = this.filters.search.toLowerCase();
        const searchableText = [
          property.title,
          property.description,
          property.location.city,
          property.location.neighborhood,
          property.shortDescription,
          ...property.features
        ].join(' ').toLowerCase();

        if (!searchableText.includes(searchText)) return false;
      }

      return true;
    });
  }

  triggerFilterChange() {
    if (this.onFilterChange && typeof this.onFilterChange === 'function') {
      this.onFilterChange(this.filters);
    }
  }

  setOnFilterChange(callback) {
    this.onFilterChange = callback;
  }

  reset() {
    this.filters = {
      location: '',
      bedrooms: '',
      price: '',
      search: ''
    };

    Object.values(this.filterElements).forEach(element => {
      if (element) {
        if (element.tagName === 'INPUT') {
          element.value = '';
        } else if (element.tagName === 'SELECT') {
          element.selectedIndex = 0;
        }
      }
    });

    this.triggerFilterChange();
  }

  getActiveFilters() {
    return Object.entries(this.filters)
      .filter(([_, value]) => value !== '')
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
  }

  hasActiveFilters() {
    return Object.values(this.filters).some(value => value !== '');
  }
}

export default FilterManager;
