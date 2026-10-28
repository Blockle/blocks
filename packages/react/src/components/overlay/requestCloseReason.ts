/**
 * Why an overlay asks to close: an Escape (or another close request, such as
 * the Android back gesture), or a click outside of it.
 */
export type RequestCloseReason = 'escape' | 'outside-click';
