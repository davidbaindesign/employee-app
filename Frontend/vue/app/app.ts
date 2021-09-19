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
  methods: {
    getEmployeeData() {
      //not creating employee, getting data, make sure we display the right component
      this.createEmployee = false;
      fetch("http://localhost:4105/api/employee")
      .then(response => response.json())
      .then(data => {
      this.employeeData = data;
    });
    }
  },
  created() {
    this.getEmployeeData();
  },
  template: `
  <div>
    <h1>{{createEmployee}}</h1>
    <employee-table v-if="!createEmployee" v-on:clicked="createEmployee = true" v-bind:employees="employeeData"/>
    <employee-create v-if="createEmployee" v-on:clicked="getEmployeeData();" />
  </div>
  `
})





