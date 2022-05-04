import axiosInstance from '../config'
import DefaultAPICall from '../config/defaultApi'

// AcademicYear API Call
class AcademicYearAPI extends DefaultAPICall {
  static async getAll () {
    const instance = this.insertToken(axiosInstance)

    try {
      const { data, error } = await instance.get("/semester/all")

      if (data) {
        return data
      }

      return { error }
    } catch (err) {
      console.log(err)

      return { error: "An error Occured" }
    }
  }

  static async create (academicYear) {
    const instance = this.insertToken(axiosInstance)

    try {
      const { data, error } = await instance.post("/semester/create", { academicYear })

      if (data) {
        console.log(data)
        return { data: true }
      }

      return { error }
    } catch (err) {
      console.log(err)

      return { error: "An error Occured" }
    }
  }
}

export default AcademicYearAPI