import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'Entrance',
    component: () => import(/* webpackChunkName: "entrance" */ '../views/index.vue'),
    meta: {
      keepAlive: false,
      title: '首页'
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
