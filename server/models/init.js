import AdminModel from "./AdminModel.js"
import FacultyModel from "./FacultyModel.js"
import NiveauModel from "./NiveauModel.js"
import ClassModel from './ClassModel.js';
import RoomModel from './RoomModel.js';
import TeacherModel from "./TeacherModel.js";
import SpecialityModel from "./SpecialityModel.js";
import GroupModel from "./GroupModel.js";
import AcademicYearModel from "./AcademicYearModel.js";
import SemesterModel from "./SemesterModel.js";
import CourseModel from "./CourseModel.js";
import FollowModel from "./FollowModel.js";

export const initializeDB = async () => {
  try {
    await AdminModel.init()
    await FacultyModel.init()
    await NiveauModel.init()
    await ClassModel.init()
    await RoomModel.init()
    await TeacherModel.init()
    await SpecialityModel.init()
    await GroupModel.init()
    await AcademicYearModel.init()
    await SemesterModel.init()
    await CourseModel.init()
    await FollowModel.init()
  } catch (err) {
    console.log(err)
  }
}