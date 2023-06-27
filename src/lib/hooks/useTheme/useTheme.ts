/**
 * useTheme hook
 */
export const useTheme = () => {
  if (typeof window === 'undefined') {
    return 'global theme, set by setGlobalTheme()';
  }

  return '';

  // if (process.env.NODE_ENV === 'development') {
  //   return {
  //     button: {
  //       borderRadius: '9999px',
  //     },
  //   };
  // }
};
