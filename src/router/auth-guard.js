import store from '../store/index.js'

export default function (to, from, next) {
  if (store.getters.user) {
    console.log(store.getters.user)
    next()
  } else {
    // console.log(store.getters.user)
    next('/login?loginError=true')
  }
}