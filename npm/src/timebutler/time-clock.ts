import type { TimeClockCommand } from "../models/time-clock-command.js";
import type {
  CsvTimeClockStatusResponse,
  TimeClockResponse,
  TimeClockStatusResponse,
} from "../models/time-clock-response.js";
import { parseCsv } from "../utils/parse-csv.js";
import type { TimebutlerApiCaller, TimebutlerApiParams } from "./api-caller.js";

export function rawTimeClock(
  caller: TimebutlerApiCaller,
  command: TimeClockCommand,
  userId: number,
  projectId?: number,
  serviceId?: number,
): Promise<string> {
  const params: TimebutlerApiParams = { command, userid: userId.toString() };
  if (projectId) {
    params["projectid"] = projectId.toString();
  }
  if (serviceId) {
    params["serviceid"] = serviceId.toString();
  }
  return caller("timeclock");
}

export async function timeClock(
  caller: TimebutlerApiCaller,
  command: Exclude<TimeClockCommand, "STATUS">,
  userId: number,
  projectId?: number,
  serviceId?: number,
): Promise<TimeClockResponse>;
export async function timeClock(
  caller: TimebutlerApiCaller,
  command: Extract<TimeClockCommand, "STATUS">,
  userId: number,
  projectId?: number,
  serviceId?: number,
): Promise<TimeClockStatusResponse>;
export async function timeClock(
  caller: TimebutlerApiCaller,
  command: TimeClockCommand,
  userId: number,
  projectId?: number,
  serviceId?: number,
): Promise<TimeClockResponse | TimeClockStatusResponse> {
  const content = await rawTimeClock(
    caller,
    command,
    userId,
    projectId,
    serviceId,
  );
  if (command !== "status") {
    return (await parseCsv<TimeClockResponse>("result\n" + content))[0];
  } else {
    return (
      await parseCsv<CsvTimeClockStatusResponse, TimeClockStatusResponse>(
        "result;state;startOfTimeClock;startOfPause\n" + content,
        (row) => {
          const result: TimeClockStatusResponse = {
            result: row.result,
            state: row.state,
          };
          if (row.startOfTimeClock > 0) {
            result.startOfTimeClock = new Date(row.startOfTimeClock);
            if (row.startOfPause > 0) {
              result.startOfPause = new Date(row.startOfPause);
            }
          }
          return result;
        },
      )
    )[0];
  }
}
