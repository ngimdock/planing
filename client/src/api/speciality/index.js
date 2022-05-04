import axiosInstance from '../config'
import DefaultApiCall from '../config/defaultApi'

class SpecialityAPI extends DefaultApiCall {
  static async getAll () {
    const instance = this.insertToken(axiosInstance)

    try {
      const { data } = await instance.get("/speciality/all")

      console.log(data)

      return { data }
    } catch (err) {
      console.log(err)

      return { error: "An error occured" }
    }
  }
}

export default SpecialityAPI