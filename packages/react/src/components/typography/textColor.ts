import type { Atoms, ComponentThemes } from '@blockle/blocks-core';

export type TextColorRole = ComponentThemes['text']['variants']['color'];

/**
 * The `color` prop of Text and Heading: a Color role (`muted`), styled by the
 * component theme and following the Color mode, or a Palette atom for Box.
 *
 * The prop goes to both the theme and Box, and each ignores values it doesn't
 * know. Any color also suppresses the theme's default variant, so a Palette
 * color is not overridden by `text.default`.
 */
export type TextColor = TextColorRole | Atoms['color'];
