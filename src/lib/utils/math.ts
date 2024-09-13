export function roundToPrecision(value: number, precision: number): number {
  const factor = 10 ** precision;

  return Math.round(value * factor) / factor;
}

export function getBoundValue(newValue: number, min: number, max: number, step: number): number {
  // Round to the nearest step
  let value = Math.round(newValue / step) * step;
  // Clamp the value to the min and max
  value = Math.max(min, Math.min(max, value));

  // Round to the desired precision
  return value;
}
