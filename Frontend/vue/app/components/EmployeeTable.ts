import Vue from 'vue';
import {fetchApi} from '../helpers/ApiFunctions';
import Dexie from 'dexie';
import {Employee} from '../helpers/Models';
import {EMPLOYEE_API} from '../api';

//todo: store employees with indexedDB, test running without server
var db = new Dexie('localEmployeeDB');
db.version(1).stores({
  employees: 'EmployeeId,FirstName,LastName,Department,DateOfHire,Birthday,ProfilePhoto,ProfileDescription'
});


export const EmployeeTable = Vue.component('employee-table', {
        data: function() {
          return {
            employeeData: new Array<Employee>(),
          }
        },
        methods: {
          async getEmployeeData() {
            this.employeeData = await fetchApi<Employee[]>(EMPLOYEE_API);

            //going to take longer than I thought with typescript
            /*
            db.employees.bulkPut(this.employeeData).then(result => {
              alert ("Successfully stored the array");
            }).catch(error => {
              alert ("Error: " + error);
            });
            */
           
      

          }
        },
        created() {
          this.getEmployeeData();
          this.$store.watch(this.$store.getters.getR, n => {
            if (n) {
              //refresh if true, then set back to false and do 
              console.log("Toggled!!");
              this.getEmployeeData();
              this.$store.commit("toggle");
            }
          })
        },
        template: `
        <div>
        <div class="header">
            <h2 class="title">Employees</h2>
          </div>
            <table>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Date Of Hire</th>
              <th>Birthday</th>
            </tr>
            <tr v-for="(employee, x) in employeeData" :key="x">
              <td><div><span class="buttonCell">{{employee.FirstName + " " + employee.LastName}}</span> <employee-delete v-bind:id="employee.EmployeeId"/></div></td>
              <td><span>{{employee.Department}}</span></td>
              <td><span>{{employee.DateOfHire}}</span></td>
              <td><span>{{employee.Birthday}}</span></td>
            </tr>
          </table> 
        </div>
        `
    });
