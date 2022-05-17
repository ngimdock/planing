import axiosInstance from '../config'
import DefaultApiCall from '../config/defaultApi'

class RoomAPI extends DefaultApiCall {
  static async getAll () {
    const instance = this.insertToken(axiosInstance)

    try {
      const { data } = await instance.get("/room/all")

      console.log(data)

      return { data: data.data }
    } catch (err) {
      console.log(err)

      return { error: "An error occured" }
    }
  }
  // creation of room
  static async create (payload) {
    const instance = this.insertToken(axiosInstance)

    try {
      const { data, error } = await instance.post("/room/create", payload)

      console.log("Backup",data)

      if (data){
        return { data }
      }
      return error
    } catch (err) {
      console.log(err)

      return { error: "An error occured" }
    }
  }

  //update of a room
  static async update (id, payload) {
    const instance = this.insertToken(axiosInstance)
    
    try {
      const { data, error } = await instance.patch(`/room/update/${id}`, payload)

      console.log("backup", data)

      if (data){
        return { data }
      }
      return error
    } catch (err) {
      console.log(err)

      return { error: "An error occured" }
    }
  }
  // delete a room
  static async delete (id) {
    const instance = this.insertToken(axiosInstance)
    console.log(id)
  
    try {
      const { data, error } = await instance.delete(`/room/delete/${id}`)
  
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

export default RoomAPI