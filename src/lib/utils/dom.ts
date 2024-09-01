/**
 * Check if the element has animation duration.
 */
export function hasAnimationDuration(element: HTMLElement | null): boolean {
  if (!element) {
    return false;
  }

  const style = window.getComputedStyle(element);

  return hasDuration(style.transitionDuration) || hasDuration(style.animationDuration);
}

function hasDuration(duration: string): boolean {
  return duration
    .split(',')
    .map((part) => Number.parseFloat(part.trim()))
    .some((part) => part > 0);
}
