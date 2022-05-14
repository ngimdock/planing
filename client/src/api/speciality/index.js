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

  static async createSpeciality(name) {
    const instance = this.insertToken(axiosInstance)

    try {
      const { data } = await instance.post("/speciality/create", { nomSpecialite: name })

      console.log(data)

      return { data }

    } catch (err) {
      console.log(err)

      return { error: "An error occured "}
    }
  }

  static async modifySpeciality(id, name) {
    const instance = this.insertToken(axiosInstance)

    try {

      const { data } = await instance.put(`/speciality/update/${id}`, { nomSpecialite: name })

      console.log(data)

      return { data }
    } catch(err) {
      console.log(err)

      return { error: "An error occured " }
    }
  }

  static async deleteSpeciality(id) {
    const instance = this.insertToken(axiosInstance)

    try {
      const { data } = await instance.delete(`/speciality/delete/${id}`)

      console.log(data)

      return { data }
    } catch (err) {
      console.log(err)

      return { error: "An error occured "}
    }
  }
}

export default SpecialityAPI