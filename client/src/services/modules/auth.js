import api from '../api'
export default {
  login(user) {
    return api.post('auth/sign-in', user)
  },
  loginWithFacebook() {

  },
  loginWithGoogle(token) {
    return api.post('auth/google', { access_token: token })
  },
  register(user) {
    return api.post('auth/sign-up', user)
  },
  changePassword(password) {
    return api.post('auth/change-password', password)
  },
  secret() {
    return api.get('auth/secret')
  }
}