"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawPersonnelFiles = rawPersonnelFiles;
exports.personnelFiles = personnelFiles;
const parse_csv_js_1 = require("../utils/parse-csv.js");
const string_to_date_js_1 = require("../utils/string-to-date.js");
/**
 * Downloads the personnel files for a given user in the raw CSV format.
 * @param caller The caller that is to be used to call the Timebutler API.
 * @param param The user to retrieve the personnel files for. Either an object with an `email` property, an object with an `employeeNumber` property, an object with a `userId` property, or nothing.
 * @returns A promise resolving to a string containing the response from the Timebutler API.
 */
function rawPersonnelFiles(caller, param) {
    const params = param;
    return caller("personnelfiles", params);
}
/**
 * Downloads the personnel files for the given user from the Timebutler API and
 * parses the response into an array of PersonnelFile objects.
 * @param caller - A Timebutler API caller function.
 * @param param - The user to retrieve the personnel files for. Either an object
 * with an `email` property, an object with an `employeeNumber` property, an
 * object with a `userId` property, or nothing.
 * @param timeZone - The time zone to use for date parsing. Defaults to
 * "Europe/Berlin".
 * @returns A promise that resolves to an array of PersonnelFile objects.
 */
async function personnelFiles(caller, param, timeZone = "Europe/Berlin") {
    return (0, parse_csv_js_1.parseCsv)(await rawPersonnelFiles(caller, param), (row) => {
        const result = {
            userId: parseInt(row["User ID"], 10),
            employeeNumber: row["Employee number"],
        };
        Object.keys(row)
            .filter((k) => k.includes("|"))
            .forEach((key) => {
            const names = key.split("|");
            if (names.length !== 2)
                return;
            const group = names[0].trim();
            const field = names[1].trim();
            if (result[group] === undefined) {
                result[group] = {};
            }
            let value = row[key];
            if (/^\d+$/.test(value)) {
                value = parseInt(value, 10);
            }
            else if (/^\d+\.\d+$/.test(value) || /^\d+,\d+$/.test(value)) {
                value = parseFloat(value);
            }
            else if (value === "true") {
                value = true;
            }
            else if (value === "false") {
                value = false;
            }
            else if (/^\d\d\/\d\d\/\d\d.*/.test(value)) {
                const date = (0, string_to_date_js_1.stringToDate)(value, timeZone);
                if (date !== undefined) {
                    value = date;
                }
            }
            result[group][field] = value;
        });
        return result;
    });
}
