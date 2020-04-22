import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'

Vue.config.productionTip = false

const components = require('./components');
for (let key in components) {
  Vue.component(key, components[key]);
}

const featherIcons = require('vue-feather-icons');
Object.keys(featherIcons).forEach((key) => {
  const icon = featherIcons[key];
  Vue.component(key, icon);
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
