import express from "express";
import CourseModel from "../models/CourseModel.js"

class CourseController {

    static getCourses = async (req, res) => {
        res.send("all courses")
    }

    static createCourse = async (req, res) => {
        res.send("create course")
    }

}

export default CourseController