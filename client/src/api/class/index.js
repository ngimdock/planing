import axiosInstance from '../config'
import DefaultApiCall from '../config/defaultApi'
import Class from '../../entities/class';

class ClassAPI extends DefaultApiCall {
  static async getAll () {
    const instance = this.insertToken(axiosInstance)

    try {
      const { data } = await instance.get("/class/all")

      console.log(data)

      return { data }
    } catch (err) {
      console.log(err)

      return { error: "An error occured" }
    }
  }
  // to create classe
  static async create (payload) {
    const instance = this.insertToken(axiosInstance)
    // const class = new Class();

    try {
      const { data, error } = await instance.post("/class/create", payload)

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

    // to update a classe laisser
    static async update (payload) {
      const instance = this.insertToken(axiosInstance)
      // const class = new Class();
  
      try {
        const { data, error } = await instance.put("/class/update", payload)
  
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

    //to delete a classe
  static async delete (id) {
      const instance = this.insertToken(axiosInstance)
      // const class = new Class();

      console.log(id)
  
    try {
      const { data, error } = await instance.delete("/class/delete/"+id)
  
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

export default ClassAPI