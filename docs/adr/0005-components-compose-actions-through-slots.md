# Components compose their actions through Slots; system-rendered components may build them in

A component that offers an action, such as removing a Tag or dismissing an Alert, doesn't draw its own button for it. It takes a `startSlot` and an `endSlot`, named by position, and the consumer composes the button, usually an `IconButton` whose required `label` gives it an accessible name. Tag was designed this way (T326), and Alert followed in T374, dropping `onRequestClose`, `closeLabel` and its built-in × button, and renaming `action` to `endSlot`. A built-in button fixes its look, icon, wording and position, and grows a prop for each of them. Composing keeps component APIs small and consistent, and since `IconButton` guarantees an accessible name, a built-in button no longer protects accessibility.

The exception is a component the consumer never renders, such as each Toast in `ToastProvider`: there's no call site to compose at, so it builds the action in and takes props like `closeLabel` for its wording.

## Considered Options

- **Keep built-in close buttons on Alert**: rejected. It goes against Tag, and the guaranteed accessible name it offered now comes from `IconButton`.
- **Slots named by content (`action`)**: rejected. Position-based names match Button, TextInput, NumericInput and Tag, and a Slot often holds more than one kind of content.

## Consequences

- Blocks ships no icon set, so each consumer brings its own × icon for a dismissable Alert.
- Alert doesn't style what's in its Slots. A composed button keeps its own `intent`, and Button has no `info` or `warning` Intent to match the Alert with; a way for buttons to inherit the surrounding text color is T375.
- `onRequestClose` remains on overlays (Dialog, Drawer, Popover), where it reports a request to close, such as Escape or an outside click, rather than drawing a button.
