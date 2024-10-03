"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawProjects = rawProjects;
exports.projects = projects;
const parse_csv_js_1 = require("../utils/parse-csv.js");
const string_to_date_js_1 = require("../utils/string-to-date.js");
/**
 * Retrieves all projects in the raw CSV format as a string.
 *
 * @param caller The caller that is to be used to call the Timebutler API.
 * @returns A promise resolving to a string containing the projects in the Timebutler export format.
 */
function rawProjects(caller) {
    return caller("projects");
}
/**
 * Retrieves all projects.
 *
 * @param caller The caller that is to be used to call the Timebutler API.
 * @param timeZone The time zone to interpret the dates in. Defaults to "Europe/Berlin".
 * @returns A promise resolving to an array of projects.
 */
async function projects(caller, timeZone = "Europe/Berlin") {
    return (0, parse_csv_js_1.parseCsv)(await rawProjects(caller), (row) => {
        const result = {
            id: parseInt(row["ID of the project"], 10),
            name: row.Name,
            state: row.State,
            budgetInHours: parseInt(row["Budget in hours"], 10),
            comments: row.Comments,
            creationDate: (0, string_to_date_js_1.stringToDate)(row["Creation date"], timeZone),
        };
        return result;
    });
}
