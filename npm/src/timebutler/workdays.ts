import type { CsvWorkdays, Workdays } from "../models/workdays.js";
import { parseCsv } from "../utils/parse-csv.js";
import { stringToDate } from "../utils/string-to-date.js";
import type { TimebutlerApiCaller } from "./api-caller.js";

/**
 * Retrieves all workdays in the raw CSV format as a string.
 *
 * @param caller The caller that is to be used to call the Timebutler API.
 * @returns A promise resolving to a string containing the workdays in the Timebutler export format.
 */
export function rawWorkdays(caller: TimebutlerApiCaller): Promise<string> {
  return caller("workdays");
}

/**
 * Retrieves all workdays for all users.
 *
 * @param caller The caller that is to be used to call the Timebutler API.
 * @param timeZone The time zone to interpret the dates in. Defaults to "Europe/Berlin".
 * @returns A promise resolving to an array of workdays.
 */
export async function workdays(
  caller: TimebutlerApiCaller,
  timeZone: string = "Europe/Berlin",
): Promise<Workdays[]> {
  return parseCsv<CsvWorkdays, Workdays>(await rawWorkdays(caller), (row) => {
    const result: Workdays = {
      userId: parseInt(row["User ID"], 10),
      validFrom: stringToDate(row["Valid from (dd/mm/yyyy)"], timeZone),
      minutesOnMonday: parseInt(row["Monday working time in minutes"], 10),
      minutesOnTuesday: parseInt(row["Thursday working time in minutes"], 10),
      minutesOnWednesday: parseInt(
        row["Wednesday working time in minutes"],
        10,
      ),
      minutesOnThursday: parseInt(row["Thursday working time in minutes"], 10),
      minutesOnFriday: parseInt(row["Friday working time in minutes"], 10),
      minutesOnSaturday: parseInt(row["Saturday working time in minutes"], 10),
      minutesOnSunday: parseInt(row["Sunday working time in minutes"], 10),
      holidaySetId: parseInt(row["ID of the holiday set"], 10),
    };
    return result;
  });
}
