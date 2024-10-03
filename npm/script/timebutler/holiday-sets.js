"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawHolidaySets = rawHolidaySets;
exports.holidaySets = holidaySets;
const parse_csv_js_1 = require("../utils/parse-csv.js");
/**
 * Downloads the list of holiday sets from the Timebutler API.
 * @param caller - A Timebutler API caller function.
 * @returns A promise that resolves to a string containing the CSV data.
 */
function rawHolidaySets(caller) {
    return caller("holidaysets");
}
/**
 * Get all holiday sets.
 *
 * @param caller The caller that is to be used to call the Timebutler API.
 * @returns A promise resolving to an array of holiday sets.
 */
async function holidaySets(caller) {
    return (0, parse_csv_js_1.parseCsv)(await rawHolidaySets(caller), (row) => {
        const result = {
            id: parseInt(row["ID of the holiday set"], 10),
            name: row["Name of the holiday set"],
        };
        return result;
    });
}
