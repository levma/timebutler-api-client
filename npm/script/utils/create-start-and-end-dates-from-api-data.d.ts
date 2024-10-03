/**
 * Creates correct Date objects from inadequate german date and time strings
 * @param date `dd/mm/yyyy`
 * @param startTime `hh:mm`
 * @param endTime `hh:mm`
 * @param workingTimeInSeconds The time in seconds that the user has worked during the given period
 * @param pauseInSeconds The time in seconds that the user pauses during the given period
 * @returns Date objects for start and end time
 */
export declare function createStartAndEndDatesFromApiData(date: string, startTime: string, endTime: string, timeZone?: string): {
    startTime: Date;
    endTime: Date;
};
//# sourceMappingURL=create-start-and-end-dates-from-api-data.d.ts.map