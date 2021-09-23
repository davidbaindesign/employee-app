import Vue from 'vue';
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
          getDepartments: function () {  
            fetch(DEPARTMENT_API)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                data.forEach(element => {
                    this.departments.push(element.DepartmentName);
                });
                //set the value initally with the one that is showing
                this.$emit('send-value', this.departments[0]);
            })
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



