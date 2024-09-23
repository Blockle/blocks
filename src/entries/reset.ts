// Ensure reset and atoms are the lowest specificity
import { atoms } from '../lib/css/atoms/sprinkles.css';
export { __KEEP_ME__ } from '../lib/css/reset/reset.css';

// "Hack" to ensure atoms are not tree-shaken
atoms({});
