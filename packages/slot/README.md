# @blockle/slot

A simple slot component for React.

## Installation

```bash
npm install @blockle/slot
```

## Usage

```tsx
import { createSlottable, Slot } from '@blockle/slot';

const Template = createSlottable('button'); // Provide a default tag name

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
