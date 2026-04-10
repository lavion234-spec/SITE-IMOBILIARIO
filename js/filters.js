/**
 * Filters Module
 * Handles property filtering and search functionality
 */

import { debounce } from './utils.js';

const EMPTY_FILTERS = {
  location: '',
  bedrooms: '',
  price: '',
  search: ''
};

class FilterManager {
  constructor() {
    this.filters = { ...EMPTY_FILTERS };
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
    const { location, bedrooms, price, search } = this.filters;

    return properties.filter(property => {
      // Location filter
      if (location) {
        const locationMatch = property.location.city.toLowerCase().includes(location.toLowerCase());
        if (!locationMatch) return false;
      }

      // Bedrooms filter
      if (bedrooms) {
        const bedroomsValue = parseInt(bedrooms, 10);
        if (bedroomsValue === 3) {
          // 3+ bedrooms
          if (property.details.bedrooms < 3) return false;
        } else {
          if (property.details.bedrooms !== bedroomsValue) return false;
        }
      }

      // Price filter
      if (price) {
        const propertyPrice = property.price;

        if (price.includes('-')) {
          const [min, max] = price.split('-').map(Number);
          if (propertyPrice < min || propertyPrice > max) return false;
        } else if (price.endsWith('+')) {
          const min = Number(price.replace('+', ''));
          if (propertyPrice < min) return false;
        }
      }

      // Search filter
      if (search) {
        const searchableText = [
          property.title,
          property.description,
          property.location.city,
          property.location.neighborhood,
          property.shortDescription,
          ...property.features
        ].join(' ').toLowerCase();

        if (!searchableText.includes(search)) return false;
      }

      return true;
    });
  }

  triggerFilterChange() {
    if (typeof this.onFilterChange === 'function') {
      this.onFilterChange(this.filters);
    }
  }

  setOnFilterChange(callback) {
    this.onFilterChange = callback;
  }

  reset() {
    this.filters = { ...EMPTY_FILTERS };

    Object.values(this.filterElements).forEach(element => {
      if (!element) return;

      if (element.tagName === 'INPUT') {
        element.value = '';
      } else if (element.tagName === 'SELECT') {
        element.selectedIndex = 0;
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
