# React v19 Vite with v12 feature flag enabled

This project is intended to serve as a reproduction starter with the v12 feature flag enabled for the Carbon Design System.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/carbon-design-system/sandboxes/tree/main/react/latest/react-19-vite-v12-feature-flag-enabled/?preset=node=)

## How the v12 feature flag is enabled

The v12 feature flag is enabled in two places:

**JavaScript (`src/main.jsx`)** — The `<FeatureFlags enableV12Release>` component from `@carbon/react` wraps the app at the root level, enabling all v12 JavaScript behaviour for every component in the tree:

```jsx
import { FeatureFlags } from '@carbon/react';

root.render(
  <React.StrictMode>
    <FeatureFlags enableV12Release>
      <App />
    </FeatureFlags>
  </React.StrictMode>
);
```

**Styles (`src/index.scss`)** — The `enable-v12-release` flag is set to `true` via `@carbon/react`'s SCSS feature-flags module before the main stylesheet is loaded, enabling all v12 CSS changes:

```scss
@use '@carbon/react/scss/feature-flags' with (
  $feature-flags: (
    'enable-v12-release': true,
  )
);
@use '@carbon/react' with (
  $font-path: '@ibm/plex'
);
```

Both the JS and SCSS flags must be set together to fully opt in to v12 styles and behaviour.

## Running locally

1. Install dependencies

```sh
yarn install
```

2. Run it

```sh
yarn dev
```
