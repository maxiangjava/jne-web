import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from "./router/index"
import api from './network/api'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import format from "@/utils/format";

import DATA from './views/data'
Vue.prototype.$dataTest = DATA
Vue.prototype.$api = api
Vue.prototype.$format = format
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

