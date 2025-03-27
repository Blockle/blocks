type Args = null | undefined | boolean | string | unknown;

// Return undefined for empty result so react doesn't add "class" attribute
export const classnames = (...args: Args[]): string | undefined => {
  const className = args
    .filter((arg) => arg && typeof arg === 'string')
    .join(' ');

  return className || undefined;
};
