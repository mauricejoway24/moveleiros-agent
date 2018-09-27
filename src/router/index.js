import Vue from 'vue'
import Router from 'vue-router'
import LayoutAgent from '@/components/agentchat/_Layout'
import Login from '@/components/auth/Login'
import auth from '@/auth'
import { default as store, SET_CURRENT_STORE, JOIN_NEW_CHANNEL } from '@/store'
import persistence from '@/persistence'

Vue.use(Router)

const routes = new Router({
  routes: [
    {
      path: '/agent',
      name: 'Agent',
      component: LayoutAgent
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

routes.beforeEach((to, from, next) => {
  if (persistence.getVersion() !== '1.0.1') {
    persistence.setVersion('1.0.1')
    auth.logout()
      .then(_ => {
        next({ path: '/login' })
      })
    return
  }

  if (to.path === '/newchat') {
    store.commit(JOIN_NEW_CHANNEL, to.query.channelId)
    return next({ path: '/agent' })
  }

  let query = {
    storeId: to.query.storeId || from.query.storeId,
    relogin: to.query.relogin
  }

  let isAgent = auth.isAgent()

  if (query.storeId) {
    store.commit(SET_CURRENT_STORE, query.storeId)
  }

  if (to.path === '/agent' && !isAgent) {
    return next({ path: '/livechat' })
  }

  if (!auth.userAuthenticated()) {
    if (to.path === '/login') {
      return next()
    } else {
      return next({ path: '/login' })
    }
  }

  if (to.path === '/agent') {
    return next()
  } else {
    return next({ path: '/agent' })
  }
})

export default routes
