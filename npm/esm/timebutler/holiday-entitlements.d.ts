import type { HolidayEntitlement } from "../models/holiday-entitlement.js";
import type { TimebutlerApiCaller } from "./api-caller.js";
/**
 * Calls the Timebutler API to retrieve the holiday entitlements for all users.
 * @param caller The Timebutler API caller to use.
 * @param year The year to retrieve the holiday entitlements for. If not set, the current year is retrieved.
 * @returns A promise resolving to a string containing the response from the Timebutler API.
 */
export declare function rawHolidayEntitlements(caller: TimebutlerApiCaller, year?: number): Promise<string>;
/**
 * Retrieves the holiday entitlements for all users.
 * @param caller The caller that is to be used to call the Timebutler API.
 * @param year The year to retrieve the holiday entitlements for. If not set, the current year is assumed.
 * @returns A promise resolving to an array of HolidayEntitlement objects.
 */
export declare function holidayEntitlements(caller: TimebutlerApiCaller, year?: number): Promise<HolidayEntitlement[]>;
//# sourceMappingURL=holiday-entitlements.d.ts.map