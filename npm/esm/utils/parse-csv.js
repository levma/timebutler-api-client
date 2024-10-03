import ppp from "papaparse";
/**
 * Parse a CSV string into an array of objects
 * @param csvString The string to parse
 * @param convertFn A function to convert each row of the CSV string into the output type
 * @returns A promise that resolves with an array of parsed objects
 */
export function parseCsv(csvString, convertFn) {
    return new Promise((resolve, reject) => {
        const rows = [];
        const convert = typeof convertFn === "function"
            ? convertFn
            : (i) => i;
        ppp.parse(csvString, {
            delimiter: ";",
            header: true,
            skipEmptyLines: true,
            // transform: (value: string) => (value === " " ? undefined : value),
            step: (stepResult) => {
                rows.push(convert(stepResult.data));
            },
            error: (error) => {
                reject(error);
            },
            complete: () => {
                resolve(rows);
            },
        });
    });
}
