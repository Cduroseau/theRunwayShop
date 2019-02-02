import CryptoJS from 'crypto-js'
import { isNil, slice } from 'ramda'

/**
 * CloudinaryConfig Service
 *
 * Upload and download images
 */
class Cloudinary {
  /** Creates the only instance of Cloudinary service. */
  constructor(config) {
    this.config = config
  }

  /**
   * Loads a string from storage.
   *
   * @param key The key to fetch.
   */
  upload = async (file, folder, tags) => {
    const request = new Promise((resolve, reject) => {
      try {
        const timestamp = ((Date.now() / 1000) | 0).toString()
        const api_key = this.config.api_key // 'your api key'
        const api_secret = this.config.api_secret // 'your api secret'
        const cloud = this.config.cloud_name // 'your cloud name'
        const upload_preset = this.config.upload_preset; // your upload preset name
        const hash_string = 'timestamp=' + timestamp + api_secret
        const signature = CryptoJS.SHA1(hash_string).toString()
        const upload_url = 'https://api.cloudinary.com/v1_1/' + cloud + '/image/upload'

        const xhr = new XMLHttpRequest()
        xhr.open('POST', upload_url)
        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            const response = JSON.parse(xhr.responseText)
            let url = response.url
            console.log(response)
            const index = url.indexOf('upload')
            url =
              slice(0, index + 7, url) +
              'c_thumb,h_200,g_face,w_200' +
              slice(index + 6, url.length, url)
            resolve(url)
          }
        }
        let formdata = new FormData()
        formdata.append('file', file)
        formdata.append('timestamp', timestamp)
        formdata.append('api_key', api_key)
        // formdata.append('signature', signature)
        formdata.append("upload_preset", upload_preset)  // upload_preset name
        formdata.append("tags", tags)
        formdata.append("folder", folder)
        xhr.send(formdata)
      } catch (e) {
        reject()
      }
    })

    const response = await request

    if (isNil(response)) {
      return { ok: false, kind: 'unknown-error' }
    }
    return { ok: true, kind: 'success', imageUrl: response }
  }
}

export default Cloudinary;