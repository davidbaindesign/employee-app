import Vue from 'vue';

import Dexie from 'dexie';

//todo: store employees with indexedDB, test running without server
var db = new Dexie('localEmployeeDB');


export const EmployeeTable = Vue.component('employee-table', {
        props: ['employees'],
        methods: {
          updateState: function (value) {
            this.$emit('clicked', true);
          }
        },
        template: `
        <div>
        <div class="header">
            <h2 class="title">Employees</h2>
            <button v-on:click="updateState">Create Employee +</button>
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
