import * as styles from './textOverflow.css.js';

export type TextOverflowProps = {
  /** Clamps the text to this many lines and ends it in an ellipsis. */
  lineClamp?: 1 | 2 | 3 | 4 | 5;
  /** Keeps the text on one line and ends the overflow in an ellipsis. */
  truncate?: boolean;
};

export const textOverflowClassName = (
  component: string,
  { lineClamp, truncate }: TextOverflowProps,
) => {
  if (lineClamp !== undefined) {
    if (import.meta.env.DEV && truncate) {
      console.warn(
        `${component}: \`lineClamp\` and \`truncate\` are both set; \`lineClamp\` applies.`,
      );
    }

    return styles.lineClamp[lineClamp];
  }

  return truncate ? styles.truncate : undefined;
};
