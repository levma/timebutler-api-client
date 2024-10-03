import type { Absence } from "../models/absence.js";
import type { TimebutlerApiCaller } from "./api-caller.js";
/**
 * Downloads the list of absences from the Timebutler API.
 * @param caller - A Timebutler API caller function.
 * @param year - The year to retrieve the absences for. If not set, the current year is retrieved.
 * @returns A promise that resolves to a string containing the CSV data.
 */
export declare function rawAbsences(caller: TimebutlerApiCaller, year?: number): Promise<string>;
/**
 * Retrieves the list of absences for a given year.
 * @param caller The Timebutler API caller to use.
 * @param timeZone The time zone to interpret the dates in. Defaults to "Europe/Berlin".
 * @param year The year to retrieve the absences for. If not set, the current year is retrieved.
 * @returns A promise that resolves to an array of Absence objects.
 */
export declare function absences(caller: TimebutlerApiCaller, timeZone?: string, year?: number): Promise<Absence[]>;
//# sourceMappingURL=absences.d.ts.map