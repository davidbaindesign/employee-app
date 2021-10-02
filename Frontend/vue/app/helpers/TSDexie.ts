import Dexie from 'dexie';
import { Employee } from './Models';

export class TSDexie extends Dexie {
    // Declare implicit table properties.
    // (just to inform Typescript. Instanciated by Dexie in stores() method)
    employees: Dexie.Table<Employee, number>; // number = type of the primkey
    //...other tables goes here...

    constructor () {
        super("MyAppDatabase");
        this.version(1).stores({
            employees: '++id, FirstName, LastName, Department, DateOfHire, Birthday, ProfilePhoto, ProfileDescription',
            //...other tables goes here...
        });
        // The following line is needed if your typescript
        // is compiled using babel instead of tsc:
        this.employees = this.table("employees");
    }
}


