import Vue from 'vue';
import { EMPLOYEE_API } from '../api';
import { router } from '../app'

export const EmployeeCreate = Vue.component('employee-create', {
        data: function() {
            return {
                firstName: null,
                lastName: null,
                department: null,
                dateOfHire: null,
                birthday:  null,
                profilePhoto: "Hello, this is my profile",
                profileDescription: "mypicture.png",
                errors: new Array<string>()
            }
        },
        methods: {
          addEmployee: function () {  
            
            this.errors = [];

            if (this.firstName === null)
              this.errors.push("First name required.");

            if (this.lastName === null)
              this.errors.push("Last name required.");

            if (this.birthday === null)
              this.errors.push("Birthday required.");

            if (this.dateOfHire === null)
              this.errors.push("Date of Hire required.");
            
            if (!this.errors.length) {

              fetch(EMPLOYEE_API, {
                  method: 'POST',
                  headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                  body: JSON.stringify({
                      FirstName: this.firstName,
                      LastName: this.lastName,
                      Department: this.department,
                      DateOfHire: this.dateOfHire,
                      Birthday: this.birthday,
                      ProfilePhoto: this.profilePhoto,
                      ProfileDescription: this.profileDescription
                  })
              })
              .then(res=>res.json())
              .then((result)=>{
                  alert(result);
                  router.push('/');
              },
              (error)=>{
                  console.log(error);
                  alert('Failed' + error);
              })
            }
          },
          childUpdateValue(value) {
            console.log("Child update value " + value);
            this.department = value;
          }
        },
        template: `
        <div>
          <h1>Create Employee</h1>
          <p v-if="errors.length">
            <b>You forgot a few things:</b>
            <ul>
              <li v-for="error in errors">{{ error }}</li>
            </ul>
          </p>
          <form v-on:submit.prevent="addEmployee()">
          <label for="fname">First name:</label><br>
          <input  v-model="firstName" type="text" id="fname" name="fname"><br>
          <label for="lname">Last name:</label><br>
          <input v-model="lastName" type="text" id="lname" name="lname"><br><br>
          <label for="DateOfHire">Date Of Hire:</label><br>
          <input type="date" name="DateOfHire" v-model="dateOfHire">
          <label for="DateOfHire">Birthday:</label><br>
          <input type="date" name="Birthday" v-model="birthday">
          <department-dropdown v-on:send-value="childUpdateValue" />
          <button type="submit">Add</button>
          <button v-on:click="$store.commit('toggle');">Cancel</button>
          </form>
        </div>
        `
    });

