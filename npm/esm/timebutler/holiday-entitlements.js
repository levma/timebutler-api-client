import { parseCsv } from "../utils/parse-csv.js";
/**
 * Calls the Timebutler API to retrieve the holiday entitlements for all users.
 * @param caller The Timebutler API caller to use.
 * @param year The year to retrieve the holiday entitlements for. If not set, the current year is retrieved.
 * @returns A promise resolving to a string containing the response from the Timebutler API.
 */
export function rawHolidayEntitlements(caller, year) {
    const params = year ? { year: year.toString() } : undefined;
    return caller("holidayentitlement", params);
}
/**
 * Retrieves the holiday entitlements for all users.
 * @param caller The caller that is to be used to call the Timebutler API.
 * @param year The year to retrieve the holiday entitlements for. If not set, the current year is assumed.
 * @returns A promise resolving to an array of HolidayEntitlement objects.
 */
export async function holidayEntitlements(caller, year) {
    return parseCsv(await rawHolidayEntitlements(caller, year), (row) => {
        const result = {
            userId: parseInt(row["User ID"], 10),
            vacationContingent: parseFloat(row["Vacation contingent"]),
            remainingVacation: parseFloat(row["Remaining vacation"]),
            extraVacationDays: parseFloat(row["Extra vacation days"]),
            additionalVacationForDisabled: parseFloat(row["Additional vacation for severely challenged persons"]),
            expiredVacation: parseFloat(row["Expired vacation"]),
            paidOutVacation: parseFloat(row["Paid out vacation"]),
            furtherVacationContingent: parseFloat(row["Further vacation contingent"]),
        };
        return result;
    });
}
