import store from '../store'
export const PERMISSION_NOT_GRANTED = 'PERMISSION_NOT_GRANTED'
export const PERMISSION_GRANTED = 'PERMISSION_GRANTED'

let notificationInstance = null

export default class NotificationHandler {
  constructor () {
    if (!notificationInstance) notificationInstance = this
    else return notificationInstance

    this.getPermission()
  }

  getPermission () {
    if (!window.Notification) {
      console.error('Notification not supported')
      store.commit(PERMISSION_NOT_GRANTED)
      return
    }

    if (Notification.permission === 'granted') {
      store.commit(PERMISSION_GRANTED)
    } else {
      Notification.requestPermission()
        .then(result => {
          if (result === 'denied' || result === 'default') {
            store.commit(PERMISSION_NOT_GRANTED)
          } else {
            store.commit(PERMISSION_GRANTED)
          }
        })
    }
  }

  showNotification (title, options, onClickEvent, sound) {
    if (!options.ignoreSound) new Audio(`/static/audio/${sound || 'new_call'}.mp3`).play()

    let n = new Notification(title, options)

    n.onclick = (e) => {
      debugger
      if (onClickEvent != null) {
        onClickEvent(options)
      }
    }
  }
}
