export interface PersonnelFile {
    userId: number;
    employeeNumber: string;
    [groupName: string]: {
        [fieldName: string]: string | number | boolean | Date;
    } | number | string;
}
export interface CsvPersonnelFile {
    "User ID": string;
    "Employee number": string;
    [propName: string]: string;
}
//# sourceMappingURL=personnel-file.d.ts.map