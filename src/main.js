import Vue from 'vue'
import App from './App.vue'
import router from "./router/router";
import store from './store';
// import '@/plugins/axios'
import axios from 'axios';

Vue.config.productionTip = false
Vue.prototype.$http = axios;

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
