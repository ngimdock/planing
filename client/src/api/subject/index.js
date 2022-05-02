import axiosInstance from '../config'
import DefaultApiCall from '../config/defaultApi'

// Api call Subject
class SubjectAPI extends DefaultApiCall {
  static async checkCode (code) {
    const instance = SubjectAPI.insertToken(axiosInstance)

    try {
      const { data, error } = await instance.post("/course/verify_code", { code })

      if (data !== undefined) {
        return data
      }

      return { error }
    } catch (err) {
      console.log(err)

      return { error: "An error occured" }
    }
  } 
}

export default SubjectAPI