import Vue from 'vue';
import { fetchApi } from '../helpers/ApiFunctions';
import { Department } from '../helpers/Models';
import { DEPARTMENT_API } from '../api';

export const DepartmentDropdown = Vue.component('department-dropdown', {
        data: function() {
            return {
                departments: new Array<string>()
            }
        },
        methods: {
          onChange(event) {
                console.log(event.target.value)
                this.$emit('send-value', event.target.value);
          },
          getDepartments: async function () {  
            let data = await fetchApi<Department[]>(DEPARTMENT_API);

            data.forEach(element => {
                this.departments.push(element.DepartmentName);
            });
                //set the value initally with the one that is showing
            this.$emit('send-value', this.departments[0]);
            
          }    
        },
        created() {
          this.getDepartments();  
        },
        template: `
        <div>
            <label for="deparment">Choose a department:</label>
            <select v-on:change="onChange($event)" id="department" name="department">
                <option v-for="department in departments" v-bind:value="department">{{department}}</option>
            </select>
        </div>
        `,
    });



