import Vue from 'vue'

let instance = null
const currentStore = 'currentStoreWebAgent'
const currentVersion = 'currentVersionWebAgent'

class Persistence {
  contructor () {
    if (!instance) instance = this
    else return instance
  }

  getCurrentStore () {
    let store = Vue.localStorage.get(currentStore, '1')

    return parseInt(store)
  }

  getVersion () {
    let version = Vue.localStorage.get(currentVersion, '')

    return version
  }

  setVersion (version) {
    Vue.localStorage.set(currentVersion, version)
  }

  setCurrentStore (storeId) {
    if (Number.isNaN(storeId)) return

    Vue.localStorage.set(currentStore, storeId)
  }

  set (reg, value) {
    Vue.localStorage.set(reg, value)
  }

  get (reg, def) {
    let result = Vue.localStorage.get(reg)
    return result === 'undefined' ? def : result
  }

  remove (req) {
    Vue.localStorage.remove(req)
  }
}

export default new Persistence()
