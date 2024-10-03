import type { CsvUser, User } from "../models/user.js";
import { parseCsv } from "../utils/parse-csv.js";
import { stringToDate } from "../utils/string-to-date.js";
import type { TimebutlerApiCaller } from "./api-caller.js";

/**
 * Downloads the list of users from the Timebutler API.
 * @param caller - A Timebutler API caller function.
 * @returns A promise that resolves to a string containing the CSV data.
 */
export function rawUsers(caller: TimebutlerApiCaller): Promise<string> {
  return caller("users");
}

/**
 * Downloads the list of users from the Timebutler API and parses the
 * response into an array of User objects.
 * @param caller - A Timebutler API caller function.
 * @param timeZone - The time zone to use for date parsing.
 * @returns A promise that resolves to an array of User objects.
 */
export async function users(
  caller: TimebutlerApiCaller,
  timeZone: string = "Europe/Berlin",
): Promise<User[]> {
  return parseCsv<CsvUser, User>(await rawUsers(caller), (row) => {
    const result: User = {
      id: parseInt(row["User ID"], 10),
      lastName: row["Last name"],
      firstName: row["First name"],
      employeeNumber: parseInt(row["Employee number"], 10),
      emailAddress: row["E-mail address"],
      phone: row.Phone,
      mobilePhone: row["Mobile phone"],
      costCenter: row["Cost center"],
      branchOffice: row["Branch office"],
      department: row.Department,
      userType: row.Department as User["userType"],
      language: row.Language,
      manager: row[
        "User ID list of the user's manager (comma separated list, in case more than one user ID exists)"
      ]?.split(",") || "",
      accountLocked: row["User account locked"] === "True",
      additionalInformation: row["Additional Information"],
      entryDate: stringToDate(row["Date of entry (dd/mm/yyyy)"], timeZone),
      leavingDate: stringToDate(
        row["Date of separation from company (dd/mm/yyyy)"],
        timeZone,
      ),
      birthday: stringToDate(row["Day of birth (dd/mm/yyyy)"], timeZone),
    };
    return result;
  });
}
