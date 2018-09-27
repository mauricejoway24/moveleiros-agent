import VueNotify from './VueNotify'

export default {
  install: (Vue) => {
    Vue.notify = VueNotify
    Vue.prototype.$notify = VueNotify
  }
}
