import ppp from "papaparse";

/**
 * Parse a CSV string into an array of objects
 * @param csvString The string to parse
 * @param convertFn A function to convert each row of the CSV string into the output type
 * @returns A promise that resolves with an array of parsed objects
 */
export function parseCsv<T, R = T>(csvString: string, convertFn?: (i: T) => R) {
  return new Promise<Array<R>>((resolve, reject) => {
    const rows: Array<R> = [];
    const convert: (i: T) => R = typeof convertFn === "function"
      ? convertFn
      : (i: T) => i as unknown as R;
    ppp.parse(csvString, {
      delimiter: ";",
      header: true,
      skipEmptyLines: true,
      // transform: (value: string) => (value === " " ? undefined : value),
      step: (stepResult: { data: T }) => {
        rows.push(convert(stepResult.data as T));
      },
      error: (error: Error) => {
        reject(error);
      },
      complete: () => {
        resolve(rows);
      },
    });
  });
}
