class Api {
  post (url, data) {
    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest()

      xhr.open('POST', url, true)

      xhr.withCredentials = true

      xhr.setRequestHeader('Accept', 'application/json')
      xhr.setRequestHeader('Content-type', 'application/json')

      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve({
            data: xhr.response
          })
        } else {
          reject(new Error(xhr.statusText))
        }
      }

      xhr.onerror = function () {
        reject(new Error(xhr.statusText))
      }

      xhr.send(JSON.stringify(data))
    })
  }
}

export default new Api()
