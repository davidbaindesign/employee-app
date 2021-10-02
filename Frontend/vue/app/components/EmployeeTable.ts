import Vue from 'vue';
import Dexie from 'dexie';

//todo: store employees with indexedDB, test running without server
var db = new Dexie('localEmployeeDB');
db.version(1).stores({
  employees: 'EmployeeId,FirstName,LastName,Department,DateOfHire,Birthday,ProfilePhoto,ProfileDescription'
});


export const EmployeeTable = Vue.component('employee-table', {
        methods: {
          getEmployeeData() {
            this.$store.commit("refresh");
          }
        },
        created() {
          this.getEmployeeData();
        },
        computed: {
          employees() {
            return this.$store.state.employees
          }
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
            <tr v-for="(employee, x) in employees" :key="x">
              <td><div><span class="buttonCell">{{employee.FirstName + " " + employee.LastName}}</span> <employee-delete v-bind:id="employee.EmployeeId"/></div></td>
              <td><span>{{employee.Department}}</span></td>
              <td><span>{{employee.DateOfHire}}</span></td>
              <td><span>{{employee.Birthday}}</span></td>
            </tr>
          </table> 
        </div>
        `
    });
