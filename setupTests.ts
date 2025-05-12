import '@testing-library/jest-dom';
import { vi } from 'vitest';

const HTMLPrototype = HTMLElement.prototype;

if (!('showPopover' in HTMLPrototype)) {
  HTMLElement.prototype.showPopover = vi.fn();
}

if (!('hidePopover' in HTMLPrototype)) {
  HTMLElement.prototype.hidePopover = vi.fn();
}
