import axiosInstance from '../config'
import DefaultApiCall from '../config/defaultApi'

class LevelAPI extends DefaultApiCall {
  static async getAll () {
    const instance = this.insertToken(axiosInstance)

    try {
      const { data, error } = await instance.get("/level/all")

      console.log(data)

      return data
    } catch (err) {
      console.log(err)

      return { error: "An error occured" }
    }
  }
    // to create level
    static async create (payload) {
      const instance = this.insertToken(axiosInstance)
  
      try {
        const { data, error } = await instance.post("/level/create", payload)
  
        console.log(data)
  
        if (data){
          return { data }
        }
        return error
      } catch (err) {
        console.log(err)
  
        return { error: "An error occured" }
      }
    }
  
    static async update (id, payload) {
      const instance = this.insertToken(axiosInstance)
  
      try {
        const { data: { newData }, error } = await instance.put(`/level/${id}`, payload)
  
        console.log("backup", newData)
  
        if (newData){
          return { newData }
        }
        return error
      } catch (err) {
        console.log(err)
  
        return { error: "An error occured" }
      }
    }
  static async delete (id) {
    const instance = this.insertToken(axiosInstance)
    console.log(id)
  
    try {
      const { data, error } = await instance.delete(`/level/${id}`)
  
      console.log(data)
  
      if (data){
        return { data }
      }
      return error
    } catch (err) {
      console.log(err)
  
      return { error: "An error occured" }
    }
  }
}

export default LevelAPI