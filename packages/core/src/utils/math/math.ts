export function clampAndRoundValue(
  newValue: number,
  min: number,
  max: number,
  step: number,
): number {
  // Round to the nearest step
  const value = Math.round(newValue / step) * step;

  // Clamp value to the min and max
  return Math.max(min, Math.min(max, value));
}
