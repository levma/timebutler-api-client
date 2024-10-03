import type { TimebutlerApiCaller } from "./api-caller.js";
/**
 * Downloads the personnel files for a given user in the raw CSV format.
 * @param caller The caller that is to be used to call the Timebutler API.
 * @param param The user to retrieve the personnel files for. Either an object with an `email` property, an object with an `employeeNumber` property, an object with a `userId` property, or nothing.
 * @returns A promise resolving to a string containing the response from the Timebutler API.
 */
export declare function rawPersonnelFiles(caller: TimebutlerApiCaller, param: {
    email: string;
} | {
    employeeNumber: string;
} | {
    userId: number;
} | undefined): Promise<string>;
/**
 * Downloads the personnel files for the given user from the Timebutler API and
 * parses the response into an array of PersonnelFile objects.
 * @param caller - A Timebutler API caller function.
 * @param param - The user to retrieve the personnel files for. Either an object
 * with an `email` property, an object with an `employeeNumber` property, an
 * object with a `userId` property, or nothing.
 * @param timeZone - The time zone to use for date parsing. Defaults to
 * "Europe/Berlin".
 * @returns A promise that resolves to an array of PersonnelFile objects.
 */
export declare function personnelFiles(caller: TimebutlerApiCaller, param: {
    email: string;
} | {
    employeeNumber: string;
} | {
    userId: number;
} | undefined, timeZone?: string): Promise<unknown>;
//# sourceMappingURL=personnel-files.d.ts.map