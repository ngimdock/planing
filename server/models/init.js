import AdminModel from "./AdminModel.js"
import FacultyModel from "./FacultyModel.js"
import RoomModel from './RoomModel.js';

export const initializeDB = () => {
  try {
    FacultyModel.init()
    AdminModel.init()
    RoomModel.init()
  } catch (err) {
    console.log(err)
  }
}