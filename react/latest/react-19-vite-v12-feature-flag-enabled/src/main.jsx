import './index.scss';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { FeatureFlags } from '@carbon/react';
import App from './App';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
  <React.StrictMode>
    <FeatureFlags enableV12Release>
      <App />
    </FeatureFlags>
  </React.StrictMode>
);
