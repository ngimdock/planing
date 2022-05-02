import express from "express";
import CourseModel from "../models/CourseModel.js"

class CourseController {

    static getCourses = async (req, res) => {
        const { data, error } = await CourseModel.getCourses()

        if(data) return res.status(200).json({ data })
        return res.status(400).json({ error })
    }

    static createCourse = async (req, res) => {
        res.send("create course")
    }

}

export default CourseController