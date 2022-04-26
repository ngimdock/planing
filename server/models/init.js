import AdminModel from "./AdminModel.js"
import FacultyModel from "./FacultyModel.js"

export const initializeDB = () => {
  try {
    FacultyModel.init()
    AdminModel.init()
  } catch (err) {
    console.log(err)
  }
}