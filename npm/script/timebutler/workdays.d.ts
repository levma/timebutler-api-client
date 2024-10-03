import type { Workdays } from "../models/workdays.js";
import type { TimebutlerApiCaller } from "./api-caller.js";
/**
 * Retrieves all workdays in the raw CSV format as a string.
 *
 * @param caller The caller that is to be used to call the Timebutler API.
 * @returns A promise resolving to a string containing the workdays in the Timebutler export format.
 */
export declare function rawWorkdays(caller: TimebutlerApiCaller): Promise<string>;
/**
 * Retrieves all workdays for all users.
 *
 * @param caller The caller that is to be used to call the Timebutler API.
 * @param timeZone The time zone to interpret the dates in. Defaults to "Europe/Berlin".
 * @returns A promise resolving to an array of workdays.
 */
export declare function workdays(caller: TimebutlerApiCaller, timeZone?: string): Promise<Workdays[]>;
//# sourceMappingURL=workdays.d.ts.map