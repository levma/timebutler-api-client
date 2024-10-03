import { createStartAndEndDatesFromApiData } from "../utils/create-start-and-end-dates-from-api-data.js";
import { parseCsv } from "../utils/parse-csv.js";
/**
 * Retrieves a list of worktimes for the given year and month.
 * @param caller The Timebutler API caller to use.
 * @param year The year to retrieve the worktimes for. If not set, the whole year is retrieved.
 * @param month The month to retrieve the worktimes for. If not set, the whole year is retrieved.
 * @returns A Promise of a string which contains the response from the Timebutler API.
 */
export function rawWorktimes(caller, year, month) {
    const params = year
        ? { year: year.toString() }
        : undefined;
    if (params !== undefined && typeof month === "number") {
        params.month = month.toString();
    }
    return caller("absences", params);
}
/**
 * Returns a list of worktimes for the given year and month.
 * @param caller The Timebutler API caller to use.
 * @param timeZone The time zone to use for date and time calculations.
 * @param year The year to retrieve the worktimes for.
 * @param month The month to retrieve the worktimes for. If not set, the whole year is retrieved.
 * @returns A Promise of an array of Worktime objects.
 */
export async function worktimes(caller, timeZone = "Europe/Berlin", year, month) {
    return parseCsv(await rawWorktimes(caller, year, month), (row) => {
        const workingTimeInSeconds = parseInt(row["Working time in seconds"], 10);
        const pauseInSeconds = parseInt(row["Pause in seconds"], 10);
        const { startTime, endTime } = createStartAndEndDatesFromApiData(row["Date (dd/mm/yyyy)"], row["Start time (hh:mm)"], row["End time (hh:mm)"], timeZone);
        const result = {
            id: parseInt(row["ID of the work time entry"], 10),
            userId: parseInt(row["User ID"], 10),
            employeeNumber: parseInt(row["Employee number"], 10),
            date: startTime.toISOString().split("T")[0],
            startTime,
            endTime,
            workingTimeInSeconds,
            pauseInSeconds,
            state: row["State"],
            projectId: parseInt(row["ID of the project"], 10),
            serviceId: parseInt(row["ID of the service"], 10),
            comments: row["Comments"],
            autoStoppend: row["Auto stopped"] === "true",
        };
        return result;
    });
}
