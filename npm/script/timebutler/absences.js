"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawAbsences = rawAbsences;
exports.absences = absences;
const parse_csv_js_1 = require("../utils/parse-csv.js");
const string_to_date_js_1 = require("../utils/string-to-date.js");
/**
 * Downloads the list of absences from the Timebutler API.
 * @param caller - A Timebutler API caller function.
 * @param year - The year to retrieve the absences for. If not set, the current year is retrieved.
 * @returns A promise that resolves to a string containing the CSV data.
 */
function rawAbsences(caller, year) {
    const params = year ? { year: year.toString() } : undefined;
    return caller("absences", params);
}
/**
 * Retrieves the list of absences for a given year.
 * @param caller The Timebutler API caller to use.
 * @param timeZone The time zone to interpret the dates in. Defaults to "Europe/Berlin".
 * @param year The year to retrieve the absences for. If not set, the current year is retrieved.
 * @returns A promise that resolves to an array of Absence objects.
 */
async function absences(caller, timeZone = "Europe/Berlin", year) {
    return (0, parse_csv_js_1.parseCsv)(await rawAbsences(caller, year), (row) => {
        const result = {
            id: parseInt(row.ID, 10),
            from: (0, string_to_date_js_1.stringToDate)(row.From, timeZone),
            to: (0, string_to_date_js_1.stringToDate)(row.To, timeZone),
            halfADay: row["Half a day"] === "true",
            morning: row.Morning === "true",
            userId: parseInt(row["User ID"], 10),
            employeeNumber: parseInt(row["Employee number"], 10),
            type: row.Type,
            extraVacationDay: row["Extra vacation day"] === "true",
            state: row.State,
            substituteState: row["Substitute state"],
            workdays: parseFloat(row.Workdays),
            hours: parseFloat(row.Hours),
            medicalCertificate: row["Medical certificate (sick leave only)"] === "true",
            comments: `${row.Comments}`.trim(),
            substituteUserId: parseInt(row["User ID of the substitute"], 10),
        };
        Object.keys(row)
            .filter((key) => !Object.keys(result).includes(key))
            .forEach((key) => {
            const newKey = key.toLowerCase().replace(/[^\d\w]/g, "_");
            result[newKey] = `${row[key]}`;
        });
        return result;
    });
}
