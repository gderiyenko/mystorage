class AppFooter extends HTMLElement {
  connectedCallback() {
    this.className = 'app-footer';
    this.innerHTML = `
      <div class="footer-text">
        (c) MIT Free Software<br>
        Thank you for your support, contributions and donations <3
      </div>
      <div class="footer-links">
        <a href="https://github.com/yourusername/yourrepo" target="_blank" class="footer-link">
          <icon-svg name="github" size="18"></icon-svg>
          GitHub
        </a>
        <a href="https://buymeacoffee.com/yourusername" target="_blank" class="footer-link">
          <icon-svg name="coffee" size="18"></icon-svg>
          Buy me a coffee
        </a>
      </div>
    `;
  }
}

customElements.define('app-footer', AppFooter);