# @blockle/blocks design system

Design system for react with vanilla-extract.

## Installation

```bash
yarn add @blockle/blocks
```

## Setup

```jsx
import React from 'react';

import '@blockle/blocks/reset';
import { BlocksProvider } from '@blockle/blocks';
import { momotaro } from '@blockle/blocks-theme-momotaro';

const App = () => (
  <BlocksProvider theme={momotaro} colorScheme="system" asChild>
    <body>
      <div>Your app here</div>
    </body>
  </BlocksProvider>
);
```

`colorScheme` is `light`, `dark` or `system` (follows the OS preference). It defaults to the parent provider's scheme, or `system` at the top level. The provider element paints the theme's `surface` background and `text` color, so apply the top-level provider to the whole page (for example with `asChild` on `<body>`) to make the page background follow the scheme. Nest a provider with its own `colorScheme` to give one section a different scheme.

## Usage

```jsx
import React from 'react';
import { Button } from '@blockle/blocks';

const App = () => <Button variant="ghost">Click me</Button>;
```

## Theming

yourTheme.css.ts

```jsx
import { ThemeTokens, makeComponentTheme, makeTheme, style } from "@blockle/blocks";

const tokens: ThemeTokens = {
  // ...
};

const button = makeComponentTheme('button', {
  root: style({
    ...
  }),
  variants: {
    primary: style({
      ...
    }),
    secondary: style({
      ...
    })
  },
  compoundVariants: [],
  defaultVariants: {
    variant: 'primary',
  },
});

export const theme = makeTheme({
  name: 'Theme name',
  tokens,
  components,
});
```
