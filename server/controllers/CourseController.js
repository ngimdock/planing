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
        const { newDescriptionCours } = req.body

        if(!codeCours || !newDescriptionCours) return res.status(400).json({ error: "Provide all the data required of the course to update it!!" })

        // update course
        const { data, error } = await CourseModel.updateCourse({ codeCours, newDescriptionCours })

        console.log(data);

        if(data) return res.status(201).json({ data })
        return res.status(500).json({error})
    }

}

export default CourseController