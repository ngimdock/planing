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

  static async getAvailableRooms ({ idSemester, idDay, start, end }) {
    const instance = this.insertToken(axiosInstance)

    try {
      const { data, error } = await instance.get(`/room/available/?idSemester=${idSemester}&idDay=${idDay}&startHour=${start}&endHour=${end}`)
    
      console.log(data)

      return { data }
    } catch (err) {
      console.log(err)

      return { error: "An error occured" }
    }
  }
}

export default RoomAPI