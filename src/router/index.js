import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '@/views/Home'
import test1 from "@/views/test1";
import test2 from "@/views/test2";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: '导航一',
    component: Home,
    children: [
      {
        path: '/test1',
        name: 'test1',
        component: test1
      },
      {
        path: '/test2',
        name: 'test2',
        component: test2
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
