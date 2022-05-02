import express from "express";
import CourseModel from "../models/CourseModel.js"

class CourseController {

    static getCourses = async (req, res) => {
        const { data, error } = await CourseModel.getCourses()

        if(data) return res.status(200).json({ data })
        return res.status(400).json({ error })
    }

    static createCourse = async (req, res) => {

        // get data from request body
        const {
            codeCours,
            descriptionCours,
            idSemestre,
            matriculeEns,
            idSpecialite
        } = req.body

        if(codeCours && descriptionCours && idSemestre && matriculeEns  && idSpecialite){

            // create course
            const { data, error } = await CourseModel.createCourse(req.body)

            if(data) return res.status(201).json({ data })
            return res.status(500).json({ error })
        }

        return res.status(400).json({ error: "Provide all the required data" })
        
    }

}

export default CourseController