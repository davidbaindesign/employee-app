export interface Employee {
    EmployeeId: string;
    FirstName: string;
    LastName: string;
    Department: string;
    DateOfHire: Date;
    Birthday: Date;
    ProfilePhoto: string;
    ProfileDescription: string;
}

export interface Department {
    DepartmentId: string;
    DepartmentName: string;
}