export interface Service {
  id: number;
  name: string;
  state: ServiceState;
  billable: boolean;
  comments: string;
  creationDate: Date;
}

export interface CsvService {
  "ID of the service": string;
  Name: string;
  State: ServiceState;
  Billable: string;
  Comments: string;
  "Creation date": string;
}

export const SERVICE_STATES = ["Active", "Inactive"] as const;

export type ServiceState = (typeof SERVICE_STATES)[number];
