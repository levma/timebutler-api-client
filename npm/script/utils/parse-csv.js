"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCsv = parseCsv;
const papaparse_1 = __importDefault(require("papaparse"));
/**
 * Parse a CSV string into an array of objects
 * @param csvString The string to parse
 * @param convertFn A function to convert each row of the CSV string into the output type
 * @returns A promise that resolves with an array of parsed objects
 */
function parseCsv(csvString, convertFn) {
    return new Promise((resolve, reject) => {
        const rows = [];
        const convert = typeof convertFn === "function"
            ? convertFn
            : (i) => i;
        papaparse_1.default.parse(csvString, {
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
