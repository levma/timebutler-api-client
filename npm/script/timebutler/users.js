"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawUsers = rawUsers;
exports.users = users;
const parse_csv_js_1 = require("../utils/parse-csv.js");
const string_to_date_js_1 = require("../utils/string-to-date.js");
/**
 * Downloads the list of users from the Timebutler API.
 * @param caller - A Timebutler API caller function.
 * @returns A promise that resolves to a string containing the CSV data.
 */
function rawUsers(caller) {
    return caller("users");
}
/**
 * Downloads the list of users from the Timebutler API and parses the
 * response into an array of User objects.
 * @param caller - A Timebutler API caller function.
 * @param timeZone - The time zone to use for date parsing.
 * @returns A promise that resolves to an array of User objects.
 */
async function users(caller, timeZone = "Europe/Berlin") {
    return (0, parse_csv_js_1.parseCsv)(await rawUsers(caller), (row) => {
        const result = {
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
            userType: row.Department,
            language: row.Language,
            manager: row["User ID list of the user's manager (comma separated list, in case more than one user ID exists)"]?.split(",") || "",
            accountLocked: row["User account locked"] === "True",
            additionalInformation: row["Additional Information"],
            entryDate: (0, string_to_date_js_1.stringToDate)(row["Date of entry (dd/mm/yyyy)"], timeZone),
            leavingDate: (0, string_to_date_js_1.stringToDate)(row["Date of separation from company (dd/mm/yyyy)"], timeZone),
            birthday: (0, string_to_date_js_1.stringToDate)(row["Day of birth (dd/mm/yyyy)"], timeZone),
        };
        return result;
    });
}
