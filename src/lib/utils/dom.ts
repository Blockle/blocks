/**
 * Check if the element has animation duration.
 */
export function hasAnimationDuration(element: HTMLElement | null): boolean {
  if (!element) {
    return false;
  }

  const style = window.getComputedStyle(element);
  return style.transitionDuration !== '0s' || style.animationDuration !== '0s';
}
