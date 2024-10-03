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
export function createDateInTimezone(
  year: number,
  month: number,
  day: number,
  hours: number = 0,
  minutes: number = 0,
  seconds: number = 0,
  ms: number = 0,
  timeZone: string = "Europe/Berlin",
): Date {
  return new Date(
    new Date(year, month - 1, day, hours, minutes, seconds, ms).toLocaleString(
      "en-US",
      { timeZone },
    ),
  );
}
