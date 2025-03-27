# @blockle/blocks-react-slot

A simple slot component for React.

> Note: The Slot component must be used as a direct child of the Template component.

## Installation

```bash
npm install @blockle/blocks-slot
```

## Usage

```tsx
import { createSlottable } from '@blockle/blocks-slot';

const [Template, Slot] = createSlottable('button'); // Provide default html tag

export const Button = ({asChild}) => {
  return (
    // Template setup
    <Template className="btn" onClick={() => console.log('clicked')}>
      [ICON]
      <Slot>{asChild}</Slot>
    </Template>
  );
};
```

```tsx
import { Button } from './Button';

export const App = () => {
  return (
    <>
      <Button>Button</Button> {/* -> <button class="btn">[ICON] Tag button</button> */}
      <Button asChild>
        <a href="/">Anchor</a>
      </Button> {/* -> <a class="btn">[ICON] Tag a</a> */}
    </>
  );
};
```
