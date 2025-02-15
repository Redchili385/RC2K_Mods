export function int32ToBytes(value: number): number[] {
  let int_value = Math.round(value);
  int_value = Math.max(-(2 ** 31), Math.min(2 ** 31 - 1, int_value)); // Correct clipping

  const bytes = [];
  for (let i = 0; i < 4; i++) {
    bytes.push(int_value & 0xff);
    int_value = int_value >> 8;  // Correctly handles negative numbers
  }
  return bytes;
}
