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
}

export default RoomAPI