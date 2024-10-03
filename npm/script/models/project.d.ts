export interface Project {
    id: number;
    name: string;
    state: ProjectState;
    budgetInHours: number;
    comments: string;
    creationDate: Date;
}
export interface CsvProject {
    "ID of the project": string;
    Name: string;
    State: ProjectState;
    "Budget in hours": string;
    Comments: string;
    "Creation date": string;
}
export declare const PROJECT_STATES: readonly ["Active", "Inactive"];
export type ProjectState = (typeof PROJECT_STATES)[number];
//# sourceMappingURL=project.d.ts.map