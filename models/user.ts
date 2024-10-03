export interface User {
  /** ℕ */
  id: number;
  lastName: string;
  firstName: string;
  /** ℕ */
  employeeNumber: number;
  emailAddress: string;
  phone?: string;
  mobilePhone?: string;
  costCenter?: string;
  branchOffice?: string;
  department: string;
  userType: UserType;
  /** langCode_countryCode like "en_UK" */
  language: string;
  manager: string[];
  accountLocked: boolean;
  additionalInformation?: string;
  entryDate?: Date;
  leavingDate?: Date;
  birthday?: Date;
}

export interface CsvUser {
  /** "123456" */
  "User ID": string;
  "Last name": string;
  "First name": string;
  /** "123" */
  "Employee number": string;
  "E-mail address": string;
  Phone: string;
  "Mobile phone": string;
  /** "Student" */
  "Cost center": string;
  "Branch office": string;
  Department: string;
  "User type": UserType;
  /** "en_UK" */
  Language: string;
  /** "234567,345678" */
  "User ID list of the user's manager (comma separated list, in case more than one user ID exists)":
    string;
  /** "false" */
  "User account locked": string;
  /**  " " */
  "Additional Information": string;
  /** "1/7/2022" */
  "Date of entry (dd/mm/yyyy)": string;
  /**  " " */
  "Date of separation from company (dd/mm/yyyy)": string;
  /** "31/12/1001" */
  "Day of birth (dd/mm/yyyy)": string;
}

export const USER_TYPES = ["Employee", "Manager", "Admin"] as const;

export type UserType = (typeof USER_TYPES)[number];
