import api from '../api'

export default {
  updateUser(user) {
    return api.post('user/updated', user)
  }
}