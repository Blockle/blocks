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

### Popover

`Popover` opens with `showPopover()` and closes with `hidePopover()`. jsdom does not implement the Popover API, and its default stylesheet hides every `[popover]` element that is not open, so Testing Library treats an open popover's content as hidden and `getByRole` finds nothing in it.

Add this polyfill to your test setup. It only defines the methods jsdom is missing, and marks an open popover with a `data-popover-open` attribute that a test stylesheet shows:

```ts
const PopoverPrototype = HTMLElement.prototype;

if (!PopoverPrototype.showPopover) {
  PopoverPrototype.showPopover = function showPopover() {
    this.setAttribute('data-popover-open', '');
  };
}

if (!PopoverPrototype.hidePopover) {
  PopoverPrototype.hidePopover = function hidePopover() {
    this.removeAttribute('data-popover-open');
  };
}

if (!PopoverPrototype.togglePopover) {
  PopoverPrototype.togglePopover = function togglePopover(force?: boolean) {
    return this.toggleAttribute('data-popover-open', force);
  };
}

const popoverStyle = document.createElement('style');
popoverStyle.textContent = '[popover][data-popover-open] { display: block; }';
document.head.append(popoverStyle);
```

With it, an open popover's content can be found by role:

```tsx
render(
  <Popover open anchorElement={anchorRef} onRequestClose={() => {}}>
    <button type="button">Inside</button>
  </Popover>,
);

screen.getByRole('button', { name: 'Inside' });
```

Other libraries may check for `showPopover` and behave differently once it exists; dnd-kit, for example, drags differently. If a global polyfill breaks such tests, apply it only inside the `describe` that opens a popover, and remove what it added afterwards:

```ts
import { afterAll, beforeAll, describe } from 'vitest';

describe('with a popover open', () => {
  const polyfills: Record<string, (this: HTMLElement, force?: boolean) => unknown> = {
    showPopover() {
      this.setAttribute('data-popover-open', '');
    },
    hidePopover() {
      this.removeAttribute('data-popover-open');
    },
    togglePopover(force?: boolean) {
      return this.toggleAttribute('data-popover-open', force);
    },
  };
  const added: string[] = [];
  const popoverStyle = document.createElement('style');

  beforeAll(() => {
    for (const [method, polyfill] of Object.entries(polyfills)) {
      if (!(method in HTMLElement.prototype)) {
        Reflect.set(HTMLElement.prototype, method, polyfill);
        added.push(method);
      }
    }

    popoverStyle.textContent = '[popover][data-popover-open] { display: block; }';
    document.head.append(popoverStyle);
  });

  afterAll(() => {
    for (const method of added) {
      Reflect.deleteProperty(HTMLElement.prototype, method);
    }

    popoverStyle.remove();
  });

  // Tests that open a popover
});
```

Where the Popover API is missing and no polyfill is applied, `Popover` warns when it opens or closes instead of throwing. Its content then stays hidden under jsdom's default styles. Test positioning, the top layer and clicks outside in a real browser.
