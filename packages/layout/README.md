# @blockle/layout

## Box

The `Box` component is a simple layout component that provides a way to create elements with a predefined set of styles inherited from sprinkles.

```tsx
import { Box } from '@blockle/layout';

export const App = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      backgroundColor="primary"
    >
      <h1>Hello, World!</h1>
    </Box>
  ); // -> <div classNames="...">Hello, World!</div>
};
```

Use `asChild` to render the first child element as the root element with all props passed to it from the `Box` component.

```tsx
import { Box } from '@blockle/layout';

export const App = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      backgroundColor="primary"
      asChild
    >
      <h1>Hello, World!</h1>
    </Box>
  ); // -> <h1 classNames="...">Hello, World!</h1>
};
```
