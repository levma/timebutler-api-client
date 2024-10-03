export interface HolidayEntitlement {
  userId: number;
  vacationContingent: number;
  remainingVacation: number;
  extraVacationDays: number;
  additionalVacationForDisabled: number;
  expiredVacation: number;
  paidOutVacation: number;
  /** An admin can activate a further holiday entitlement type and give this entitlement type any name (e.g. "Regeneration days"). The number of holiday days from this holiday entitlement type is returned in the `Further vaction contingent` field. */
  furtherVacationContingent: number;
}

export interface CsvHolidayEntitlement {
  /** '123456' */
  "User ID": string;
  /** '30.0' */
  "Vacation contingent": string;
  /** '5.0' */
  "Remaining vacation": string;
  /** '0.0' */
  "Extra vacation days": string;
  /** '0.0' */
  "Additional vacation for severely challenged persons": string;
  /** '0.0' */
  "Expired vacation": string;
  /** '0.0' */
  "Paid out vacation": string;
  /** '0.0' */
  "Further vacation contingent": string;
}
