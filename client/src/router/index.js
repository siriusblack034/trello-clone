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
import User from '../views/User'
import ChangePassword from '../views/ChangePassword'
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
    path: '/change-password',
    name: 'ChangePassword',
    component: ChangePassword,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/logged-out',
    name: 'LoggedOut',
    component: LoggedOut,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/board/:boardId',
    name: 'Board',
    component: Board,
    meta: {
      requiresAuth: true,
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
    path: '/user',
    name: 'User',
    component: User,
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
const DEFAULT_TITLE = "Trà Lô"
router.beforeEach((to, from, next) => {
  const isLogin = !store.state.token ? false : true
  document.title = DEFAULT_TITLE
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
