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
      // const class = new Class();
  
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