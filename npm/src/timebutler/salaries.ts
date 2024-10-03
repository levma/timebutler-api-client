import type { CsvSalary, Salary } from "../models/salary.js";
import { parseCsv } from "../utils/parse-csv.js";
import { stringToDate } from "../utils/string-to-date.js";
import type { TimebutlerApiCaller, TimebutlerApiParams } from "./api-caller.js";

/**
 * Retrieves the salaries for a given user.
 *
 * @param caller The Timebutler API caller to use.
 * @param param The user to retrieve the salaries for. Either an object with an `email` property, an object with an `employeeNumber` property, an object with a `userId` property, or nothing.
 * @returns A promise resolving to a string containing the response from the Timebutler API.
 */
export function rawSalaries(
  caller: TimebutlerApiCaller,
  param:
    | { email: string }
    | { employeeNumber: string }
    | { userId: number }
    | undefined,
): Promise<string> {
  const params: TimebutlerApiParams | undefined = param;
  return caller("salaries", params);
}

/**
 * Retrieves the salaries for a given user.
 *
 * @param caller The Timebutler API caller to use.
 * @param param The user to retrieve the salaries for. Either an object with an `email` property, an object with an `employeeNumber` property, an object with a `userId` property, or nothing.
 * @param timeZone The time zone to interpret the dates in. Defaults to "Europe/Berlin".
 * @returns A promise resolving to an array of Salary objects.
 */
export async function salaries(
  caller: TimebutlerApiCaller,
  param:
    | { email: string }
    | { employeeNumber: string }
    | { userId: number }
    | undefined,
  timeZone: string = "Europe/Berlin",
): Promise<unknown> {
  return parseCsv<CsvSalary, Salary>(
    await rawSalaries(caller, param),
    (row) => {
      const paymentType = row["Payment type"];
      let validFrom: Date | undefined;
      let paymentDate: Date | undefined;
      if (paymentType === "Salary") {
        validFrom = stringToDate(row["Valid from / Payment date"], timeZone);
      } else {
        paymentDate = stringToDate(row["Valid from / Payment date"], timeZone);
      }
      const result: Salary = {
        userId: parseInt(row["User ID"], 10),
        employeeNumber: parseInt(row["Employee number"], 10),
        paymentType,
        validFrom,
        paymentDate,
        validUntil: stringToDate(row["Valid until"], timeZone),
        salaryOrBonusType: row["Salary type / Bonus type"],
        grossAmount: parseFloat(row["Gross amount"]),
        currency: row.Currency,
        hoursPerWeek: parseFloat(row["Hours per week"]),
        comments: row.Comments,
      };
      return result;
    },
  );
}
