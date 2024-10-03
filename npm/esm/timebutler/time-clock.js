import { parseCsv } from "../utils/parse-csv.js";
export function rawTimeClock(caller, command, userId, projectId, serviceId) {
    const params = { command, userid: userId.toString() };
    if (projectId) {
        params["projectid"] = projectId.toString();
    }
    if (serviceId) {
        params["serviceid"] = serviceId.toString();
    }
    return caller("timeclock");
}
export async function timeClock(caller, command, userId, projectId, serviceId) {
    const content = await rawTimeClock(caller, command, userId, projectId, serviceId);
    if (command !== "status") {
        return (await parseCsv("result\n" + content))[0];
    }
    else {
        return (await parseCsv("result;state;startOfTimeClock;startOfPause\n" + content, (row) => {
            const result = {
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
        }))[0];
    }
}
