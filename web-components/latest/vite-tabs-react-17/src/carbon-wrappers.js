import { createComponent } from '@lit/react';
import React from 'react';
import CdsTabsElement from '@carbon/web-components/es/components/tabs/tabs.js';
import CdsTabElement from '@carbon/web-components/es/components/tabs/tab.js';
import CdsButtonElement from '@carbon/web-components/es/components/button/button.js';

export const CdsTabs = createComponent({
  tagName: 'cds-tabs',
  elementClass: CdsTabsElement,
  react: React,
  events: {
    onCdsTabClosed: 'cds-tab-closed',
    onCdsTabSelected: 'cds-tab-selected',
  },
});

export const CdsTab = createComponent({
  tagName: 'cds-tab',
  elementClass: CdsTabElement,
  react: React,
});

export const CdsButton = createComponent({
  tagName: 'cds-button',
  elementClass: CdsButtonElement,
  react: React,
});
