import axiosInstance from '../config'
import DefaultApiCall from '../config/defaultApi'

// Api call class
class AuthApi extends DefaultApiCall {
  /**
   * Login
   * @param {string} email 
   * @param {string} password 
   */
  static async login (email, password) {
    try {
      console.log({ email, password })
      const { data, error } = await axiosInstance.post('/admin/signin', { email, password })

      if (data) {
        console.log(data)
      } else {
        console.log(error)
      }
    } catch (err) {
      console.log(err)
    }
  }

  static async addAdmin () {
    const instance = AuthApi.insertToken(axiosInstance)
  }
}

export default AuthApi