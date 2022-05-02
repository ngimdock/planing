import DefaultApiCall from "../config/defaultApi";
import axiosInstance from '../config'

// Api call Teacher
class TeacherAPI extends DefaultApiCall {
  static async checkMatricule (matricule) {
    const instance = TeacherAPI.insertToken(axiosInstance)

    try {
      const { data, error } = await instance.post("/teacher/verify_matricule", { matricule })

      if (data !== undefined) {
        return data
      }

      return { error }
    } catch (err) {
      console.log(err)

      return { error: "An error occured while checking the unicity of the teacher's matricule" }
    }
  }
}

export default TeacherAPI