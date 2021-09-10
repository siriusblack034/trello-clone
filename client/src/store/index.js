import Vue from 'vue'
import Vuex from 'vuex'
import services from '../services'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const getDefaultState = () => ({
  user: null,
  listBoard: null,
  board: null,
})
export const store = new Vuex.Store({
  state: getDefaultState(),
  mutations: {
    setAuth(state, auth) {
      state.user = {
        email: auth.email,
        token: auth.idToken,
        idUser: auth.localId,
        isLogin: auth.idToken ? true : false,
        name: auth.displayName,
        image: auth.photoURL
      }
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
      state.board = board
    },
    addNewTask(state, task) {
      let list = state.board.listTask || [];
      list.push(task)
      state.board.listTask = list
    },


  },
  actions: {
    login({ dispatch }, params) {
      return new Promise((resolve, reject) => {
        services.accountService.authenticate({
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

    },
    setToken({ commit }, user) {
      let expToken = new Date().getTime() + user.expiresIn * 1000;
      Vue.$cookies.set('token', user.idToken, expToken)
      Vue.$cookies.set('email', user.email, expToken)
      Vue.$cookies.set('idUser', user.localId, expToken)
      Vue.$cookies.set('displayName ', user.displayName, expToken)
      Vue.$cookies.set('photoURL', user.photoURL, expToken)

      commit('setAuth', user);

    },

    getCookie({ commit }) {
      console.log('check cookie');
      const token = Vue.$cookies.get('token')
      const email = Vue.$cookies.get('email')
      const idUser = Vue.$cookies.get('idUser')
      const displayName = Vue.$cookies.get('displayName')
      const photoURL = Vue.$cookies.get('photoURL')

      if (!token)
        commit('clearToken')
      commit('setAuth', { idToken: token, email: email, localId: idUser, displayName, photoURL })
    },
    userLoggout({ commit }) {
      Vue.$cookies.remove('token')
      Vue.$cookies.remove('email')
      Vue.$cookies.remove('idUser')
      Vue.$cookies.remove('displayName')
      Vue.$cookies.remove('photoURL')
      commit('clearToken')
    },
    async getAllBoard({ commit }) {
      let list = await services.boardService.getAllBoard()
      commit('setListBoard', list)
    },
    async getBoard({ commit }, id) {
      let board = await services.boardService.getBoard(id);
      let listIdTask = board.listTask
      console.log(listIdTask);
      /*  for (id in listIdTask) {
         let task =  services.taskManagement.getAllTask(id)
         listTask.push(task)
       } */
      commit('setBoard', board)
    },


    // Task
    async addNewTask({ commit }, task) {
      await services.taskManagement.addNewTask(task)
      commit('addNewTask', task)
    },

  },
  plugins: [createPersistedState()]
})