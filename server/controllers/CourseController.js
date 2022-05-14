import express from "express";
import CourseModel from "../models/CourseModel.js"

class CourseController {

    static getCourses = async (req, res) => {
        const { data, error } = await CourseModel.getCourses()

        if(data) return res.status(200).json({ data })
        return res.status(400).json({ error })
    }

    static getAvailableCourse = async (req, res) => {
        const { codeClasse } = req.params

        if (codeClasse) {
            const { data, error } = await CourseModel.getAvailableCourses(codeClasse)

            if (data) {
                return res.json({ data })
            }

            return res.status(500).json({ error })
        } else {
            res.status(400).json({ error: "Provides all the required data" })
        }
    }

    static createCourse = async (req, res) => {

        // get data from request body
        const {
            codeCours,
            descriptionCours,
            idSpecialite
        } = req.body

        if(codeCours && descriptionCours){

            // create course
            const { data, error } = await CourseModel.createCourse(req.body)

            if(data) return res.status(201).json({ data })
            return res.status(500).json({ error })
        }

        return res.status(400).json({ error: "Provide all the required data" })
        
    }

    static deleteCourse = async (req, res) => {

        //get the course id from the request parameters
        const { codeCours } = req.params
 
        if(!codeCours) return res.status(400).json({ error: "Provide the code of the course to delete!!" })

        // delete course
        const { data, error } = await CourseModel.deleteCourse(codeCours)

        if(data) return res.status(201).json({ data })
        return res.status(500).json({error})
    }

    static updateCourse = async (req, res) => {

        //get data from the request parameters en body
        const { codeCours } = req.params
        
        // update course
        const { data, error } = await CourseModel.updateCourse({ codeCours, ...req.body })

        if(data) return res.status(201).json({ data })
        return res.status(500).json({error})
    }

    static getCourse = async (req, res) => {

        const { codeCours } = req.params
        const { data, error } = await CourseModel.getCourse(codeCours)

        if(data) return res.status(201).json({ data })
        return res.status(500).json({error})
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