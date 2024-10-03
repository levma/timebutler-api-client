import { createDateInTimezone } from "./create-date-in-timezone.ts";

/**
 * Converts a `string` from the Timebutler API to a `Date`
 * @param str format: `dd/mm/yyyy`
 * @returns `Date` if `str` could be parsed or `undefined` if not
 */
export function stringToDate(
  str: string,
  timeZone: string = "Europe/Berlin",
): Date | undefined {
  try {
    const parts = str.split("/");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    const date = createDateInTimezone(year, month, day, 0, 0, 0, 0, timeZone);
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return undefined;
    } else {
      return date;
    }
  } catch {
    return undefined;
  }
}
