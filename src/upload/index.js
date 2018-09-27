import axios from 'axios'
import config from '@config'
import auth from '@/auth'

class Uploader {
  uploadFile (file) {
    let data = new FormData()
    let token = auth.getToken()

    data.append('files', file, file.fileName)

    return axios.post(
      `${config.getConfig('BASE_HUB_URL')}files/uploadfile`,
      data, {
        headers: {
          'Content-Type': `multipart/form-data`,
          'Authorization': `Bearer ${token}`
        }
      })
  }
}

export default new Uploader()
