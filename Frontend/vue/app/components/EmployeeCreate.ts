import Vue from 'vue';



export const EmployeeCreate = Vue.component('employee-create', {
        data: function() {
            return {
                firstName: "Dale",
                lastName: "Davis",
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
                console.log(result);
                alert(result);
                this.$emit('clicked', true);
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
          <form>
          <label for="fname">First name:</label><br>
          <input type="text" id="fname" name="fname"><br>
          <label for="lname">Last name:</label><br>
          <input type="text" id="lname" name="lname"><br><br>
          <button v-on:click.stop.prevent="addEmployee()">Submit Updated 2</button>
          </form>
        </div>
        `
    });
