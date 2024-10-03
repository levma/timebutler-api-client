import type { CsvProject, Project } from "../models/project.ts";
import { parseCsv } from "../utils/parse-csv.ts";
import { stringToDate } from "../utils/string-to-date.ts";
import type { TimebutlerApiCaller } from "./api-caller.ts";

/**
 * Retrieves all projects in the raw CSV format as a string.
 *
 * @param caller The caller that is to be used to call the Timebutler API.
 * @returns A promise resolving to a string containing the projects in the Timebutler export format.
 */
export function rawProjects(caller: TimebutlerApiCaller): Promise<string> {
  return caller("projects");
}

/**
 * Retrieves all projects.
 *
 * @param caller The caller that is to be used to call the Timebutler API.
 * @param timeZone The time zone to interpret the dates in. Defaults to "Europe/Berlin".
 * @returns A promise resolving to an array of projects.
 */
export async function projects(
  caller: TimebutlerApiCaller,
  timeZone: string = "Europe/Berlin",
): Promise<Project[]> {
  return parseCsv<CsvProject, Project>(await rawProjects(caller), (row) => {
    const result: Project = {
      id: parseInt(row["ID of the project"], 10),
      name: row.Name,
      state: row.State,
      budgetInHours: parseInt(row["Budget in hours"], 10),
      comments: row.Comments,
      creationDate: stringToDate(row["Creation date"], timeZone)!,
    };
    return result;
  });
}
