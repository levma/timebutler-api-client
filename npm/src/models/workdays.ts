export interface Workdays {
  userId: number;
  validFrom?: Date;
  minutesOnMonday: number;
  minutesOnTuesday: number;
  minutesOnWednesday: number;
  minutesOnThursday: number;
  minutesOnFriday: number;
  minutesOnSaturday: number;
  minutesOnSunday: number;
  holidaySetId: number;
}

export interface CsvWorkdays {
  /** 12345 */
  "User ID": string;
  /** maybe "unlimited" */
  "Valid from (dd/mm/yyyy)": string;
  "Monday working time in minutes": string;
  "Tuesday working time in minutes": string;
  "Wednesday working time in minutes": string;
  "Thursday working time in minutes": string;
  "Friday working time in minutes": string;
  "Saturday working time in minutes": string;
  "Sunday working time in minutes": string;
  "ID of the holiday set": string;
}
