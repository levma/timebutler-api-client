import type { Project } from "../models/project.js";
import type { TimebutlerApiCaller } from "./api-caller.js";
/**
 * Retrieves all projects in the raw CSV format as a string.
 *
 * @param caller The caller that is to be used to call the Timebutler API.
 * @returns A promise resolving to a string containing the projects in the Timebutler export format.
 */
export declare function rawProjects(caller: TimebutlerApiCaller): Promise<string>;
/**
 * Retrieves all projects.
 *
 * @param caller The caller that is to be used to call the Timebutler API.
 * @param timeZone The time zone to interpret the dates in. Defaults to "Europe/Berlin".
 * @returns A promise resolving to an array of projects.
 */
export declare function projects(caller: TimebutlerApiCaller, timeZone?: string): Promise<Project[]>;
//# sourceMappingURL=projects.d.ts.map