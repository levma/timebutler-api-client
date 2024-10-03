import type {
  CsvHolidayEntitlement,
  HolidayEntitlement,
} from "../models/holiday-entitlement.ts";
import { parseCsv } from "../utils/parse-csv.ts";
import type { TimebutlerApiCaller } from "./api-caller.ts";

/**
 * Calls the Timebutler API to retrieve the holiday entitlements for all users.
 * @param caller The Timebutler API caller to use.
 * @param year The year to retrieve the holiday entitlements for. If not set, the current year is retrieved.
 * @returns A promise resolving to a string containing the response from the Timebutler API.
 */
export function rawHolidayEntitlements(
  caller: TimebutlerApiCaller,
  year?: number,
): Promise<string> {
  const params = year ? { year: year.toString() } : undefined;
  return caller("holidayentitlement", params);
}

/**
 * Retrieves the holiday entitlements for all users.
 * @param caller The caller that is to be used to call the Timebutler API.
 * @param year The year to retrieve the holiday entitlements for. If not set, the current year is assumed.
 * @returns A promise resolving to an array of HolidayEntitlement objects.
 */
export async function holidayEntitlements(
  caller: TimebutlerApiCaller,
  year?: number,
): Promise<HolidayEntitlement[]> {
  return parseCsv<CsvHolidayEntitlement, HolidayEntitlement>(
    await rawHolidayEntitlements(caller, year),
    (row) => {
      const result: HolidayEntitlement = {
        userId: parseInt(row["User ID"], 10),
        vacationContingent: parseFloat(row["Vacation contingent"]),
        remainingVacation: parseFloat(row["Remaining vacation"]),
        extraVacationDays: parseFloat(row["Extra vacation days"]),
        additionalVacationForDisabled: parseFloat(
          row["Additional vacation for severely challenged persons"],
        ),
        expiredVacation: parseFloat(row["Expired vacation"]),
        paidOutVacation: parseFloat(row["Paid out vacation"]),
        furtherVacationContingent: parseFloat(
          row["Further vacation contingent"],
        ),
      };
      return result;
    },
  );
}
