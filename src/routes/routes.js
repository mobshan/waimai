import Vue from "vue";
import VueRouter from "vue-router";

import Msite from "../pages/msite/Msite.vue";
import Oder from "../pages/oder/Oder.vue";
import Profile from "../pages/profile/Profile.vue";
import Search from "../pages/search/Search.vue";

const routes = [
  { path: "/msite", component: Msite },
  { path: "/oder", component: Oder },
  { path: "/profile", component: Profile },
  { path: "/search", component: Search }
];

const router = new VueRouter({ routes });

export default router;
Vue.use(VueRouter);
