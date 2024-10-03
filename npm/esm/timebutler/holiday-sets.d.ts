import type { HolidaySet } from "../models/holiday-set.js";
import type { TimebutlerApiCaller } from "./api-caller.js";
/**
 * Downloads the list of holiday sets from the Timebutler API.
 * @param caller - A Timebutler API caller function.
 * @returns A promise that resolves to a string containing the CSV data.
 */
export declare function rawHolidaySets(caller: TimebutlerApiCaller): Promise<string>;
/**
 * Get all holiday sets.
 *
 * @param caller The caller that is to be used to call the Timebutler API.
 * @returns A promise resolving to an array of holiday sets.
 */
export declare function holidaySets(caller: TimebutlerApiCaller): Promise<HolidaySet[]>;
//# sourceMappingURL=holiday-sets.d.ts.map