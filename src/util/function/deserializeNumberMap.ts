export function deserializeNumberMap(jsonString: string): Map<number, number> {
  try {
    // Parse the JSON string into an array.
    const array = JSON.parse(jsonString);

    // Check if the parsed result is an array.
    if (!Array.isArray(array)) {
      throw new TypeError("Invalid JSON format: Expected an array.");
    }


    // Create a new Map from the array.
    return new Map(array);

  } catch (error) {
    // Handle JSON parsing errors or invalid format.
    console.error("Error deserializing Map:", error);
    throw error; // Or throw the error, depending on your needs.
  }
}
