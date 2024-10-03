import type { User } from "../models/user.js";
import type { TimebutlerApiCaller } from "./api-caller.js";
/**
 * Downloads the list of users from the Timebutler API.
 * @param caller - A Timebutler API caller function.
 * @returns A promise that resolves to a string containing the CSV data.
 */
export declare function rawUsers(caller: TimebutlerApiCaller): Promise<string>;
/**
 * Downloads the list of users from the Timebutler API and parses the
 * response into an array of User objects.
 * @param caller - A Timebutler API caller function.
 * @param timeZone - The time zone to use for date parsing.
 * @returns A promise that resolves to an array of User objects.
 */
export declare function users(caller: TimebutlerApiCaller, timeZone?: string): Promise<User[]>;
//# sourceMappingURL=users.d.ts.map