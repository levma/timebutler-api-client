import type { TimeClockCommand } from "../models/time-clock-command.js";
import type { TimeClockResponse, TimeClockStatusResponse } from "../models/time-clock-response.js";
import type { TimebutlerApiCaller } from "./api-caller.js";
export declare function rawTimeClock(caller: TimebutlerApiCaller, command: TimeClockCommand, userId: number, projectId?: number, serviceId?: number): Promise<string>;
export declare function timeClock(caller: TimebutlerApiCaller, command: Exclude<TimeClockCommand, "STATUS">, userId: number, projectId?: number, serviceId?: number): Promise<TimeClockResponse>;
export declare function timeClock(caller: TimebutlerApiCaller, command: Extract<TimeClockCommand, "STATUS">, userId: number, projectId?: number, serviceId?: number): Promise<TimeClockStatusResponse>;
//# sourceMappingURL=time-clock.d.ts.map