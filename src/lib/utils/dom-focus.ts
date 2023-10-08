const focusableSelectors =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), ' +
  'textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const getFirstFocusableElement = (container: HTMLElement): HTMLElement | null => {
  const focusable = container.querySelector<HTMLElement>(focusableSelectors);

  return focusable || null;
};

export const focusFirstElement = (container: HTMLElement): void => {
  const focusable = getFirstFocusableElement(container);

  if (focusable) {
    focusable.focus();
  }
};
