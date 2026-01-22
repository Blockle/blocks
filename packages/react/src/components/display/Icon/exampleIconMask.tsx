import { createIconMask } from './createIconMask.js';
import type { HeroIconName } from './heroicons.js';

function getIconUrl(name: HeroIconName): string {
  return `/heroicons/outline/${name}.svg`;
}

// Create a HeroIcon component with the `getIconUrl` URL resolver
/**
 * EXPORTED ONLY FOR DEMO PURPOSES
 */
export const HeroIcon = createIconMask(getIconUrl);
