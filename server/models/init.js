import AdminModel from "./AdminModel.js"
import FacultyModel from "./FacultyModel.js"
import NiveauModel from "./NiveauModel.js"
import ClassModel from './ClassModel.js';

export const initializeDB = () => {
  try {
    FacultyModel.init()
    AdminModel.init()
    NiveauModel.init()
    ClassModel.init()
    
  } catch (err) {
    console.log(err)
  }
}