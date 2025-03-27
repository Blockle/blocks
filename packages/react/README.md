# @blockle/blocks-hooks

A collection of React hooks.

## Installation

```bash
npm install @blockle/hooks
```

## Usage

### useIsomorphicLayoutEffect

```tsx
import { useIsomorphicLayoutEffect } from '@blockle/hooks';

export const Component = () => {
  useIsomorphicLayoutEffect(() => {
    // Your effect
  }, []);
  
  return <div>Component</div>;
};
```
