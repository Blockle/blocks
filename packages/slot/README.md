# @blockle/blocks-react-slot

A React utility for creating flexible, composable components using the asChild pattern. This package enables components to merge their props with child elements, allowing for powerful composition patterns.

## Installation

```bash
npm install @blockle/blocks-react-slot
```

## Features

- **asChild Pattern**: Merge component props with child elements
- **Slot Composition**: Use slots as placeholders for dynamic content
- **Type-Safe**: Full TypeScript support with proper type inference
- **Prop Merging**: Automatically merges className, style, and other props
- **Ref Forwarding**: Supports React refs

## Usage

### Basic Example

```tsx
import { createSlottable } from '@blockle/blocks-react-slot';

// Create Template and Slot components with a default element
const [Template, Slot] = createSlottable('div');

const MyComponent = ({ children, asChild, ...props }) => {
  return (
    <Template asChild={asChild} {...props}>
      <Slot>{children}</Slot>
    </Template>
  );
}

// Renders as: <div class="container">Content</div>
<MyComponent className="container">Content</MyComponent>

// Renders as: <a href="#" class="container">Link</a>
<MyComponent className="container" asChild>
  <a href="#">Link</a>
</MyComponent>
```

### Creating a Button Component

```tsx
import { createSlottable } from '@blockle/blocks-react-slot';

const [Template, Slot] = createSlottable('button');

const Button = ({ children, asChild, variant = 'primary', ...props }) => {
  const className = `btn btn-${variant}`;

  return (
    <Template asChild={asChild} className={className} {...props}>
      <Slot>{children}</Slot>
    </Template>
  );
}

// Renders as a button element
<Button onClick={handleClick}>Click me</Button>

// Renders as a link that looks like a button
<Button asChild>
  <a href="/home">Go Home</a>
</Button>
```

### Advanced Composition with Multiple Children

```tsx
const [Template, Slot] = createSlottable('div');

const Card = ({ children, asChild, ...props }) => {
  return (
    <Template asChild={asChild} className="card" {...props}>
      <span className="card-decoration">★</span>
      <Slot>{children}</Slot>
      <span className="card-decoration">★</span>
    </Template>
  );
}

// The Slot is replaced with the child, decorations are preserved
<Card asChild>
  <article>
    <h2>Title</h2>
    <p>Content</p>
  </article>
</Card>
// Renders: <article class="card"><span>★</span><h2>Title</h2><p>Content</p><span>★</span></article>
```

### Using noSlot for Simple Prop Merging

```tsx
const [Template] = createSlottable('div');

const Container = ({ children, asChild, ...props }) => {
  return (
    <Template asChild={asChild} noSlot className="container" {...props}>
      {children}
    </Template>
  );
}

// Direct prop merging without Slot component
<Container asChild noSlot className="wrapper">
  <section className="content">Hello</section>
</Container>
// Renders: <section class="container wrapper content">Hello</section>
```

## API

### `createSlottable(defaultElement)`

Creates a Template component and Slot component pair.

**Parameters:**

- `defaultElement`: A valid HTML element tag name (e.g., `'div'`, `'button'`, `'span'`)

**Returns:**

- `[Template, Slot]`: A tuple containing the Template component and Slot component

### Template Component Props

| Prop | Type | Description |
|------|------|-------------|
| `asChild` | `boolean` | When true, merges props with child element instead of rendering default element |
| `noSlot` | `boolean` | When true with `asChild`, directly merges props without requiring a Slot component |
| `children` | `React.ReactNode` | Content to render |
| `ref` | `React.Ref<Element>` | React ref |
| ...props | varies | Any props valid for the default element type |

### Slot Component

A marker component that indicates where child content should be inserted when using `asChild`.

```tsx
<Slot>{children}</Slot>
```

## Behavior

### Without asChild

Renders as the default element with provided props:

```tsx
<Template className="foo">Content</Template>
// Renders: <div class="foo">Content</div>
```

### With asChild and Slot

Merges Template props with the child element inside Slot:

```tsx
<Template asChild className="parent">
  <Slot>
    <a href="#" className="child">Link</a>
  </Slot>
</Template>
// Renders: <a href="#" class="parent child">Link</a>
```

### With asChild and noSlot

Directly merges props with the single child element:

```tsx
<Template asChild noSlot className="parent">
  <a href="#" className="child">Link</a>
</Template>
// Renders: <a href="#" class="parent child">Link</a>
```

## Error Handling

The package provides helpful error messages in development mode:

- "When using asChild, one child is required" - When using `noSlot` with multiple children
- "Template: No Slot provided" - When using `asChild` without a Slot component
- "When using asChild, at least one child is required" - When Slot has no children
- "When using asChild, only one child is allowed" - When Slot has multiple children

## Use Cases

- **Polymorphic Components**: Create components that can render as different elements
- **Design Systems**: Build flexible UI components that work with various HTML elements
- **Accessibility**: Allow semantic HTML while maintaining component styling and behavior
- **Link Components**: Create button-styled links without nesting interactive elements
- **Headless UI**: Separate component logic from rendering
- **TypeScript**: More performant than polymorphic components when only prop merging is needed
