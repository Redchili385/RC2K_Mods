export function uint8ToBytes(value: number): number[] {
  const int_value = Math.round(value);
  if (int_value < 0)
    return [0];
  if (int_value > 255)
    return [255];
  return [int_value];
}
