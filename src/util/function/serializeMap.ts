export function serializeMap(map: Map<unknown, unknown>): string {
  if (!(map instanceof Map)) {
    throw new TypeError("Input must be a Map.");
  }

  // Convert the Map to an array of [key, value] pairs.
  const array = Array.from(map.entries());

  // Convert the array to a JSON string.
  return JSON.stringify(array);
}
