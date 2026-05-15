import { LitElement, html } from 'lit';
import '@carbon/web-components/es/components/tabs/index.js';
import '@carbon/web-components/es/components/button/index.js';

class TabWrapper extends LitElement {
  static properties = {
    tabs: { state: true },
    selectedIndex: { state: true }
  };

  defaultTabs = [
    { id: 'tab-1', label: 'Tab 1', target: 'panel-1', value: 'tab-1' },
    { id: 'tab-2', label: 'Tab 2', target: 'panel-2', value: 'tab-2' },
    { id: 'tab-3', label: 'Tab 3', target: 'panel-3', value: 'tab-3' },
    { id: 'tab-4', label: 'Tab 4', target: 'panel-4', value: 'tab-4' },
  ];

  constructor() {
    super();
    this.tabs = [...this.defaultTabs];
    this.selectedIndex = 0;
  }

  handleTabClosed(event) {
    const { index } = event.detail;
    this.tabs = this.tabs.filter((_, i) => i !== index);
  }

  handleTabSelected(event) {
    this.selectedIndex = event.detail.index;
  }

  resetTabs() {
    this.tabs = [...this.defaultTabs];
    this.selectedIndex = 0;
  }

  render() {
    console.log(this.selectedIndex,'this.selectedIndex');
    
    return html`
      <cds-button style="margin-bottom: 2rem" @click="${this.resetTabs}">
        Reset
      </cds-button>
      <cds-tabs
        dismissable
        selected-index="${this.selectedIndex}"
        @cds-tab-closed="${this.handleTabClosed}"
        @cds-tabs-selected="${this.handleTabSelected}"
      >
        ${this.tabs.map(tab => html`
          <cds-tab 
            id="${tab.id}" 
            target="${tab.target}" 
            value="${tab.value}"
          >
            ${tab.label}
          </cds-tab>
        `)}
      </cds-tabs>
      <div class="cds-tab-panels">
        ${this.tabs.map((tab, index) => {
          console.log(index, 'index');
          console.log(this.selectedIndex !== index, 'this.selectedIndex !== index');
          
          return html`
          <div
            id="${tab.target}"
            role="tabpanel"
            aria-labelledby="${tab.id}"
            ?hidden="${this.selectedIndex !== index}"
          >
            <p>Content for ${tab.label}</p>
          </div>
        `
        }
        )}
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('tab-wrapper', TabWrapper);


