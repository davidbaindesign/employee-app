import Vue from 'vue';



export const EmployeeCreate = Vue.component('employee-create', {
        data: function() {
            return {
                firstName: "",
                lastName: "",
                //todo: get from department table, create dropdown
                department: "Product",
                //todo: date object validation
                dateOfHire: new Date().toISOString(),
                birthday:  new Date().toISOString(),
                //todo: make option for clicking on employee and show profile and description
                profilePhoto: "Hello, this is my profile",
                profileDescription: "mypicture.png"
            }
        },
        methods: {
          addEmployee: function () {            
            fetch("http://localhost:4105/api/employee", {
                method: 'POST',
                headers: {
                  'Accept':'application/json',
                  'Content-Type':'application/json'
              },
                body: JSON.stringify({
                    FirstName: this.firstName,
                    LastName: this.lastName,
                    Department: this.department,
                    DateOfHire: new Date().toISOString(),
                    Birthday: new Date().toISOString(),
                    ProfilePhoto: this.profilePhoto,
                    ProfileDescription: this.profileDescription
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
        },
        template: `
        <div>
          <h1>Create Employee</h1>
          <form v-on:submit.prevent="addEmployee()">
          <label for="fname">First name:</label><br>
          <input  v-model="firstName" type="text" id="fname" name="fname"><br>
          <label for="lname">Last name:</label><br>
          <input v-model="lastName" type="text" id="lname" name="lname"><br><br>
          <button type="submit">Add</button>
          </form>
          <button v-on:click="$store.commit('toggle');">Cancel</button>
        </div>
        `
    });

