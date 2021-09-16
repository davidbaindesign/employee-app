import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

fetch("http://localhost:5000/api/department")
.then(response => response.json())
.then(data => {console.log(data)
});



new Vue({
  render: h => h(App),
}).$mount('#app')
