import AdminModel from "./AdminModel.js"
import FacultyModel from "./FacultyModel.js"
import NiveauModel from "./NiveauModel.js"
import ClassModel from './ClassModel.js';

export const initializeDB = async () => {
  try {
    await AdminModel.init()
    await FacultyModel.init()
    await NiveauModel.init()
    await ClassModel.init()
    
  } catch (err) {
    console.log(err)
  }
}