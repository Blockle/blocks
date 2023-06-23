# @blockle/blocks

Blocks design system

## Installation

```bash
npm install @blockle/blocks
```

## Setup

```jsx
import React from 'react';

import '@blockle/blocks/reset.css';
import { ThemeProvider } from '@blockle/blocks';
import { momotaro } from '@blockle/blocks/themes/momotaro';

// const Link = makeLinkComponent(...)

const App = () => (
  <ThemeProvider theme={theme} spritePath="/public/" linkComponent={Link}>
    ...
  </ThemeProvider>
);
```

## Usage

```jsx
import React from 'react';
import { Button } from '@blockle/blocks';

const App = () => <Button>Click me</Button>;
```

## Theming

yourTheme.css.ts

```jsx
import { makeTokens, makeComponentTheme, makeTheme } from "@blockle/blocks";

const tokens = makeTokens({ ... });

const button = makeComponentTheme({
  type: 'button',
  ...
});

const theme = makeTheme({
  tokens,
  components: {
    button
  }
});
```
