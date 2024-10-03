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
export declare const SERVICE_STATES: readonly ["Active", "Inactive"];
export type ServiceState = (typeof SERVICE_STATES)[number];
//# sourceMappingURL=service.d.ts.map