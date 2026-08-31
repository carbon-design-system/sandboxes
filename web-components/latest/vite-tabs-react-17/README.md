# Carbon Web Components Tabs - React 17 Example

This example demonstrates how to use Carbon's dismissable tabs web component in a React 17 application using `@lit/react` wrapper for better compatibility.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/carbon-design-system/sandboxes/tree/main/web-components/latest/vite-tabs-react-17/?preset=node=)


## Why @lit/react?

React 17 has limitations with web component event handling and property binding. The `@lit/react` package provides:
- Automatic event listener setup for custom events
- Proper property binding (not just attributes)
- Type-safe React components from web components

## Features

- Uses `@lit/react` to create React-friendly wrappers
- Proper event handling for `cds-tab-closed` events
- React state management for dynamic tab handling
- Reset functionality to restore default tabs

## Getting Started

```bash
yarn install
yarn run dev
```

## Usage

The example shows how to:
- Create React wrappers for Carbon web components using `@lit/react`
- Handle custom events in React 17
- Manage tab state in React
- Dynamically render tabs and panels