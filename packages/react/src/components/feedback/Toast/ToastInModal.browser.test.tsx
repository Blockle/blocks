import { Activity, useEffect } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { render } from '../../../testUtils/browser/render.js';
import { Dialog } from '../../overlay/Dialog/Dialog.js';
import { Drawer } from '../../overlay/Drawer/Drawer.js';
import type { AlertProps } from '../Alert/Alert.js';
import { ToastProvider } from './ToastProvider.js';
import { useToast } from './useToast.js';

const ShowToast: React.FC<{ id?: string; intent?: AlertProps['intent'] }> = ({
  id = 'saved',
  intent,
}) => {
  const { showToast } = useToast();

  useEffect(() => {
    showToast({ id, children: `Toast ${id}`, intent });
  }, [showToast, id, intent]);

  return null;
};

/** Finds the toast showing `Toast ${id}`, once its view transition has added it. */
const findToast = (id = 'saved') =>
  vi.waitFor(() => {
    const toast = [
      ...document.querySelectorAll<HTMLElement>(
        '[role="status"], [role="alert"]',
      ),
    ].find((element) => element.textContent?.includes(`Toast ${id}`));

    if (!toast) {
      throw new Error(`No toast ${id} rendered yet`);
    }

    return toast;
  });

const findStack = async (id?: string) => {
  const stack = (await findToast(id)).parentElement;

  if (!stack) {
    throw new Error('Toast has no stack');
  }

  return stack;
};

const closeButtonOf = (toast: HTMLElement) => {
  const button = toast.querySelector('button');

  if (!button) {
    throw new Error('Toast has no close button');
  }

  return button;
};

const hitTarget = (element: Element) => {
  const box = element.getBoundingClientRect();

  return document.elementFromPoint(
    box.left + box.width / 2,
    box.top + box.height / 2,
  );
};

const modals = [
  ['Dialog', Dialog],
  ['Drawer', Drawer],
] as const;

for (const [name, Modal] of modals) {
  describe(`Toast under an open ${name} (browser)`, () => {
    it('makes the close button the hit target, and focusable', async () => {
      await render(
        <ToastProvider>
          <Modal open onRequestClose={vi.fn()} aria-label="Modal">
            <ShowToast />
          </Modal>
        </ToastProvider>,
      );

      const button = closeButtonOf(await findToast());

      await vi.waitFor(() => {
        expect(button.contains(hitTarget(button))).toBe(true);
      });

      button.focus();

      expect(document.activeElement).toBe(button);
    });

    it('keeps the stack a shown manual popover in the modal, and moves it back to the body when it closes', async () => {
      const ModalWithToast: React.FC<{ open: boolean }> = ({ open }) => (
        <ToastProvider>
          <ShowToast />
          <Modal open={open} onRequestClose={vi.fn()} aria-label="Modal">
            Content
          </Modal>
        </ToastProvider>
      );

      const screen = await render(<ModalWithToast open={false} />);
      const stack = await findStack();

      expect(stack.getAttribute('popover')).toBe('manual');
      expect(stack.parentElement).toBe(document.body);
      expect(stack.matches(':popover-open')).toBe(true);

      await screen.rerender(<ModalWithToast open />);

      const dialog = document.querySelector('dialog');

      expect(stack.parentElement).toBe(dialog);
      expect(stack.matches(':popover-open')).toBe(true);

      await screen.rerender(<ModalWithToast open={false} />);

      expect(stack.parentElement).toBe(document.body);
      expect(stack.matches(':popover-open')).toBe(true);
    });

    for (const moveBefore of [true, false]) {
      it(`does not replay the entry animation of a toast that only moves${moveBefore ? '' : ', without moveBefore'}`, async () => {
        const descriptor = Object.getOwnPropertyDescriptor(
          Element.prototype,
          'moveBefore',
        );

        if (!moveBefore && descriptor) {
          // @ts-expect-error browsers without moveBefore fall back to append
          delete Element.prototype.moveBefore;
        }

        try {
          const ModalWithToasts: React.FC<{ open: boolean }> = ({ open }) => (
            <ToastProvider>
              <ShowToast />
              <Modal open={open} onRequestClose={vi.fn()} aria-label="Modal">
                {open && <ShowToast id="new" />}
              </Modal>
            </ToastProvider>
          );

          const screen = await render(<ModalWithToasts open={false} />);
          const moved = await findToast();

          await Promise.all(
            moved.getAnimations().map(({ finished }) => finished),
          );

          await screen.rerender(<ModalWithToasts open />);

          const added = await findToast('new');

          expect(moved.parentElement?.parentElement?.tagName).toBe('DIALOG');
          expect(moved.getAnimations()).toHaveLength(0);
          // A new toast still enters with the theme's animation
          expect(added.getAnimations()).toHaveLength(1);
        } finally {
          if (descriptor) {
            Object.defineProperty(Element.prototype, 'moveBefore', descriptor);
          }
        }
      });
    }

    it('moves the stack out of the modal when it is hidden in an Activity', async () => {
      const HiddenModal: React.FC<{ mode: 'visible' | 'hidden' }> = ({
        mode,
      }) => (
        <ToastProvider>
          <ShowToast />
          <Activity mode={mode}>
            <Modal open onRequestClose={vi.fn()} aria-label="Modal">
              Content
            </Modal>
          </Activity>
        </ToastProvider>
      );

      const screen = await render(<HiddenModal mode="visible" />);
      const stack = await findStack();

      expect(stack.parentElement?.tagName).toBe('DIALOG');

      await screen.rerender(<HiddenModal mode="hidden" />);

      expect(stack.parentElement).toBe(document.body);

      await screen.rerender(<HiddenModal mode="visible" />);

      expect(stack.parentElement?.tagName).toBe('DIALOG');
    });

    it('moves the stack back to the body when the modal unmounts', async () => {
      const MountedModal: React.FC<{ mounted: boolean }> = ({ mounted }) => (
        <ToastProvider>
          <ShowToast />
          {mounted && (
            <Modal open onRequestClose={vi.fn()} aria-label="Modal">
              Content
            </Modal>
          )}
        </ToastProvider>
      );

      const screen = await render(<MountedModal mounted />);
      const stack = await findStack();

      expect(stack.parentElement?.tagName).toBe('DIALOG');

      await screen.rerender(<MountedModal mounted={false} />);

      expect(stack.parentElement).toBe(document.body);
      expect(stack.matches(':popover-open')).toBe(true);
    });
  });
}

