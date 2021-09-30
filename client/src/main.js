import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import { store } from './store'
import 'aos/dist/aos.css'
import AOS from 'aos'
import VueCookies from 'vue-cookies'
import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import VueSweetAlert from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';
import GAuth from 'vue-google-oauth2'
Vue.config.productionTip = false
Vue.use(VueLoading, {
  color: 'blue',
  canCancel: false,
})
Vue.use(VueSweetAlert)
Vue.use(VueCookies)

const gauthOption = {
  clientId: process.env.VUE_APP_GOOGLE_ID,
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)


Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = (event) => {
      if (!(el == event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: (el) => {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
})
new Vue({
  created() {
    AOS.init()

  },
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
