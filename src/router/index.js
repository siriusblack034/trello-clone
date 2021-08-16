import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',

    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }, {
    path: '/logup',
    name: 'Logup',
    component: () => import('../views/Logup.vue')
  },
  {
    path: '/forgot-password',
    name: 'Forgot Password',
    component: () => import('../views/ForgotPassword.vue')
  },
  {
    path: '/logged-out',
    name: 'LonggedOut',
    component: () => import('../views/LoggedOut.vue')
  },
  {
    path: '*',
    name: 'ErrorPage',
    component: () => import('../views/ErrorPage.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
