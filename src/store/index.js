import Vue from 'vue'
import Vuex from 'vuex'
import { accountService } from '../services/account'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: {
      email: null,
      token: null,
      idUser: null,
      avatar: null,
      name: null,
      isLogin: false,
    },

  },
  getters: {
    isAuthenticated({ state }) {
      return state.user.isLogin
    }
  },
  mutations: {
    setAuth(state, auth) {
      state.user.email = auth.email
      state.user.token = auth.idToken
      state.user.idUser = auth.localId
      state.user.isLogin = true
    },
    clearToken({ state }) {
      state.user.email = null
      state.user.token = null
      state.user.idUser = null
      state.user.isLogin = false
    }
  },
  actions: {
    login({ dispatch }, params) {
      return new Promise((resolve, reject) => {
        accountService.authenticate({
          isLogin: true,
          email: params.email,
          password: params.password
        })
          .then((response) => {
            if (response.data) {

              dispatch('setToken', response.data)
              resolve({
                success: true
              })
            }
          }).catch(error => {
            reject(error)
          })
      })
    },
    loginWithGmail({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        accountService.loginWithGmail().then(response => {
          if (response.user) {
            let data = {
              idToken: response.credential.idToken,
              expiresIn: 60 * 60,
              email: response.additionalUserInfo.profile.email,
              localId: response.additionalUserInfo.profile.id,
            }
            commit('setAuth', data)
            dispatch('setToken', data)
            resolve({
              success: true
            })

          }
        })
          .catch(error => {
            reject(error)
          })
      })

    },
    setToken({ commit }, user) {
      let expToken = new Date().getTime() + user.expiresIn * 1000;
      Vue.$cookies.set('token', user.idToken, expToken)
      Vue.$cookies.set('email', user.email, expToken)
      Vue.$cookies.set('idUser', user.localId, expToken)
      commit('setAuth', user);

    },

    getCookie({ commit }) {
      console.log('check cookie');
      const token = Vue.$cookies.get('token')
      const email = Vue.$cookies.get('email')
      const idUser = Vue.$cookies.get('idUser')
      if (!token)
        commit('clearToken')
      commit('setAuth', { idToken: token, email: email, localId: idUser })
    },
    signOut({ dispatch }) {
      accountService.signOut().then(() => {
        dispatch('userLoggout')
      })
    }
  },
  plugins: [createPersistedState({
    paths: ['user']
  })]
})