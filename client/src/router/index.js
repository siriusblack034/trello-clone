import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Logup from '../views/Logup.vue'
import Board from '../views/Board.vue'
import LoggedOut from '../views/LoggedOut.vue'
import ForgotPassword from '../views/ForgotPassword'
import HomeBoards from '../views/HomeBoards'
import ErrorPage from '../views/ErrorPage'

import { store } from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: false,
    }

  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false
    }

  }, {
    path: '/logup',
    name: 'Logup',
    component: Logup,
    meta: {
      requiresAuth: false,
    }

  },
  {
    path: '/forgot-password',
    name: 'Forgot Password',
    component: ForgotPassword,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/logged-out',
    name: 'LoggedOut',
    component: LoggedOut


  },
  {
    path: '/board/:boardId',
    name: 'Board',
    component: Board,
    meta: {
      requiresAuth: true
    }

  },
  {
    path: '/home-boards',
    name: 'HomeBoards',
    component: HomeBoards,
    meta: {
      requiresAuth: true
    }
  },



  {
    path: '*',
    name: 'ErrorPage',
    component: ErrorPage,
    meta: {
      guest: true,
    }
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const isLogin = !store.state.user ? false : store.state.user.isLogin
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isLogin) {
      next()
      return
    }
    next('/login')
  }
  else if (to.matched.some(record => record.meta.guest)) {
    next()
  }
  else {
    if (!isLogin) {
      next()
      return
    }
    next('/home-boards')
  }
})
export default router
