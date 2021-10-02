import Vue from 'vue';
import Vuex from 'vuex';
import {Employee} from './helpers/Models';
import VueRouter from 'vue-router';
import { EmployeeTable } from './components/EmployeeTable';
import { EmployeeCreate } from './components/EmployeeCreate';
import { EmployeeDelete } from './components/EmployeeDelete';
import { DepartmentDropdown } from './components/DepartmentDropdown';
import {DepartmentCreate} from './components/DepartmentCreate';
import {fetchApi} from './helpers/ApiFunctions';
import {EMPLOYEE_API} from './api';

Vue.use(VueRouter)

const routes = [
  { path: '/', component: EmployeeTable },
  { path: '/employee', component: EmployeeCreate },
  { path: '/department', component: DepartmentCreate }
]

//export to use programatically with children
export const router = new VueRouter({
  routes // short for `routes: routes`
})

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    employees: new Array<Employee>()
  },
  mutations: {
    async refresh(state) {
      console.log("refresh called");
      state.employees = await fetchApi<Employee[]>(EMPLOYEE_API);
    }
  }
})

new Vue({ 
  el: '#mount' ,
  store: store,
  router,
  components: {
    EmployeeTable,
    EmployeeCreate,
    EmployeeDelete,
    DepartmentDropdown
  },
  template: `
  <div>
    <p>
      <router-link to="/">Home</router-link>
      <router-link to="/employee">Create Employee</router-link>
      <router-link to="/department">Create Department</router-link>
    </p>
    <router-view></router-view>
  </div>
  `
})





