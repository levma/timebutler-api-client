import type { Worktime } from "../models/worktime.js";
import type { TimebutlerApiCaller } from "./api-caller.js";
/**
 * Retrieves a list of worktimes for the given year and month.
 * @param caller The Timebutler API caller to use.
 * @param year The year to retrieve the worktimes for. If not set, the whole year is retrieved.
 * @param month The month to retrieve the worktimes for. If not set, the whole year is retrieved.
 * @returns A Promise of a string which contains the response from the Timebutler API.
 */
export declare function rawWorktimes(caller: TimebutlerApiCaller, year?: number, month?: number): Promise<string>;
/**
 * Returns a list of worktimes for the given year and month.
 * @param caller The Timebutler API caller to use.
 * @param timeZone The time zone to use for date and time calculations.
 * @param year The year to retrieve the worktimes for.
 * @param month The month to retrieve the worktimes for. If not set, the whole year is retrieved.
 * @returns A Promise of an array of Worktime objects.
 */
export declare function worktimes(caller: TimebutlerApiCaller, timeZone?: string, year?: number, month?: number): Promise<Worktime[]>;
//# sourceMappingURL=worktimes.d.ts.map