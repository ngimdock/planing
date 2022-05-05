import React from 'react'
import TeacherItem from './TeacherItem'

const TeacherContent = () => {

    const teachersList = [
        {
            matricule: "A14MJU",
            sexe: "Masculin",
            name: "Dan Ngimdock",
            color: "#3E4BFF"
        },
        {
            matricule: "A18M8E",
            sexe: "Feminin",
            name: "Blondelle Kana",
            color: "#F24E1E"
        },
        {
            matricule: "A12M9I",
            sexe: "Masculin",
            name: "Omer Fotso",
            color: "#FF8500"
        },
        {
            matricule: "A18M8E",
            sexe: "Feminin",
            name: "Blondelle Kana",
            color: "#F24E1E"
        },{
            matricule: "A14MJU",
            sexe: "Masculin",
            name: "Dan Ngimdock",
            color: "#3E4BFF"
        },
        {
            matricule: "A12M9I",
            sexe: "Masculin",
            name: "Omer Fotso",
            color: "#FF8500"
        }
    ]

  return (
    teachersList.map(item => (
        <TeacherItem name={item.name} sexe={item.sexe} matricule={item.matricule} color={item.color} />
    ))
  )
}

export default TeacherContent