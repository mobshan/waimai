import Vue from "vue";
import VueRouter from "vue-router";

import Msite from "../pages/msite/Msite.vue";
import Order from "../pages/oder/Order.vue";
import Profile from "../pages/profile/Profile.vue";
import Search from "../pages/search/Search.vue";

const routes = [
  { path: "/msite", component: Msite },
  { path: "/order", component: Order },
  { path: "/profile", component: Profile },
  { path: "/search", component: Search },
  { path: "/", redirect: "/msite" }
];

const router = new VueRouter({ routes });

export default router;
Vue.use(VueRouter);
