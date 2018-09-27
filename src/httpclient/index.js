import HttpError from './HttpError'

class HttpClient {
  constructor (defaultHeaders = {}) {
    defaultHeaders = defaultHeaders || {}
    this.defaultHeaders = defaultHeaders
  }

  get (url, headers) {
    return this.xhr('GET', url, headers)
  }

  options (url, headers) {
    return this.xhr('OPTIONS', url, headers)
  }

  post (url, content, headers) {
    return this.xhr('POST', url, headers, content)
  }

  xhr (method, url, headers, content) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest()

      xhr.open(method, url, true)

      xhr.withCredentials = true

      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

      headers = headers || this.defaultHeaders

      if (headers) {
        for (let prop in headers) {
          console.log(prop, headers)
          xhr.setRequestHeader(prop, headers[prop])
        }
      }

      xhr.send(content)

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response || xhr.responseText)
        } else {
          reject(new HttpError(xhr.statusText, xhr.status))
        }
      }

      xhr.onerror = () => {
        reject(new HttpError(xhr.statusText, xhr.status))
      }
    })
  }
}
export default HttpClient
