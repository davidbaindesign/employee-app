import Vue from 'vue';


export const EmployeeTable = Vue.component('employee-table', {
        props: ['employees'],
        methods: {
          updateState: function (value) {
            this.$emit('clicked', true);
          }
        },
        template: `
        <div>
          <h1>Employees</h1>
          <button v-on:click="updateState">Add Employee</button>
            <table>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Date Of Hire</th>
              <th>Birthday</th>
            </tr>
            <tr v-for="(employee, x) in employees" :key="x">
              <td>{{employee.FirstName + " " + employee.LastName}}</td>
              <td>{{employee.Department}}</td>
              <td>{{employee.DateOfHire}}</td>
              <td>{{employee.Birthday}}</td>
            </tr>
          </table> 
        </div>
        `
    });