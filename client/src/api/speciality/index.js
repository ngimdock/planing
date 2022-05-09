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
      console.log("Paased here")
      const { data } = await instance.post("/speciality/create", { nomSpecialite: name }).then((response) => {
        return response
      }).catch(error => console.log(error))

      console.log(data)

      return { data }

    } catch (err) {
      console.lgg(err)

      return { error: "An error occured "}
    }
  }
}

export default SpecialityAPI