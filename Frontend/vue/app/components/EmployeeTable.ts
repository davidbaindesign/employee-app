import Vue from 'vue';


export const EmployeeTable = Vue.component('employee-table', {
        props: ['employees'],
        template: `
        <div>
          <h1>Employees</h1>
            <ul>
              <li v-for="(employee, x) in employees" :key="x">
              <h3>{{employee.FirstName + " " + employee.LastName}}</h3>
              </li>
            </ul>
        </div>
        `
    });
