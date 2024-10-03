"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawServices = rawServices;
exports.services = services;
const parse_csv_js_1 = require("../utils/parse-csv.js");
const string_to_date_js_1 = require("../utils/string-to-date.js");
function rawServices(caller) {
    return caller("services");
}
async function services(caller, timeZone = "Europe/Berlin") {
    return (0, parse_csv_js_1.parseCsv)(await rawServices(caller), (row) => {
        const result = {
            id: parseInt(row["ID of the service"], 10),
            name: row.Name,
            state: row.State,
            billable: row.Billable === "true",
            comments: row.Comments,
            creationDate: (0, string_to_date_js_1.stringToDate)(row["Creation date"], timeZone),
        };
        return result;
    });
}
