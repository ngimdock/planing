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
        return data
      } else {
        return error
      }
    } catch (err) {
      console.log(err)

      return { error: "An error occured" }
    }
  }

  static async addAdmin () {
    const instance = AuthApi.insertToken(axiosInstance)
  }

  /**
   * Get the current User
   */
  static async getCurrentUser () {
    const instance = AuthApi.insertToken(axiosInstance)

    try {
      const { data, error } = await instance.get("/admin/current")

      if (data) {
        return data
      } else {
        return error
      }
    } catch (err) {
      console.log(err)

      return { error: "An error occured" }
    }
  }
}

export default AuthApi