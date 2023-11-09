# @blockle/blocks design system

Design system for react with vanilla-extract.

## Installation

```bash
yarn add @blockle/blocks
```

## Setup

```jsx
import React from 'react';

import '@blockle/blocks/reset.css';
import { BlocksProvider } from '@blockle/blocks';
import { momotaro } from '@blockle/blocks/themes/momotaro';

const App = () => (
  <BlocksProvider theme={momotaro}>
    <div>Your app here</div>
  </BlocksProvider>
);
```

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
  base: style({
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
