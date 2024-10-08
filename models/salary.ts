export interface Salary {
  userId: number;
  employeeNumber: number;
  paymentType: PaymentType;
  validFrom?: Date;
  paymentDate?: Date;
  validUntil?: Date;
  salaryOrBonusType: string;
  grossAmount: number;
  currency: Currency;
  hoursPerWeek: number;
  comments: string;
}

export interface CsvSalary {
  "User ID": string;
  "Employee number": string;
  "Payment type": PaymentType;
  "Valid from / Payment date": string;
  "Valid until": string;
  "Salary type / Bonus type": string;
  "Gross amount": string;
  Currency: Currency;
  "Hours per week": string;
  Comments: string;
}

export const PAYMENT_TYPES = [
  "Salary",
  "Variable remuneration",
  "Bonus payments",
] as const;

export type PaymentType = (typeof PAYMENT_TYPES)[number];

export const CURRENCIES = [
  "AUD",
  "BRL",
  "GBP",
  "BGN",
  "CNY",
  "DKK",
  "EUR",
  "HKD",
  "INR",
  "IDR",
  "ISK",
  "ILS",
  "JPY",
  "CAD",
  "HRK",
  "MYR",
  "MXN",
  "NZD",
  "NOK",
  "PHP",
  "PLN",
  "RON",
  "SEK",
  "CHF",
  "SGD",
  "ZAR",
  "KRW",
  "THB",
  "CZK",
  "TRY",
  "HUF",
  "USD",
] as const;

export type Currency = (typeof CURRENCIES)[number];
