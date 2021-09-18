import Vue from 'vue';

import { EmployeeTable } from './components/EmployeeTable';


new Vue({ 
  el: '#mount' ,
  data: {
    employeeData: []
  },
  components: {
    EmployeeTable
  },
  created() {
    fetch("http://localhost:5000/api/employee")
    .then(response => response.json())
    .then(data => {
        console.log(data);
    //this.json = data.data[0].DepartmentName.toString();
     this.employeeData = data;
  });
  },
  template: `
    <employee-table v-bind:employees="employeeData"/>
  `


})



