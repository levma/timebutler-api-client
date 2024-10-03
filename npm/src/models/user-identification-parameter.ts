export const USER_IDENTIFICATION_PARAMETERS = [
  "email",
  "employeenumber",
] as const;
export type UserIdentificationParamter =
  (typeof USER_IDENTIFICATION_PARAMETERS)[number];
