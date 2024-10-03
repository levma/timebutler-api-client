import { parseCsv } from "../utils/parse-csv.js";
import { stringToDate } from "../utils/string-to-date.js";
/**
 * Retrieves all projects in the raw CSV format as a string.
 *
 * @param caller The caller that is to be used to call the Timebutler API.
 * @returns A promise resolving to a string containing the projects in the Timebutler export format.
 */
export function rawProjects(caller) {
    return caller("projects");
}
/**
 * Retrieves all projects.
 *
 * @param caller The caller that is to be used to call the Timebutler API.
 * @param timeZone The time zone to interpret the dates in. Defaults to "Europe/Berlin".
 * @returns A promise resolving to an array of projects.
 */
export async function projects(caller, timeZone = "Europe/Berlin") {
    return parseCsv(await rawProjects(caller), (row) => {
        const result = {
            id: parseInt(row["ID of the project"], 10),
            name: row.Name,
            state: row.State,
            budgetInHours: parseInt(row["Budget in hours"], 10),
            comments: row.Comments,
            creationDate: stringToDate(row["Creation date"], timeZone),
        };
        return result;
    });
}
