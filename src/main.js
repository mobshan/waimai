import Vue from 'vue'
import App from './App.vue'
import router from './routes/routes'
import '../static/css/reset.css'
import store from './store/index'
Vue.config.productionTip = false
import { Button } from 'vant'

// 引入VueLazyload插件
import VueLazyload from 'vue-lazyload'
// 将一张loading图片加载进来
import loading from './common/images/loading.gif'

// 引入 mock
import './mock/mockServer'
Vue.use(Button)

Vue.use(VueLazyload, {
  loading
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
