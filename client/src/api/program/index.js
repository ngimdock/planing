import axiosInstance from '../config'
import DefaultApiCall from '../config/defaultApi'

class ProgramAPI extends DefaultApiCall {
  static async getByClass (data) {
    const instance = this.insertToken(axiosInstance)

    const {
      idYear,
      idSemester,
      codeClass
    } = data

    console.log(data)

    if (idYear && idSemester && codeClass) {
      try {
        const { data } = await instance.get(`/planified/classe/${idYear}/${idSemester}/${codeClass}`)
  
        console.log(data)
  
        return data
      } catch (err) {
        console.log(err)
  
        return { error: "An error occured" }
      }
    }

    return { error: "Provide all the required params" }
  }

  static async create (payload) {
    const instance = this.insertToken(axiosInstance)

    return new Promise(async (resolve, reject) => {
      try {
        const { data, error } = await instance.post("/planified/create", payload)

        if (data) {
          resolve(data)
        } else {
          reject({ error })
        }
      } catch (err) {
        console.log(err)

        reject({ error: "An error occured" })
      }
    })
  }
}

export default ProgramAPI