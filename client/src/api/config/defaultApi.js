// Default Api call class

class DefaultApiCall {
  /**
   * Insert token to an axios instance
   * @param {Object} axiosInstance 
   */
  static insertToken (axiosInstance) {
    const token = localStorage.getItem("cpg-jwt")

    axiosInstance.defaults.headers.common['authorization'] = `Bearer ${token}`

    return axiosInstance
  }
}

export default DefaultApiCall