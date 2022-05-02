import express from "express";
import CourseModel from "../models/CourseModel.js"

class CourseController {

    static getCourses = async (req, res) => {
        res.send("all courses")
    }

    static createCourse = async (req, res) => {
        res.send("create course")
    }

    static checkCode = async (req, res) => {
        const { code } = req.body

        if (code) {
            const { data, error } = await CourseModel.checkCode(code)

            if (data !== undefined) {
                return res.json({ data })
            }

            return res.status(500).json({ error })
        } else {
            res.status(400).json({ error: "Provide all the required data" })
        }
    }

}

export default CourseController