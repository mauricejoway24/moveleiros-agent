import sendSlackMessage from '@/slack'
import { SEND_NEW_PUSH_TOKEN, RECEIVE_NOTIFICATION } from '@/store'
let firebase = require('firebase')
// import auth from '@/auth'

let fireInstance = null

export const PERMISSION_NOT_GRANTED = 'PERMISSION_NOT_GRANTED'
export const PERMISSION_GRANTED = 'PERMISSION_GRANTED'

export default class FirebaseHandler {
  constructor (state) {
    if (!fireInstance) fireInstance = this
    else return fireInstance

    this.state = state || { commit: _ => {} }
    this.permissionGranted = false
    this.messaging = null
    this.currentToken = ''

    this.register()

    if (window.parent && window.parent === window.self) {
      this.requestPermission()
        .then(_ => this.getToken())
        .then(_ => this.registerCallbacks())
    }

    return fireInstance
  }

  register () {
    if (window.cordova) {
      this.messaging = {}
      this.messaging.requestPermission = _ => new Promise(resolve => { resolve() })
      this.messaging.getToken = _ => {
        return new Promise((resolve, reject) => {
          window.FCMPlugin.getToken(
            token => resolve(token),
            err => reject(err)
          )
        })
      }
      this.messaging.onMessage = callback => {
        let newCallback = callback
        window.FCMPlugin.onNotification(data => {
          newCallback({
            notification: data
          })
        }, msg => {
          console.log('success on message', msg)
        })
      }
      this.messaging.onTokenRefresh = callback => {
        window.FCMPlugin.onTokenRefresh(callback)
      }
    } else {
      firebase.initializeApp({
        apiKey: 'AIzaSyDUJRNuU70m_qyT-9moAsgZW8sMnQjUO-s',
        authDomain: 'chat-moveleiros.firebaseapp.com',
        databaseURL: 'https://chat-moveleiros.firebaseio.com',
        projectId: 'chat-moveleiros',
        storageBucket: 'chat-moveleiros.appspot.com',
        messagingSenderId: '167205043639'
      })
      this.messaging = firebase.messaging()
    }
  }

  requestPermission () {
    return this.messaging
      .requestPermission()
      .then(_ => {
        this.setPermissionState(true)
      })
      .catch(_ => {
        this.setPermissionState(false)
      })
  }

  registerCallbacks () {
    this.messaging.onMessage(p => this.onMessage(p))
    this.messaging.onTokenRefresh(_ => {
      this.getToken(true)
    })
  }

  onMessage (payload) {
    console.log(payload)
    this.state.commit(RECEIVE_NOTIFICATION, payload)
  }

  setPermissionState (isGranted) {
    if (isGranted) {
      this.state.commit(PERMISSION_GRANTED)
      this.permissionGranted = true
      return
    }

    this.state.commit(PERMISSION_NOT_GRANTED)
    this.permissionGranted = false
  }

  getToken (sendTokenToStore) {
    return this.messaging
      .getToken()
      .then(token => {
        this.currentToken = token

        if (sendTokenToStore) {
          this.state.commit(SEND_NEW_PUSH_TOKEN, this.currentToken)
        }
      })
      .catch(err => {
        sendSlackMessage(err)
      })
  }
}
