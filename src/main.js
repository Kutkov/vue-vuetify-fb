import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import * as firebase from 'firebase'
import BuyModalComponent from '@/components/Shared/BuyModal'
import 'vuetify/dist/vuetify.min.css'


// Helpers
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.cyan.lighten1
  }
})
Vue.component('app-buy-modal', BuyModalComponent)
Vue.config.productionTip = false

/* eslint-disable */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  created() {
    var config = {
      apiKey: 'AIzaSyAOmsu9MDkGAlXnpJV9sgy20Yqfvrq19yc',
      authDomain: 'wfms-ads.firebaseapp.com',
      databaseURL: 'https://wfms-ads.firebaseio.com',
      projectId: 'wfms-ads',
      storageBucket: 'wfms-ads.appspot.com',
      messagingSenderId: '515803892061'
    }
    firebase.initializeApp(config)

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  }
})
