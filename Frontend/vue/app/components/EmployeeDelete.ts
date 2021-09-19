import Vue from 'vue';

export const EmployeeDelete = Vue.component('employee-delete', {
        props: ['id'],
        methods: {
          deleteEmployee: function (value) {
            fetch("http://localhost:4105/api/employee" + '/' + this.id, {
                method: 'DELETE',
                headers:{'Accept':'application/json',
                    'Content-Type':'application/json'}
            }).then(response => this.$emit('deleted', true));
          }
        },
        template: `
        <button v-on:click="deleteEmployee()">
            Delete
        </button>
        `
    });