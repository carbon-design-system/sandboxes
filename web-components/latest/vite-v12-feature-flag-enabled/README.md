# Web Components Vite with v12 feature flag enabled

This project is intended to serve as a reproduction starter with the v12 feature flag enabled for the Carbon Design System.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/carbon-design-system/sandboxes/tree/main/web-components/latest/vite-v12-feature-flag-enabled/?preset=node=)

## How the v12 feature flag is enabled

The v12 feature flag is enabled by wrapping components with the `<feature-flags>` custom element from `@carbon/web-components` and setting the `enable-v12-release` attribute. Enabling this flag turns on every `enable-v12-*` flag at once, as well as `enable-focus-wrap-without-sentinels`.

**Import (`src/main.js`)** — Import `feature-flags` so the custom element is registered. Without this import, `<feature-flags>` is an unknown HTML tag and will not enable any flags:

```js
import '@carbon/web-components/es/components/feature-flags/index.js';
import '@carbon/web-components/es/components/tile/index.js';
```

**Markup (`index.html`)** — Wrap the components that should opt in to v12:

```html
<feature-flags enable-v12-release>
  <cds-clickable-tile>Clickable Tile with v12 default icon enabled</cds-clickable-tile>
</feature-flags>
```

## Running locally

1. Install dependencies

```sh
yarn install
```

2. Run it

```sh
yarn dev
```
