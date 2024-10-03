export declare const ENDPOINTS: readonly ["absences", "users", "holidayentitlement", "workdays", "holidaysets", "worktime", "projects", "projectsimport", "services", "timeclock", "timeimportbyevents"];
export type Endpoint = (typeof ENDPOINTS)[number];
export declare const EXTENDED_ENDPOINTS: readonly ["personnelfiles", "salaries"];
export type ExtendedEnpoint = (typeof EXTENDED_ENDPOINTS)[number];
export type TimebutlerApiParams = Record<string, string | number | boolean>;
/**
 * Creates a Timebutler API caller function.
 *
 * @param {NonNullable<string>} apiKey - The API key used for authentication.
 * @param {string | null} [extendedApiKey=null] - The extended API key used for authentication.
 * @return {Function} A bound Timebutler API caller function.
 */
export declare const createTimebutlerApiCaller: (apiKey: NonNullable<string>, extendedApiKey?: string | null) => (endpoint: "absences" | "users" | "holidayentitlement" | "workdays" | "holidaysets" | "worktime" | "projects" | "projectsimport" | "services" | "timeclock" | "timeimportbyevents" | "personnelfiles" | "salaries", params?: TimebutlerApiParams | undefined, files?: Record<string, File> | undefined) => Promise<string>;
export type TimebutlerApiCaller = ReturnType<typeof createTimebutlerApiCaller>;
//# sourceMappingURL=api-caller.d.ts.map