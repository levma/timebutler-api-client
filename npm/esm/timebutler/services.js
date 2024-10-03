import { parseCsv } from "../utils/parse-csv.js";
import { stringToDate } from "../utils/string-to-date.js";
export function rawServices(caller) {
    return caller("services");
}
export async function services(caller, timeZone = "Europe/Berlin") {
    return parseCsv(await rawServices(caller), (row) => {
        const result = {
            id: parseInt(row["ID of the service"], 10),
            name: row.Name,
            state: row.State,
            billable: row.Billable === "true",
            comments: row.Comments,
            creationDate: stringToDate(row["Creation date"], timeZone),
        };
        return result;
    });
}
