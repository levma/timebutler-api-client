import type { Absence, CsvAbsence } from "../models/absence.ts";
import { parseCsv } from "../utils/parse-csv.ts";
import { stringToDate } from "../utils/string-to-date.ts";
import type { TimebutlerApiCaller } from "./api-caller.ts";

/**
 * Downloads the list of absences from the Timebutler API.
 * @param caller - A Timebutler API caller function.
 * @param year - The year to retrieve the absences for. If not set, the current year is retrieved.
 * @returns A promise that resolves to a string containing the CSV data.
 */
export function rawAbsences(
  caller: TimebutlerApiCaller,
  year?: number,
): Promise<string> {
  const params = year ? { year: year.toString() } : undefined;
  return caller("absences", params);
}

/**
 * Retrieves the list of absences for a given year.
 * @param caller The Timebutler API caller to use.
 * @param timeZone The time zone to interpret the dates in. Defaults to "Europe/Berlin".
 * @param year The year to retrieve the absences for. If not set, the current year is retrieved.
 * @returns A promise that resolves to an array of Absence objects.
 */
export async function absences(
  caller: TimebutlerApiCaller,
  timeZone: string = "Europe/Berlin",
  year?: number,
): Promise<Absence[]> {
  return parseCsv<CsvAbsence, Absence>(
    await rawAbsences(caller, year),
    (row) => {
      const result: Absence = {
        id: parseInt(row.ID, 10),
        from: stringToDate(row.From, timeZone)!,
        to: stringToDate(row.To, timeZone)!,
        halfADay: row["Half a day"] === "true",
        morning: row.Morning === "true",
        userId: parseInt(row["User ID"], 10),
        employeeNumber: parseInt(row["Employee number"], 10),
        type: row.Type,
        extraVacationDay: row["Extra vacation day"] === "true",
        state: row.State,
        substituteState: row["Substitute state"],
        workdays: parseFloat(row.Workdays),
        hours: parseFloat(row.Hours),
        medicalCertificate:
          row["Medical certificate (sick leave only)"] === "true",
        comments: `${row.Comments}`.trim(),
        substituteUserId: parseInt(row["User ID of the substitute"], 10),
      };
      Object.keys(row)
        .filter((key) => !Object.keys(result).includes(key))
        .forEach((key) => {
          const newKey = key.toLowerCase().replace(/[^\d\w]/g, "_");
          result[newKey] = `${row[key]}`;
        });
      return result;
    },
  );
}
