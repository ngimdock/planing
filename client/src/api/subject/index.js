import axiosInstance from '../config'
import DefaultApiCall from '../config/defaultApi'

// Api call Subject
class SubjectAPI extends DefaultApiCall {
  static async checkCode (code) {
    const instance = SubjectAPI.insertToken(axiosInstance)

    try {
      const { data, error } = await instance.post("/course/verify_code", { code })

      if (data !== undefined) {
        return data
      }

      return { error }
    } catch (err) {
      console.log(err)

      return { error: "An error occured" }
    }
  }

  static async getAll(){
    const instance = SubjectAPI.insertToken(axiosInstance)

    try {
      const { data, error } = await instance.get("/course")

      if (data !== undefined) {
        return data
      }

      return { error }
    } catch (err) {
      console.log(err)

      return { error: "An error occured" }
    }
  }

  static async createSubject(payload) {

    // insert token in axios headers
    const instance = this.insertToken(axiosInstance)
    
    try{

      // get course
      const { data, error } = await instance.post("/course/create", payload)

      if(data) return data
      return error

    }catch(error){
      console.log(error);

      return { error }
    }
  }

  static async deleteSubject(idSubject){

    // insert token in axios headers
    const instance = this.insertToken(axiosInstance)

    try{
      const { data, error } = await instance.delete(`/course/delete/${idSubject}`)

      if(data) return data
      return error
    }catch(error){

      console.log(error)
      return error
    }
  }

  static async updateSubject(codeSubject, newData){

    // insert token in axios headers
    const instance = this.insertToken(axiosInstance)

    console.log({ codeSubject, newData })

    try{
      const { data, error } = await instance.put(`/course/update/${codeSubject}`, newData)

      if(data) return data
      return error
      
    }catch(error){
      console.log(error);

      return {error: "Error occured while updating the course"}
    }
  } 


}

export default SubjectAPI