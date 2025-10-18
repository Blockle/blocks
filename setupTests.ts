import '@testing-library/jest-dom';
import { vi } from 'vitest';

const HTMLPrototype = HTMLElement.prototype;

if (!('showPopover' in HTMLPrototype)) {
  HTMLElement.prototype.showPopover = vi.fn();
}

if (!('hidePopover' in HTMLPrototype)) {
  HTMLElement.prototype.hidePopover = vi.fn();
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
