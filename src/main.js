import Vue from 'vue'
import App from './App.vue'
import router from './routes/routes'
import '../static/css/reset.css'
import store from './store/index'
Vue.config.productionTip = false
import { Button } from 'vant'
Vue.use(Button)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
