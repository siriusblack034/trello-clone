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

Vue.config.productionTip = false
Vue.use(VueLoading, {
  color: 'blue',
  canCancel: false,
})
Vue.use(VueCookies)


new Vue({
  created() {
    AOS.init()

  },
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
