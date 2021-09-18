import Vue from 'vue';

const getEmployeesForUser = () => {
  fetch("http://localhost:5000/api/department")
    .then(response => response.json())
    .then(data => {
        console.log(data);
    //this.json = data.data[0].DepartmentName.toString();
    return data;
  });
}

Vue.component('employee-table', {
    data() {
      return {
        json: ""
      }
    },
    created() {
     getEmployeesForUser();
    },
    template: `
      <div>
        {{ json }}
      </div>
      `
});

new Vue({ el: '#mount' })



