export interface TimeClockResponse {
  result: TimeClockResponseResult;
}

export interface TimeClockStatusResponse {
  result: TimeClockResponseResult;
  state: TimeClockState;
  startOfTimeClock?: Date;
  startOfPause?: Date;
}

export interface CsvTimeClockStatusResponse {
  result: TimeClockResponseResult;
  state: TimeClockState;
  startOfTimeClock: number;
  startOfPause: number;
}

export const TIME_CLOCK_RESPONSE_RESULTS = [
  "OK",
  "WARN_TIMECLOCK_ALREADY_RUNNING",
  "WARN_TIMECLOCK_ALREADY_PAUSED",
  "WARN_TIME_ENTRY_SAVED_WITH_MODIFICATIONS",
  "WARN_SHORT_BUSINESSTRIP_TIMECLOCK_NOT_RUNNING",
  "WARN_SHORT_BUSINESSTRIP_ALREADY_STARTED",
  "WARN_SHORT_BUSINESSTRIP_NOT_STARTED",
  "RESULT_ERR_INTERNAL_ERROR",
  "RESULT_ERR_TIMETRACKING_FEATURE_NOT_ACT",
  "RESULT_ERR_COMMAND_INVALID",
  "RESULT_ERR_USERID_INVALID",
  "RESULT_ERR_PROJECTID_INVALID",
  "RESULT_ERR_SERVICEID_INVALID",
  "RESULT_ERR_TIMECLOCK_NOT_STARTABLE_MAY_OVERLAP",
  "RESULT_ERR_TIMECLOCK_STOPPED_WITHOUT_SAVE_DUE_TO_OVERLAPPING",
  "RESULT_ERR_TIMECLOCK_STOPPED_WITHOUT_SAVE_DUE_TO_UNRESOLVABLE_CHANGE_REQUIREMENTS",
  "RESULT_ERR_TIMECLOCK_NOT_RUNNING",
  "RESULT_ERR_MIN_DURATION_OR_PAUSE_NOT_OK",
] as const;

/**
 *  - `OK`: Das Kommando wurde erfolgreich ausgeführt.
 *  - `WARN_TIMECLOCK_ALREADY_RUNNING`: Die Stempeluhr ist gerade aktiv und kann nicht erneut gestartet werden.
 *  - `WARN_TIMECLOCK_ALREADY_PAUSED`: Die Stempeluhr ist gerade pausiert und kann nicht erneut pausiert werden.
 *  - `WARN_TIME_ENTRY_SAVED_WITH_MODIFICATIONS`: Die Stempeluhr wurde gestoppt und der Zeiteintrag wurde gespeichert. Der Zeiteintrag wurde jedoch abgeändert, um die Vorgaben der Pausenregelung (Pausenzeiten oder maximale tägliche Arbeitszeit) zu erfüllen.
 *  - `WARN_SHORT_BUSINESSTRIP_TIMECLOCK_NOT_RUNNING`: Die Stempeluhr ist gerade nicht aktiv. Ein Dienstgang kann nur bei gestarteter Stempeluhr gestartet oder gestoppt werden.
 *  - `WARN_SHORT_BUSINESSTRIP_ALREADY_STARTED`: Der Dienstgang wurde bereits gestartet.
 *  - `WARN_SHORT_BUSINESSTRIP_NOT_STARTED`: Der Dienstgang ist nicht gestartet.
 *  - `RESULT_ERR_INTERNAL_ERROR`: Es ist ein interner Fehler aufgetreten. Bitte wiederholen Sie den Vorgang später nochmal.
 *  - `RESULT_ERR_TIMETRACKING_FEATURE_NOT_ACT`: Das Zeiterfassungs-Feature ist deaktiviert.
 *  - `RESULT_ERR_COMMAND_INVALID`: Es wurde kein Kommando-Parameter in dem Request übergeben oder der übergebene Kommando-Parameter ist ungültig oder unbekannt.
 *  - `RESULT_ERR_USERID_INVALID`: Es wurde kein userid-Parameter in dem Request übergeben oder der übergebene userid-Parameter ist ungültig.
 *  - `RESULT_ERR_PROJECTID_INVALID`: Die Angabe zur Projekt ID (Parameter projectid) ist ungültig oder unbekannt.
 *  - `RESULT_ERR_SERVICEID_INVALID`: Die Angabe zur Kategorie ID (Parameter serviceid) ist ungültig oder unbekannt.
 *  - `RESULT_ERR_TIMECLOCK_NOT_STARTABLE_MAY_OVERLAP`: Die Stempeluhr kann zurzeit nicht gestartet werden, da es zu Überschneidungen mit bestehenden Zeiteinträgen für den heutigen Tag kommen kann.
 *  - `RESULT_ERR_TIMECLOCK_STOPPED_WITHOUT_SAVE_DUE_TO_OVERLAPPING`: Der Zeiteintrag für die Stempeluhr überschneidet sich mit bestehenden Zeiteinträgen für den heutigen Tag. Die Stempeluhr wurde gestoppt und der Zeiteintrag wurde verworfen.
 *  - `RESULT_ERR_TIMECLOCK_STOPPED_WITHOUT_SAVE_DUE_TO_UNRESOLVABLE_CHANGE_REQUIREMENTS`: Der Zeiteintrag für die Stempeluhr verletzt die Vorgaben einer Pausenregelung (Mindestpause oder maximale tägliche Arbeitszeit) in einer Weise, die durch Anpassung der Zeiten/Pausen des Eintrages nicht behoben werden können. Die Stempeluhr wurde gestoppt und der Zeiteintrag wurde verworfen.
 *  - `RESULT_ERR_TIMECLOCK_NOT_RUNNING`: Die Stempeluhr läuft zurzeit nicht und kann deswegen nicht pausiert oder gestoppt werden.
 *  - `RESULT_ERR_MIN_DURATION_OR_PAUSE_NOT_OK`: Die Pause und die Arbeitszeitdauer sind kleiner als 60 Sekunden. Der Zeiteintrag kann noch nicht gespeichert werden.
 */
export type TimeClockResponseResult =
  (typeof TIME_CLOCK_RESPONSE_RESULTS)[number];

export const TIME_CLOCK_STATES = ["IDLE", "RUNNING", "PAUSED"] as const;

/**
 * - `IDLE` = Stempeluhr ruht
 * - `RUNNING` = Stempeluhr läuft, nicht pausiert
 * - `PAUSED` = Stempeluhr pausiert
 */
export type TimeClockState = (typeof TIME_CLOCK_STATES)[number];
