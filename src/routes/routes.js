import Vue from 'vue'
import VueRouter from 'vue-router'

import Msite from '../pages/msite/Msite.vue'
import Order from '../pages/oder/Order.vue'
import Profile from '../pages/profile/Profile.vue'
import Search from '../pages/search/Search.vue'
import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'
// 在其中新添加一个登录页面的路由
// 在每个路由信息对象中，添加一个识别信息
const routes = [
  {
    path: '/msite',
    component: Msite,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/order',
    component: Order,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/search',
    component: Search,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      showFooter: false
    }
  },
  { path: '/', redirect: '/msite' },
  {
    path: '/shop',
    component: Shop,
    children: [
      { path: 'goods', component: ShopGoods },
      { path: 'ratings', component: ShopRatings },
      { path: 'info', component: ShopInfo },
      { path: '', redirect: '/shop/goods' }
    ]
  }
]

const router = new VueRouter({ routes })

export default router
Vue.use(VueRouter)
