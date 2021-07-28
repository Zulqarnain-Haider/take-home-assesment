import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
// import Home from '../components/Home-back.vue';
import Home from '../components/Home';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;