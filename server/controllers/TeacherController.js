import TeacherModel from "../models/TeacherModel.js"

class TeacherController {

    /**
     * 
     */
    static getTeachers = async (req, res) => {
        res.send("This are all Teachers")
    }

    /**
     * 
     */
    static createTeacher = async (req, res) => {

    }
}

export default TeacherController