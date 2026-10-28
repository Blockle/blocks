# @blockle/blocks-react

## Testing

`Dialog` and `Drawer` open with `HTMLDialogElement.showModal()` and close with `close()`. jsdom does not implement these, so in a jsdom test an open `Dialog` stays a closed `<dialog>`, and Testing Library cannot find it, or anything in it, by role.

Add this polyfill to your Vitest or Jest setup file. It only defines the methods jsdom is missing:

```ts
const DialogPrototype = HTMLDialogElement.prototype;

if (!DialogPrototype.showModal) {
  DialogPrototype.showModal = function showModal() {
    this.setAttribute('open', '');
  };
}

if (!DialogPrototype.show) {
  DialogPrototype.show = function show() {
    this.setAttribute('open', '');
  };
}

if (!DialogPrototype.close) {
  DialogPrototype.close = function close() {
    if (!this.hasAttribute('open')) {
      return;
    }

    this.removeAttribute('open');
    this.dispatchEvent(new Event('close'));
  };
}
```

With it, an open dialog can be found with `getByRole('dialog')`:

```tsx
render(
  <Dialog open onRequestClose={() => {}} aria-label="Settings">
    <button type="button">Save</button>
  </Dialog>,
);

screen.getByRole('dialog', { name: 'Settings' });
screen.getByRole('button', { name: 'Save' });
```

Under the polyfill the dialog is open but not modal: it is not in the top layer, and nothing outside it is made inert, so content behind it can still be queried and clicked. Test modal behaviour, focus trapping and clicks outside in a real browser, for example with Vitest Browser Mode or Playwright.
