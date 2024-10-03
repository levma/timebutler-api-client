"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDateInTimezone = createDateInTimezone;
/**
 * Creates a new Date object in a specified timezone.
 *
 * @param {number} year - The year of the date.
 * @param {number} month - The month of the date (1-12).
 * @param {number} day - The day of the date (1-31).
 * @param {number} [hours=0] - The hour of the date (0-23).
 * @param {number} [minutes=0] - The minute of the date (0-59).
 * @param {number} [seconds=0] - The second of the date (0-59).
 * @param {number} [ms=0] - The millisecond of the date (0-999).
 * @param {string} [timeZone="Europe/Berlin"] - The timezone of the date.
 * @return {Date} A new Date object in the specified timezone.
 */
function createDateInTimezone(year, month, day, hours = 0, minutes = 0, seconds = 0, ms = 0, timeZone = "Europe/Berlin") {
    return new Date(new Date(year, month - 1, day, hours, minutes, seconds, ms).toLocaleString("en-US", { timeZone }));
}
