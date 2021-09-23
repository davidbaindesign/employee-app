import { Department } from '@app/helpers/Models';
import Vue from 'vue';
import { DEPARTMENT_API } from '../api';
import { fetchApi } from '../helpers/ApiFunctions';

export const DepartmentCreate = Vue.component('department-create', {
        data: function() {
            return {
                departmentName: null,
                errors: new Array<string>()
            }
        },
        methods: {
          addDepartment: async function () {  
            this.errors = [];
            if (this.departmentName === null) {
              this.errors.push("Department name required.");
            }
            else {
                //make sure the name has not already been created
               let departments = await fetchApi<Department[]>(DEPARTMENT_API); 
               departments.forEach(element => {
                   if (element.DepartmentName === this.departmentName) {
                       this.errors.push("That department name has already been created.");
                   }
               });
            }
            
            if (!this.errors.length) {

              fetch(DEPARTMENT_API, {
                  method: 'POST',
                  headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                  body: JSON.stringify({
                      DeparmentName: this.departmentName
                  })
              })
              .then(res=>res.json())
              .then((result)=>{
                  alert(result);
                  this.$store.commit("toggle");
              },
              (error)=>{
                  console.log(error);
                  alert('Failed' + error);
              })
            }
          }
        },
        template: `
        <div>
          <h1>Create Department</h1>
          <p v-if="errors.length">
            <b>Yikes something went wrong:</b>
            <ul>
              <li v-for="error in errors">{{ error }}</li>
            </ul>
          </p>
          <form v-on:submit.prevent="addDepartment()">
          <label for="dname">Department name:</label><br>
          <input  v-model="departmentName" type="text" id="dname" name="dname"><br>
          <button type="submit">Add</button>
          <button v-on:click="$store.commit('toggle');">Cancel</button>
          </form>
        </div>
        `
    });

