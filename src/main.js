import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import { store } from './store'
import 'aos/dist/aos.css'
import AOS from 'aos'
Vue.config.productionTip = false

new Vue({
  created() {
    AOS.init()
  },
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