describe('Toast under nested modals (browser)', () => {
  it('sits in the topmost modal, and moves to the one below when it closes', async () => {
    const Nested: React.FC<{ innerOpen: boolean }> = ({ innerOpen }) => (
      <ToastProvider>
        <ShowToast />
        <Drawer open onRequestClose={vi.fn()} aria-label="Outer">
          <Dialog open={innerOpen} onRequestClose={vi.fn()} aria-label="Inner">
            Inner content
          </Dialog>
        </Drawer>
      </ToastProvider>
    );

    // Opened after the outer one, as the browser's top layer orders them
    const screen = await render(<Nested innerOpen={false} />);
    const stack = await findStack();
    const button = closeButtonOf(await findToast());

    await screen.rerender(<Nested innerOpen />);

    expect(stack.parentElement?.getAttribute('aria-label')).toBe('Inner');
    await vi.waitFor(() => {
      expect(button.contains(hitTarget(button))).toBe(true);
    });

    await screen.rerender(<Nested innerOpen={false} />);

    expect(stack.parentElement?.getAttribute('aria-label')).toBe('Outer');
    await vi.waitFor(() => {
      expect(button.contains(hitTarget(button))).toBe(true);
    });
  });
});

describe('Toast roles (browser)', () => {
  const roles = [
    ['info', 'status'],
    ['success', 'status'],
    ['warning', 'status'],
    ['danger', 'alert'],
  ] as const;

  for (const [intent, role] of roles) {
    it(`gives a toast with the ${intent} intent the ${role} role`, async () => {
      await render(
        <ToastProvider>
          <ShowToast intent={intent} />
        </ToastProvider>,
      );

      expect((await findToast()).getAttribute('role')).toBe(role);
    });
  }
});

describe('Toast live region (browser)', () => {
  it('stays rendered with no toasts, without taking clicks', async () => {
    const screen = await render(
      <ToastProvider>
        <button type="button" style={{ position: 'fixed', inset: 0 }}>
          Behind
        </button>
      </ToastProvider>,
    );

    const region = document.querySelector<HTMLElement>('[aria-live]');

    expect(region?.getAttribute('aria-live')).toBe('polite');
    expect(region?.matches(':popover-open')).toBe(true);
    expect(region?.children).toHaveLength(0);

    // The bottom edge, where the empty stack sits
    expect(
      document.elementFromPoint(window.innerWidth / 2, window.innerHeight - 1),
    ).toBe(screen.getByRole('button', { name: 'Behind' }).element());
  });
});

describe('Toast placement under an open modal (browser)', () => {
  it('lays the stack out against the viewport', async () => {
    await render(
      <ToastProvider placement="top-end">
        <Dialog open onRequestClose={vi.fn()} aria-label="Modal">
          <ShowToast />
        </Dialog>
      </ToastProvider>,
    );

    const box = (await findStack()).getBoundingClientRect();

    expect(box.top).toBeCloseTo(0, 0);
    expect(box.right).toBeCloseTo(window.innerWidth, 0);
  });
});
