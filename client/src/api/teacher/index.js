import DefaultApiCall from "../config/defaultApi";
import axiosInstance from '../config'

// Api call Teacher
class TeacherAPI extends DefaultApiCall {
  static async checkMatricule (matricule) {
    const instance = this.insertToken(axiosInstance)

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

  static async getAll () {
    const instance = this.insertToken(axiosInstance)

    try {
      const { data, error } = await instance.get("/teacher")

      if (data) return { data }

      return { error }
    } catch (err) {
      console.log(err)

      return { error: "An error occured" }
    }
  }

  static async getAvailableTeachers ({ idSemester, idDay, start, end }) {
    const instance = this.insertToken(axiosInstance)

    try {
      const { data, error } = await instance.get(`/teacher/available/?idSemester=${idSemester}&idDay=${idDay}&startHour=${start}&endHour=${end}`)
    
      console.log(data)

      return { data }
    } catch (err) {
      console.log(err)

      return { error: "An error occured" }
    }
  }

  static async createTeacher(matricule, name, sexe) {
    const instance = this.insertToken(axiosInstance)

    try {
      const { data } = await instance.post("/teacher/create", { matriculeEns: matricule, nomEns: name, sexEns: sexe })

      console.log(data)

      return { data }
    } catch (err) {
      console.log(err)

      return { error: "An error occured "}
    }
  }

  static async deleteTeacher(matricule) {
    const instance = this.insertToken(axiosInstance)

    try {
      const { data } = await instance.delete(`/teacher/delete/${matricule}`)

      console.log(data)

      return { data }
    } catch (err) {
      console.log(err)

      return { error : "An error occured" }
    }
  }

  static async updateTeacher(id, data) {
    const instance = this.insertToken(axiosInstance)

    const {
      matricule,
      name,
      sexe
    } = data

    try {

      const { data } = await instance.put(`/teacher/update/${id}`, { matriculeEns: matricule, nomEns: name, sexEns: sexe })

      console.log(data)

      return { data }
    } catch(err) {
      console.log(err)

      return { error: "An error occured "}
    }

  }
}

export default TeacherAPI