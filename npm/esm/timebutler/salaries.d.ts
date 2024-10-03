import type { TimebutlerApiCaller } from "./api-caller.js";
/**
 * Retrieves the salaries for a given user.
 *
 * @param caller The Timebutler API caller to use.
 * @param param The user to retrieve the salaries for. Either an object with an `email` property, an object with an `employeeNumber` property, an object with a `userId` property, or nothing.
 * @returns A promise resolving to a string containing the response from the Timebutler API.
 */
export declare function rawSalaries(caller: TimebutlerApiCaller, param: {
    email: string;
} | {
    employeeNumber: string;
} | {
    userId: number;
} | undefined): Promise<string>;
/**
 * Retrieves the salaries for a given user.
 *
 * @param caller The Timebutler API caller to use.
 * @param param The user to retrieve the salaries for. Either an object with an `email` property, an object with an `employeeNumber` property, an object with a `userId` property, or nothing.
 * @param timeZone The time zone to interpret the dates in. Defaults to "Europe/Berlin".
 * @returns A promise resolving to an array of Salary objects.
 */
export declare function salaries(caller: TimebutlerApiCaller, param: {
    email: string;
} | {
    employeeNumber: string;
} | {
    userId: number;
} | undefined, timeZone?: string): Promise<unknown>;
//# sourceMappingURL=salaries.d.ts.map