import type { CsvService, Service } from "../models/service.ts";
import { parseCsv } from "../utils/parse-csv.ts";
import { stringToDate } from "../utils/string-to-date.ts";
import type { TimebutlerApiCaller } from "./api-caller.ts";

export function rawServices(caller: TimebutlerApiCaller): Promise<string> {
  return caller("services");
}

export async function services(
  caller: TimebutlerApiCaller,
  timeZone: string = "Europe/Berlin",
): Promise<Service[]> {
  return parseCsv<CsvService, Service>(await rawServices(caller), (row) => {
    const result: Service = {
      id: parseInt(row["ID of the service"], 10),
      name: row.Name,
      state: row.State,
      billable: row.Billable === "true",
      comments: row.Comments,
      creationDate: stringToDate(row["Creation date"], timeZone)!,
    };
    return result;
  });
}
