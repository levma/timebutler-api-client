export type ProjectImportResponse =
  | {
    line: number;
    state: Extract<ProjectImportState, "OK">;
    projectId: number;
  }
  | {
    line: number;
    state: Exclude<ProjectImportState, "OK">;
  };

export const PROJECT_IMPORT_STATES = [
  "OK",
  "INTERNAL_ERROR",
  "CSV_FILE_MISSING_OR_INVALID",
  "CSV_FILE_TOO_LARGE",
  "LINE_NOT_READABLE",
  "NUMBER_OF_COLUMNS_INCORRECT",
  "COMMAND_MISSING_OR_INVALID",
  "PROJECT_ID_MISSING",
  "PROJECT_ID_INVALID",
  "PROJECT_ID_UNKNOWN",
  "PROJECT_NAME_MISSING_OR_INVALID",
  "PROJECT_ACTIVE_FLAG_MISSING_OR_INVALID",
  "PROJECT_BUDGET_HOURS_INVALID",
  "PROJECT_SERVICES_FLAG_MISSING_OR_INVALID",
  "WORKTIME_ENTRY_FOR_PROJECT_EXISTS_THUS_NO_DELETE",
  "COMMENT_INVALID_OR_TOO_LARGE",
] as const;

export type ProjectImportState = (typeof PROJECT_IMPORT_STATES)[number];
