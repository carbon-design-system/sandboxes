import { createComponent } from '@lit/react';
import React from 'react';
import '@carbon/web-components/es/components/tabs/index.js';
import '@carbon/web-components/es/components/button/index.js';

// Create React wrappers for Carbon web components
// This provides proper event handling and property binding for React 17

export const CdsTabs = createComponent({
  tagName: 'cds-tabs',
  elementClass: customElements.get('cds-tabs'),
  react: React,
  events: {
    onCdsTabClosed: 'cds-tab-closed',
    onCdsTabsSelected: 'cds-tabs-selected',
  },
});

export const CdsTab = createComponent({
  tagName: 'cds-tab',
  elementClass: customElements.get('cds-tab'),
  react: React,
});

export const CdsButton = createComponent({
  tagName: 'cds-button',
  elementClass: customElements.get('cds-button'),
  react: React,
});


