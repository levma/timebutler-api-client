export interface TimeImportByEventsLineError {
  line: number;
  error: TimeImportByEventsError;
}

export type TimeImportByEventsResponse =
  | {
    success: true;
  }
  | {
    success: false;
    errors: TimeImportByEventsLineError[];
  };

export const TIME_IMPORT_BY_EVENTS_ERRORS = [
  "INTERNAL_ERROR",
  "CSV_FILE_MISSING_OR_INVALID",
  "CSV_FILE_TOO_LARGE",
  "LINE_NOT_READABLE",
  "NUMBER_OF_COLUMNS_INCORRECT",
  "EMAIL_OR_EMPLOYEE_NUMBER_MISSING",
  "EMAIL_UNKNOWN",
  "EMPLOYEE_NUMBER_UNKNOWN",
  "TIMESTAMP_INVALID",
  "EVENT_TYPE_INVALID",
  "PROJECT_ID_INVALID",
  "REMARKS_INVALID_OR_TOO_LONG",
  "SERVICE_ID_INVALID",
  "FIRST_EVENT_MUST_BE_START",
  "EVENT_MUST_BE_AFTER_PREVIOUS_EVENT",
  "ENTRY_COLLIDES_WITH_EXISTING_ENTRY",
  "ENTRY_MUST_NOT_EXCEED_TWO_CALENDAR_DAYS",
  "ENTRY_HAS_NO_WORK_TIME",
] as const;

export type TimeImportByEventsError =
  (typeof TIME_IMPORT_BY_EVENTS_ERRORS)[number];
