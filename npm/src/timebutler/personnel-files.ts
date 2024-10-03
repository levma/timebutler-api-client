import type {
  CsvPersonnelFile,
  PersonnelFile,
} from "../models/personnel-file.js";
import { parseCsv } from "../utils/parse-csv.js";
import { stringToDate } from "../utils/string-to-date.js";
import type { TimebutlerApiCaller, TimebutlerApiParams } from "./api-caller.js";

/**
 * Downloads the personnel files for a given user in the raw CSV format.
 * @param caller The caller that is to be used to call the Timebutler API.
 * @param param The user to retrieve the personnel files for. Either an object with an `email` property, an object with an `employeeNumber` property, an object with a `userId` property, or nothing.
 * @returns A promise resolving to a string containing the response from the Timebutler API.
 */
export function rawPersonnelFiles(
  caller: TimebutlerApiCaller,
  param:
    | { email: string }
    | { employeeNumber: string }
    | { userId: number }
    | undefined,
): Promise<string> {
  const params: TimebutlerApiParams | undefined = param;
  return caller("personnelfiles", params);
}

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
export async function personnelFiles(
  caller: TimebutlerApiCaller,
  param:
    | { email: string }
    | { employeeNumber: string }
    | { userId: number }
    | undefined,
  timeZone: string = "Europe/Berlin",
): Promise<unknown> {
  return parseCsv<CsvPersonnelFile, PersonnelFile>(
    await rawPersonnelFiles(caller, param),
    (row) => {
      const result: PersonnelFile = {
        userId: parseInt(row["User ID"], 10),
        employeeNumber: row["Employee number"],
      };
      Object.keys(row)
        .filter((k) => k.includes("|"))
        .forEach((key) => {
          const names = key.split("|");
          if (names.length !== 2) return;
          const group = names[0].trim();
          const field = names[1].trim();
          if (result[group] === undefined) {
            result[group] = {};
          }
          let value: string | number | boolean | Date = row[key];
          if (/^\d+$/.test(value)) {
            value = parseInt(value, 10);
          } else if (/^\d+\.\d+$/.test(value) || /^\d+,\d+$/.test(value)) {
            value = parseFloat(value);
          } else if (value === "true") {
            value = true;
          } else if (value === "false") {
            value = false;
          } else if (/^\d\d\/\d\d\/\d\d.*/.test(value)) {
            const date = stringToDate(value, timeZone);
            if (date !== undefined) {
              value = date;
            }
          }
          (
            result[group] as {
              [fieldName: string]: string | number | boolean | Date;
            }
          )[field] = value;
        });
      return result;
    },
  );
}
