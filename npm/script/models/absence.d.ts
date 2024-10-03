export interface Absence {
    id: number;
    from: Date;
    to: Date;
    /** Does the absence only apply for half a day? */
    halfADay: boolean;
    /** In case of `halfADay == true`: is the absence in the morning? Otherwise, it applies to the afternoon. */
    morning: boolean;
    userId: number;
    employeeNumber: number;
    /** The administrator can define any number of types. */
    type: string;
    extraVacationDay: boolean;
    state: AbsenceState;
    substituteState: SubstitutionState;
    workdays: number;
    /** The number of hours of absence. Only used if it is not a full working day. */
    hours: number;
    /** Does a medical certificate exist? (sick leave only) */
    medicalCertificate: boolean;
    comments: string;
    substituteUserId: number;
    /**
     * Additional fields can be added by the administrator for every `Absence.type`.
     * ***NOTE:*** Only string values will be returned!
     */
    [additionalField: string]: string | number | boolean | Date;
}
export interface CsvAbsence {
    /** '12345678' */
    ID: string;
    /** '10/05/2024' */
    From: string;
    /** '10/05/2024' */
    To: string;
    /** 'false' */
    "Half a day": string;
    /** 'false' */
    Morning: string;
    /** '123456' */
    "User ID": string;
    /** '12' */
    "Employee number": string;
    /** Any string, e.g. 'Compensation days' */
    Type: string;
    /** 'false' */
    "Extra vacation day": string;
    /** For example: 'In process' */
    State: AbsenceState;
    /** For example: 'Approval pending' */
    "Substitute state": SubstitutionState;
    /** '1.0' */
    Workdays: string;
    /** '0.0', */
    Hours: string;
    /** ' ' if empty, or 'true' */
    "Medical certificate (sick leave only)": string;
    /** ' ' if empty */
    Comments: string | undefined;
    /** '123456' */
    "User ID of the substitute": string;
    [additionalField: string]: string | undefined;
}
export declare const ABSENCE_STATES: readonly ["Approved", "Done", "In process", "Rejected", "Submitted"];
export type AbsenceState = (typeof ABSENCE_STATES)[number];
export declare const SUBSTITION_STATES: readonly ["Approval pending", "Approved", "Automatically approved", "Denied", "No approval required"];
export type SubstitutionState = (typeof SUBSTITION_STATES)[number];
//# sourceMappingURL=absence.d.ts.map