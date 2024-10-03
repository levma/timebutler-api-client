"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawWorkdays = rawWorkdays;
exports.workdays = workdays;
const parse_csv_js_1 = require("../utils/parse-csv.js");
const string_to_date_js_1 = require("../utils/string-to-date.js");
/**
 * Retrieves all workdays in the raw CSV format as a string.
 *
 * @param caller The caller that is to be used to call the Timebutler API.
 * @returns A promise resolving to a string containing the workdays in the Timebutler export format.
 */
function rawWorkdays(caller) {
    return caller("workdays");
}
/**
 * Retrieves all workdays for all users.
 *
 * @param caller The caller that is to be used to call the Timebutler API.
 * @param timeZone The time zone to interpret the dates in. Defaults to "Europe/Berlin".
 * @returns A promise resolving to an array of workdays.
 */
async function workdays(caller, timeZone = "Europe/Berlin") {
    return (0, parse_csv_js_1.parseCsv)(await rawWorkdays(caller), (row) => {
        const result = {
            userId: parseInt(row["User ID"], 10),
            validFrom: (0, string_to_date_js_1.stringToDate)(row["Valid from (dd/mm/yyyy)"], timeZone),
            minutesOnMonday: parseInt(row["Monday working time in minutes"], 10),
            minutesOnTuesday: parseInt(row["Thursday working time in minutes"], 10),
            minutesOnWednesday: parseInt(row["Wednesday working time in minutes"], 10),
            minutesOnThursday: parseInt(row["Thursday working time in minutes"], 10),
            minutesOnFriday: parseInt(row["Friday working time in minutes"], 10),
            minutesOnSaturday: parseInt(row["Saturday working time in minutes"], 10),
            minutesOnSunday: parseInt(row["Sunday working time in minutes"], 10),
            holidaySetId: parseInt(row["ID of the holiday set"], 10),
        };
        return result;
    });
}
