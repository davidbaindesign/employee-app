import Vue from 'vue';
import { EmployeeTable } from './components/EmployeeTable';
import { EmployeeCreate } from './components/EmployeeCreate';


new Vue({ 
  el: '#mount' ,
  data: {
    employeeData: [],
    createEmployee: false
  },
  components: {
    EmployeeTable,
    EmployeeCreate
  },
  created() {
    
    fetch("http://localhost:4105/api/employee")
    .then(response => response.json())
    .then(data => {
     this.employeeData = data;
    });
    
  },
  template: `
  <div>
    <h1>{{createEmployee}}</h1>
    <employee-table v-if="!createEmployee" v-on:clicked="createEmployee = true" v-bind:employees="employeeData"/>
    <employee-create v-if="createEmployee" v-on:clicked="createEmployee = false" />
  </div>
  `
})





