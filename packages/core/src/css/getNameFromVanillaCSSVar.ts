/**
 * Vanilla Extract CSS variables are transformed to a format like `var(--variableName)`.
 * This function extracts the `variableName` part from the string.
 */
export function getNameFromVanillaCSSVar(varName: string) {
  return varName.substring(4, varName.length - 1);
}
