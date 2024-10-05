import { parse } from "@std/csv";

/**
 * Parse a CSV string into an array of objects
 * @param csvString The string to parse
 * @param convertFn A function to convert each row of the CSV string into the output type
 * @returns A promise that resolves with an array of parsed objects
 */
export function parseCsv<
  T,
  R = T,
>(csvString: string, convertFn?: (i: T) => R) {
  return new Promise<Array<R>>((resolve, reject) => {
    const convert: (i: T) => R = typeof convertFn === "function"
      ? convertFn
      : (i: T) => i as unknown as R;
    try {
      const result = parse(csvString, {
        separator: ";",
        trimLeadingSpace: true,
        skipFirstRow: true,
      }).map((row) => {
        for (const key in row) {
          if (!row[key]) {
            (row as unknown as Record<string, unknown>)[key] = undefined;
          }
        }
        return convert(row as T);
      });
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
}
