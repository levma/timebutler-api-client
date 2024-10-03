import { createDateInTimezone } from "./create-date-in-timezone.js";
/**
 * Creates correct Date objects from inadequate german date and time strings
 * @param date `dd/mm/yyyy`
 * @param startTime `hh:mm`
 * @param endTime `hh:mm`
 * @param workingTimeInSeconds The time in seconds that the user has worked during the given period
 * @param pauseInSeconds The time in seconds that the user pauses during the given period
 * @returns Date objects for start and end time
 */
export function createStartAndEndDatesFromApiData(date, startTime, endTime, timeZone = "Europe/Berlin") {
    const dateParts = date.split("/");
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[2], 10);
    const startTimeParts = startTime.split(":");
    const startHour = parseInt(startTimeParts[0], 10);
    const startMinute = parseInt(startTimeParts[1], 10);
    const endTimeParts = endTime.split(":");
    const endHour = parseInt(endTimeParts[0], 10);
    const endMinute = parseInt(endTimeParts[1], 10);
    const start = createDateInTimezone(year, month, day, startHour, startMinute, 0, 0, timeZone);
    let end = createDateInTimezone(year, month, day, endHour, endMinute, 0, 0, timeZone);
    if (end < start) {
        end = createDateInTimezone(year, month, day + 1, endHour, endMinute, 0, 0, timeZone);
    }
    return {
        startTime: start,
        endTime: end,
    };
}
