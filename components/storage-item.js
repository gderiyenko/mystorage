class StorageItem extends HTMLElement {
  constructor() {
    super();
    this.isEditing = false;
  }

  static get observedAttributes() {
    return ['data-key', 'data-value'];
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  get storageKey() {
    return this.getAttribute('data-key');
  }

  get storageValue() {
    return this.getAttribute('data-value');
  }

  render() {
    this.className = 'storage-item';
    this.innerHTML = `
      <div class="item-header">
        <div class="item-key">${this.escapeHtml(this.storageKey)}</div>
        <div class="item-actions">
          <button class="btn-secondary edit-btn">Edit</button>
          <button class="btn-danger remove-btn">Remove</button>
        </div>
      </div>
      <div class="item-value">${this.escapeHtml(this.formatValue())}</div>
    `;
  }

  formatValue() {
    try {
      const parsed = JSON.parse(this.storageValue);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return this.storageValue;
    }
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  attachEventListeners() {
    const editBtn = this.querySelector('.edit-btn');
    const removeBtn = this.querySelector('.remove-btn');

    editBtn.addEventListener('click', () => this.toggleEdit());
    removeBtn.addEventListener('click', () => this.handleRemove());
  }

  toggleEdit() {
    const editBtn = this.querySelector('.edit-btn');
    const valueContainer = this.querySelector('.item-value');

    if (!this.isEditing) {
      // Enter edit mode
      this.isEditing = true;
      editBtn.textContent = 'Save';
      
      const currentValue = this.formatValue();
      valueContainer.innerHTML = `<textarea class="value-editor">${this.escapeHtml(currentValue)}</textarea>`;
      
      const textarea = valueContainer.querySelector('textarea');
      textarea.focus();
      
      // Auto-resize textarea
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    } else {
      // Save changes
      const textarea = valueContainer.querySelector('textarea');
      const newStringValue = textarea.value;
      
      let newValue;
      try {
        newValue = JSON.parse(newStringValue);
      } catch (e) {
        newValue = newStringValue;
      }

      this.dispatchEvent(new CustomEvent('storage-update', {
        detail: { key: this.storageKey, value: newValue },
        bubbles: true
      }));
    }
  }

  handleRemove() {
    this.dispatchEvent(new CustomEvent('storage-remove', {
      detail: { key: this.storageKey },
      bubbles: true
    }));
  }

  resetEditMode() {
    this.isEditing = false;
    this.render();
    this.attachEventListeners();
  }
}

customElements.define('storage-item', StorageItem);