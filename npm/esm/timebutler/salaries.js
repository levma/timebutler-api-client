import { parseCsv } from "../utils/parse-csv.js";
import { stringToDate } from "../utils/string-to-date.js";
/**
 * Retrieves the salaries for a given user.
 *
 * @param caller The Timebutler API caller to use.
 * @param param The user to retrieve the salaries for. Either an object with an `email` property, an object with an `employeeNumber` property, an object with a `userId` property, or nothing.
 * @returns A promise resolving to a string containing the response from the Timebutler API.
 */
export function rawSalaries(caller, param) {
    const params = param;
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
export async function salaries(caller, param, timeZone = "Europe/Berlin") {
    return parseCsv(await rawSalaries(caller, param), (row) => {
        const paymentType = row["Payment type"];
        let validFrom;
        let paymentDate;
        if (paymentType === "Salary") {
            validFrom = stringToDate(row["Valid from / Payment date"], timeZone);
        }
        else {
            paymentDate = stringToDate(row["Valid from / Payment date"], timeZone);
        }
        const result = {
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
    });
}
