import React, { useContext, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import ProgramAPI from "../../api/program";

import { ExportContext } from "../contexts/exportContext";
import PlanningContext from "../contexts/planningContext";

export const ExportProvider = ({ children }) => {    

    // State section
    const exportRef = useRef();
    const [placeExport, setPlaceExport] = useState("")
    const [currentExportData, setCurrentExportData] = useState({})
    const { getClass, currentSemester, currentClass } = useContext(PlanningContext)
    const [programs, setPrograms] = useState({})

    // some setters
    const setAll = async() => {
        setPlaceExport("All")
    }

    const setTeacher = async() => {
        const payload = {
            idYear: currentExportData.academicYear.idAcademicYear,
            idSemester: currentExportData.academicYear.idSemester,
            matriculeTeacher: currentExportData.objectData.id
        }
        console.log(payload)
        const { data } = await ProgramAPI.getByTeacher(payload)
        // console.log(programmation)
        console.log(data)

        // correct the presence of codeRoom here
        // fix the formats of the dates
        // set a get method for the semester and the academicYear
        const prevResult = { ...data }
        console.log(prevResult)
        const newResult = {
            ...prevResult,
            semester: "1",
            academicYear: "1"
        }
        setPrograms(newResult)
        setPlaceExport(programs)
        console.log(newResult)
    }
    
    const setClass = async() => {
        const payload = {
            idAcademicYear : currentSemester.idYear,
            idSemester: currentSemester.idSemester,
            idFaculty: currentClass.faculty.id,
            codeClass: currentClass.code
        }
        const prevResult = getClass(payload)
        const newResult = {
            ...prevResult,
            semester: currentSemester.value.slice(9,10),
            academicYear: currentSemester.value.slice(13,22)
        }
        setPrograms(newResult)
        setPlaceExport(programs)
        console.log(prevResult)
    }

    const setRoom = async() => {
        const payload = {
            idYear: currentExportData.academicYear.idAcademicYear,
            idSemester: currentExportData.academicYear.idSemester,
            idSalle: currentExportData.objectData.id
        }
        console.log(payload)
        const { data } = await ProgramAPI.getByRoom(payload)
        // console.log(programmation)
        console.log(data)

        // correct the presence of codeRoom here
        // fix the formats of the dates
        // set a get method for the semester and the academicYear
        const prevResult = { ...data }
        console.log(prevResult)
        const newResult = {
            ...prevResult,
            semester: "1",
            academicYear: "1"
        }
        setPrograms(newResult)
        setPlaceExport(programs)
        console.log(newResult)
    }

    const setFaculty = async() => {
        const payload = {
            idYear: currentExportData.academicYear.idAcademicYear,
            idSemester: currentExportData.academicYear.idSemester,
            idFaculty: currentExportData.objectData.id
        }
        const { data } = await ProgramAPI.getFaculty(payload)
        // console.log(programmation)
        // Fix the formats of the dates
        // set a get method for the semester and the academicYear
        const prevResult = { ...data }
        console.log(prevResult)
        const newResult = {
            ...prevResult,
            semester: "1",
            academicYear: "1"
        }
        setPrograms(newResult)
        setPlaceExport(programs)
        console.log(newResult)
    }

    // some export handlers
    const handlePrintByTeacher = useReactToPrint({
        onBeforeGetContent: async() => {
            await setTeacher()
        },
        content: () => exportRef.current,
        documentTitle: "Teacher",
        copyStyles: true
    })


    const handlePrintByClass = useReactToPrint({
        onBeforeGetContent: async() => {
            await setClass()
        },
        content: () => exportRef.current,
        documentTitle: `Time_Table_${currentClass && currentClass.code.replace("_", "-")}_Semester_${currentSemester && currentSemester.value.slice(9,10)}_Year_${currentSemester && currentSemester.value.slice(13,22)}`,
        copyStyles: true
    })

    const handlePrintByFaculty = useReactToPrint({
        onBeforeGetContent: async() => {
            await setFaculty()
        },
        content: () => exportRef.current,
        documentTitle: "Faculty",
        copyStyles: true
    })

    const handlePrintByRoom = useReactToPrint({
        onBeforeGetContent: async() => {
            await setRoom()
        },
        content: () => exportRef.current,
        documentTitle: "Room",
        copyStyles: true
    })

    const handlePrintAll = useReactToPrint({
        onBeforeGetContent: async() => {
            await setAll()
        },
        content: () => exportRef.current,
        documentTitle: "All",
        copyStyles: true
    })

    return (
        <ExportContext.Provider value={{ 
            exportRef, 
            handlePrintAll,
            handlePrintByClass,
            handlePrintByRoom,
            handlePrintByFaculty,
            handlePrintByTeacher, 
            setPlaceExport,
            placeExport,
            programs,
            currentExportData,
            setCurrentExportData
        }}>
            {children}
        </ExportContext.Provider>
    );
};