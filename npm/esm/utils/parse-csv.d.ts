/**
 * Parse a CSV string into an array of objects
 * @param csvString The string to parse
 * @param convertFn A function to convert each row of the CSV string into the output type
 * @returns A promise that resolves with an array of parsed objects
 */
export declare function parseCsv<T, R = T>(csvString: string, convertFn?: (i: T) => R): Promise<R[]>;
//# sourceMappingURL=parse-csv.d.ts.map