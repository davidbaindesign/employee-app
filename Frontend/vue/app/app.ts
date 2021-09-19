import Vue from 'vue';
import { EmployeeTable } from './components/EmployeeTable';

//https://stackoverflow.com/questions/40915436/vuejs-update-parent-data-from-child-component


new Vue({ 
  el: '#mount' ,
  data: {
    employeeData: [],
    createEmployee: false
  },
  components: {
    EmployeeTable
  },
  created() {
    fetch("http://localhost:5000/api/employee")
    .then(response => response.json())
    .then(data => {
     this.employeeData = data;
    });
  },
  template: `
  <div>
    <h1>{{createEmployee}}</h1>
    <employee-table v-on:clicked="createEmployee = true" v-bind:employees="employeeData"/>
  </div>
  `
})



