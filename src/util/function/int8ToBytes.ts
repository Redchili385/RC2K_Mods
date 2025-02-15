export function int8ToBytes(value: number): number[] {
  const int_value = Math.round(value);
  if (int_value < -128)
    return [255];
  if (int_value > 127)
    return [127];
  if (int_value < 0) {
    return [int_value + 256];
  }
  return [int_value];
}
