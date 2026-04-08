/**
 * Modal Module
 * Handles modal dialogs with accessibility features
 */

class Modal {
  constructor(modalSelector) {
    this.modal = document.querySelector(modalSelector);
    if (!this.modal) return;

    this.closeButton = this.modal.querySelector('.modal-close');
    this.modalContent = this.modal.querySelector('.modal-content');
    this.focusableElements = [];
    this.previousActiveElement = null;
  }

  init() {
    if (!this.modal) return;

    this.setupAccessibility();
    this.attachEventListeners();
  }

  setupAccessibility() {
    this.modal.setAttribute('role', 'dialog');
    this.modal.setAttribute('aria-modal', 'true');
    
    if (!this.modal.hasAttribute('aria-labelledby')) {
      this.modal.setAttribute('aria-label', 'Diálogo modal');
    }
  }

  attachEventListeners() {
    // Close button
    if (this.closeButton) {
      this.closeButton.addEventListener('click', () => this.close());
    }

    // Close on overlay click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });

    // Trap focus within modal
    this.modal.addEventListener('keydown', (e) => {
      if (e.key === 'Tab' && this.isOpen()) {
        this.handleTabKey(e);
      }
    });
  }

  open(content = null) {
    if (content) {
      this.setContent(content);
    }

    this.previousActiveElement = document.activeElement;
    this.modal.setAttribute('aria-hidden', 'false');
    this.modal.style.display = 'flex';
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Focus management
    requestAnimationFrame(() => {
      this.updateFocusableElements();
      this.focusFirstElement();
    });

    // Dispatch event
    this.modal.dispatchEvent(new CustomEvent('modalopen', {
      detail: { modal: this.modal }
    }));
  }

  close() {
    this.modal.setAttribute('aria-hidden', 'true');
    this.modal.style.display = 'none';
    
    // Restore body scroll
    document.body.style.overflow = '';

    // Restore focus
    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
      this.previousActiveElement = null;
    }

    // Dispatch event
    this.modal.dispatchEvent(new CustomEvent('modalclose', {
      detail: { modal: this.modal }
    }));
  }

  setContent(content) {
    const contentArea = this.modal.querySelector('.modal-body') || this.modalContent;
    
    if (typeof content === 'string') {
      contentArea.innerHTML = content;
    } else if (content instanceof HTMLElement) {
      contentArea.innerHTML = '';
      contentArea.appendChild(content);
    }
  }

  isOpen() {
    return this.modal.getAttribute('aria-hidden') === 'false';
  }

  updateFocusableElements() {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ');

    this.focusableElements = Array.from(
      this.modal.querySelectorAll(focusableSelectors)
    ).filter(el => {
      return el.offsetParent !== null; // Only visible elements
    });
  }

  focusFirstElement() {
    if (this.focusableElements.length > 0) {
      this.focusableElements[0].focus();
    } else {
      this.closeButton?.focus();
    }
  }

  handleTabKey(e) {
    if (this.focusableElements.length === 0) return;

    const firstElement = this.focusableElements[0];
    const lastElement = this.focusableElements[this.focusableElements.length - 1];

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }
}

// 3D Tour Modal Manager
class TourModal extends Modal {
  constructor(modalSelector) {
    super(modalSelector);
    this.modelViewer = this.modal?.querySelector('model-viewer');
  }

  open3DTour(modelUrl, title = '') {
    if (!this.modelViewer) {
      console.error('Model viewer not found');
      return;
    }

    this.modelViewer.setAttribute('src', modelUrl);
    
    if (title) {
      this.modal.setAttribute('aria-label', `Tour 3D: ${title}`);
    }

    this.open();
  }

  close() {
    // Stop 3D model
    if (this.modelViewer) {
      this.modelViewer.setAttribute('src', '');
    }
    
    super.close();
  }
}

export { Modal, TourModal };
export default Modal;
