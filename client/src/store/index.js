import Vue from 'vue'
import Vuex from 'vuex'
import auth from '../services/modules/auth'
import boardService from '../services/modules/board'
import createPersistedState from 'vuex-persistedstate'
import service from '../services'
Vue.use(Vuex)

const getDefaultState = () => ({
  user: null,
  token: null,
  listBoard: null,
  board: null,
})
export const store = new Vuex.Store({
  state: getDefaultState(),
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setAuth(state, auth) {
      console.log(auth);
      state.user = { ...auth }
    },
    clearToken(state) {
      Object.assign(state, getDefaultState())
    },
    setListBoard(state, listBoard) {
      state.listBoard = listBoard
    },
    addNewBoard(state, board) {
      let list = state.listBoard || [];
      list.push(board)
      state.listBoard = list;
    },
    setBoard(state, board) {
      state.board = { ...board }
    },
    addNewDeck(state, deck) {
      state.board.decks = state.board.decks || [];
      state.board.decks.push({ ...deck })
    },


  },
  actions: {
    login({ commit, dispatch }, params) {
      return new Promise((resolve, reject) => {
        var result = null
        if (params.isLogin) {
          result = auth.login({
            email: params.email,
            password: params.password
          })
        }
        else {
          result = auth.register({
            email: params.email,
            password: params.password,
            sex: params.sex,
            avatar: params.avatar,
            name: params.name
          })
        }

        result.then((response) => {
          if (response) {
            if (response.headers) {
              if (response.headers.authorization) {
                dispatch('setToken', response.headers.authorization)
                auth.secret().then(val => {
                  if (val) {
                    commit('setAuth', val.data)
                  }
                  resolve({
                    success: true
                  })
                })

              }
            }
          }
        }).catch(error => {
          reject({
            message: error.data
          })
        })

      })
    },

    /*   loginWithGmail({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
          services.accountService.loginWithGmail().then(response => {
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
     
      }, */
    setToken({ commit }, token) {
      let expToken = new Date().setDate(new Date().getDate() + 2)
      Vue.$cookies.set('token', token, expToken)
      commit('setToken', token);

    },
    getCookie({ commit }) {
      const token = Vue.$cookies.get('token')
      if (!token)
        commit('clearToken')

    },
    userLoggout({ commit }) {
      Vue.$cookies.remove('token')
      commit('clearToken')
    },
    //User
    updateUser({ commit }, user) {
      return new Promise((resolve, reject) => {
        service.userService.updateUser(user).then(result => {
          if (result.status == 200) {
            commit('setAuth', user)
            resolve({
              success: true
            })
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    //Board
    async getAllBoard({ commit }) {
      await boardService.getAllBoard().then(result => {
        if (result) {
          if (result.data) {
            if (result.data.boards) {
              commit('setListBoard', result.data.boards)
            }
          }
        }
      })
    },
    async getBoard({ commit }, id) {
      await boardService.getBoard(id).then(result => {
        if (result.status == 200) {
          let board = result.data.board
          commit('setBoard', board)
        }
      })
    },

  },
  plugins: [createPersistedState()]
})