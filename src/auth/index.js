import persistence from '@/persistence'

let instance = null
let cachedProfile = ''
const tokenKey = 'tokenWebAgent'
const usernameKey = 'usernameWebAgent'
const livechatUserIdKey = 'livechatUserIdWebAgent'

class Auth {
  contructor () {
    if (!instance) instance = this
    else return instance
  }

  getToken () {
    return persistence.get(tokenKey, '')
  }

  getProfile () {
    if (cachedProfile.length > 0) return cachedProfile

    let token = this.getToken()

    if (!token || token.length === 0) return ''

    let base64Url = token.split('.')[1]
    let base64 = base64Url.replace('-', '+').replace('_', '/')
    let parsed = JSON.parse(window.atob(base64))

    cachedProfile = parsed['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    return cachedProfile
  }

  isAgent () {
    return this.getProfile() === 'LivechatAgent'
  }

  getLivechatId () {
    return persistence.get(livechatUserIdKey, '')
  }

  getUsername () {
    return persistence.get(usernameKey, 'Atendimento')
  }

  userAuthenticated () {
    return this.getToken()
  }

  logout () {
    cachedProfile = ''

    return new Promise((resolve, reject) => {
      persistence.remove(livechatUserIdKey)
      persistence.remove(tokenKey)
      persistence.remove(usernameKey)
      resolve()
    })
  }

  setAuthData (data) {
    persistence.set(livechatUserIdKey, data.livechatUserId)
    persistence.set(tokenKey, data.token)
    persistence.set(usernameKey, data.username)
  }
}

export default new Auth()
