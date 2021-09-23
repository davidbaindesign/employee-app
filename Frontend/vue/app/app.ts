import Vue from 'vue';
import Vuex from 'vuex'
import { EMPLOYEE_API } from './api';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    refresh: false
  },
  mutations: {
    toggle(state) {
      state.refresh = !state.refresh
    }
  },
  getters: {
    getR: state => () => state.refresh
  }
})

import { EmployeeTable } from './components/EmployeeTable';
import { EmployeeCreate } from './components/EmployeeCreate';
import { EmployeeDelete } from './components/EmployeeDelete';
import { DepartmentDropdown } from './components/DepartmentDropdown'

new Vue({ 
  el: '#mount' ,
  data: {
    employeeData: [],
    createEmployee: false
  },
  store: store,
  components: {
    EmployeeTable,
    EmployeeCreate,
    EmployeeDelete,
    DepartmentDropdown
  },
  methods: {
    getEmployeeData() {
      //not creating employee, getting data, make sure we display the right component
      this.createEmployee = false;
      fetch(EMPLOYEE_API)
      .then(response => response.json())
      .then(data => {
      this.employeeData = data;
      });
    }
  },
  created() {
    this.getEmployeeData();
    this.$store.watch(this.$store.getters.getR, n => {
      if (n) {
        //refresh if true, then set back to false and do nothing
        this.getEmployeeData();
        store.commit("toggle");
      }
    })
  },
  template: `
  <div>
    <employee-table v-if="!createEmployee" v-on:clicked="createEmployee = true" v-bind:employees="employeeData"/>
    <employee-create v-if="createEmployee" />
  </div>
  `
})





