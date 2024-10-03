export interface Worktime {
    id: number;
    userId: number;
    employeeNumber: number;
    /** ISO String like YYYY-MM-DD */
    date: string;
    startTime: Date;
    endTime: Date;
    workingTimeInSeconds: number;
    pauseInSeconds: number;
    state: WorktimeState;
    projectId: number;
    serviceId: number;
    comments: string;
    autoStoppend: boolean;
}
export interface CsvWorktime {
    "ID of the work time entry": string;
    "User ID": string;
    "Employee number": string;
    "Date (dd/mm/yyyy)": string;
    "Start time (hh:mm)": string;
    "End time (hh:mm)": string;
    "Working time in seconds": string;
    "Pause in seconds": string;
    State: WorktimeState;
    "ID of the project": string;
    "ID of the service": string;
    Comments: string;
    "Auto stopped": string;
}
export declare const WORKTIME_STATES: readonly ["Done", "Requested", "Accepted", "Rejected", "In process"];
export type WorktimeState = (typeof WORKTIME_STATES)[number];
//# sourceMappingURL=worktime.d.ts.map