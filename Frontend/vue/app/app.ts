import Vue from 'vue';
import Vuex from 'vuex';
import {fetchApi} from './helpers/ApiFunctions';
import {Employee} from './helpers/Models';
import {EMPLOYEE_API} from './api';
import VueRouter from 'vue-router';
import { EmployeeTable } from './components/EmployeeTable';
import { EmployeeCreate } from './components/EmployeeCreate';
import { EmployeeDelete } from './components/EmployeeDelete';
import { DepartmentDropdown } from './components/DepartmentDropdown';
import {DepartmentCreate} from './components/DepartmentCreate'

Vue.use(VueRouter)



// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: EmployeeTable },
  { path: '/employee', component: EmployeeCreate },
  { path: '/department', component: DepartmentCreate }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
})

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



new Vue({ 
  el: '#mount' ,
  data: {
    employeeData: new Array<Employee>(),
    createEmployee: false
  },
  store: store,
  router,
  components: {
    EmployeeTable,
    EmployeeCreate,
    EmployeeDelete,
    DepartmentDropdown
  },
  methods: {
    async getEmployeeData() {
      //not creating employee, getting data, make sure we display the right component
      this.createEmployee = false;
      this.employeeData = await fetchApi<Employee[]>(EMPLOYEE_API);
    }
  },
  created() {
    this.getEmployeeData();
    this.$store.watch(this.$store.getters.getR, n => {
      if (n) {
        //refresh if true, then set back to false and do 
        console.log("Toggled!!");
        this.getEmployeeData();
        store.commit("toggle");
      }
    })
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





