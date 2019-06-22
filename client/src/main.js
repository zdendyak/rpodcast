import Vue from 'vue'
import App from './App.vue'
import router from './router'
import apolloProvider from './vue-apollo'
import VueScrollTo from 'vue-scrollto'
// import { MdField } from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueMaterial from 'vue-material'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false
Vue.use(VueScrollTo)
// Vue.use(MdField)
Vue.use(VueMaterial)
Vue.use(Vuetify)


const userId = localStorage.getItem('userId')
new Vue({
  render: h => h(App),
  router,
  apolloProvider,
  data: {
    userId
  }
}).$mount('#app')
