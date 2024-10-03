import type { Service } from "../models/service.js";
import type { TimebutlerApiCaller } from "./api-caller.js";
export declare function rawServices(caller: TimebutlerApiCaller): Promise<string>;
export declare function services(caller: TimebutlerApiCaller, timeZone?: string): Promise<Service[]>;
//# sourceMappingURL=services.d.ts.map