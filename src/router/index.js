import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect:'register-patient'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/register-doctor',
    name: 'register-doctor',
    component: Register
  },
  {
    path: '/register-patient',
    name: 'register-patient',
    component: Register
  },
  {
    path: '/login-doctor',
    name: 'login-doctor',
    component: Login
  },
  {
    path: '/login-patient',
    name: 'login-patient',
    component: Login
  },
  // {
    // path: '/login',
    // name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
