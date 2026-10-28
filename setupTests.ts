import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Keep in sync with the Testing section in packages/react/README.md
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

// Keep in sync with the Testing section in packages/react/README.md
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

const originalConsoleDotError = console.error;
const originalConsoleDotWarn = console.warn;

/**
 * Provides a way to hide specific console errors during tests.
 * Useful for suppressing known, non-critical warnings that clutter test output.
 */
export function hideErrorsInTest(strings: (string | RegExp)[]): void {
  function matches(match: string | RegExp, message: string): boolean {
    if (typeof match === 'string') {
      return message.includes(match);
    }

    return match.test(message);
  }

  vi.spyOn(console, 'error').mockImplementation((...args) => {
    const message = args[0] as string;

    const result = strings.some((match) => matches(match, message));

    if (result) {
      return;
    }

    originalConsoleDotError(...args);
  });

  vi.spyOn(console, 'warn').mockImplementation((...args) => {
    const message = args[0] as string;

    const result = strings.some((match) => matches(match, message));

    if (result) {
      return;
    }

    originalConsoleDotWarn(...args);
  });
}

hideErrorsInTest([
  // Without theming we just return empty class name, so ignore these warnings in test environment
  /^Component .+ is not defined in the theme$/,
  /^atoms: Property ".+" is not defined in atomicProperties.$/,
  /^atoms: Condition for ".+" with value ".+" not found.$/,
]);
