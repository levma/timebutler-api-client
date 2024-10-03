import type { CsvHolidaySet, HolidaySet } from "../models/holiday-set.js";
import { parseCsv } from "../utils/parse-csv.js";
import type { TimebutlerApiCaller } from "./api-caller.js";

/**
 * Downloads the list of holiday sets from the Timebutler API.
 * @param caller - A Timebutler API caller function.
 * @returns A promise that resolves to a string containing the CSV data.
 */
export function rawHolidaySets(caller: TimebutlerApiCaller): Promise<string> {
  return caller("holidaysets");
}

/**
 * Get all holiday sets.
 *
 * @param caller The caller that is to be used to call the Timebutler API.
 * @returns A promise resolving to an array of holiday sets.
 */
export async function holidaySets(
  caller: TimebutlerApiCaller,
): Promise<HolidaySet[]> {
  return parseCsv<CsvHolidaySet, HolidaySet>(
    await rawHolidaySets(caller),
    (row) => {
      const result: HolidaySet = {
        id: parseInt(row["ID of the holiday set"], 10),
        name: row["Name of the holiday set"],
      };
      return result;
    },
  );
}
