import AdminModel from "./AdminModel.js"
import FacultyModel from "./FacultyModel.js"
import NiveauModel from "./NiveauModel.js"

export const initializeDB = () => {
  try {
    FacultyModel.init()
    AdminModel.init()
    NiveauModel.init()
    
  } catch (err) {
    console.log(err)
  }
}