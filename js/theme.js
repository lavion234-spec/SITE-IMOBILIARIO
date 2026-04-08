/**
 * Theme Manager Module
 * Handles dark/light theme switching with persistence
 */

class ThemeManager {
  constructor() {
    this.currentTheme = 'light';
    this.storageKey = 'imoprime-theme';
    this.toggleButton = null;
  }

  init() {
    this.loadSavedTheme();
    this.setupToggleButton();
    this.setupMediaQuery();
  }

  loadSavedTheme() {
    try {
      const savedTheme = localStorage.getItem(this.storageKey);
      
      if (savedTheme === 'dark' || savedTheme === 'light') {
        this.applyTheme(savedTheme);
      } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.applyTheme(prefersDark ? 'dark' : 'light');
      }
    } catch (error) {
      console.error('Error loading theme:', error);
      this.applyTheme('light');
    }
  }

  setupToggleButton() {
    this.toggleButton = document.getElementById('themeToggle');
    
    if (this.toggleButton) {
      this.toggleButton.addEventListener('click', () => this.toggle());
      this.updateToggleButton();
    }
  }

  setupMediaQuery() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Listen for system theme changes
    mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem(this.storageKey)) {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  applyTheme(theme) {
    this.currentTheme = theme;
    const html = document.documentElement;
    
    if (theme === 'dark') {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.removeAttribute('data-theme');
    }
    
    this.saveTheme(theme);
    this.updateToggleButton();
    this.dispatchThemeChange();
  }

  toggle() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
  }

  saveTheme(theme) {
    try {
      localStorage.setItem(this.storageKey, theme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  }

  updateToggleButton() {
    if (this.toggleButton) {
      const icon = this.currentTheme === 'dark' ? '☀' : '☾';
      const label = this.currentTheme === 'dark' ? 'Modo Claro' : 'Modo Escuro';
      
      this.toggleButton.textContent = icon;
      this.toggleButton.setAttribute('aria-label', label);
      this.toggleButton.setAttribute('title', label);
    }
  }

  dispatchThemeChange() {
    window.dispatchEvent(new CustomEvent('themechange', {
      detail: { theme: this.currentTheme }
    }));
  }

  getCurrentTheme() {
    return this.currentTheme;
  }

  isDarkMode() {
    return this.currentTheme === 'dark';
  }
}

// Singleton instance
const themeManager = new ThemeManager();
export default themeManager;
