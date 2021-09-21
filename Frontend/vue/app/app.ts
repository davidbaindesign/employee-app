import Vue from 'vue';
import { EmployeeTable } from './components/EmployeeTable';
import { EmployeeCreate } from './components/EmployeeCreate';
import { EmployeeDelete } from './components/EmployeeDelete';


new Vue({ 
  el: '#mount' ,
  data: {
    employeeData: [],
    createEmployee: false
  },
  components: {
    EmployeeTable,
    EmployeeCreate,
    EmployeeDelete
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
    <employee-table v-if="!createEmployee" v-on:clicked="createEmployee = true" v-on:deleted="getEmployeeData()" v-bind:employees="employeeData"/>
    <employee-create v-if="createEmployee" v-on:clicked="getEmployeeData();" />
  </div>
  `
})





