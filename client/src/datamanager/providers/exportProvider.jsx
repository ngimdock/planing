import React, { useContext, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import ProgramAPI from "../../api/program";

import { ExportContext } from "../contexts/exportContext";
import PlanningContext from "../contexts/planningContext";
import ToastContext from "../contexts/toastContext";

export const ExportProvider = ({ children }) => {    

    // State section
    const exportRef = useRef();
    const [placeExport, setPlaceExport] = useState("")
    const { getClass, currentSemester, currentClass } = useContext(PlanningContext)
    const [programs, setPrograms] = useState({})
    const { showToast } = useContext(ToastContext)
    const [readyToExport, setReadyToExport] = useState(false)

    const handleChargeTheExportComponent = async(type, currentExportData) => {
        if(type === "teacher") {
            console.log(currentExportData);
            const payload = {
                idYear: currentExportData.academicYear.idAcademicYear,
                idSemester: currentExportData.academicYear.idSemester,
                matriculeTeacher: currentExportData.objectData.id
            }
            console.log(payload)
            const { data } = await ProgramAPI.getByTeacher(payload)
            console.log(data)
    
            // correct the presence of codeRoom here
            // fix the formats of the dates
            // fix the format of the data
            const prevResult = { ...data }
            console.log(prevResult)
            const newResult = {
                code: {...prevResult}.NameTeacher || currentExportData.objectData.name,
                programs: {...prevResult}.programs,
                semester: currentExportData.academicYear.semesterValue.slice(9,10),
                academicYear: currentExportData.academicYear.acayValue
            }
            console.log(newResult)
            return newResult
        } else if(type === "room") {
            const payload = {
                idYear: currentExportData.academicYear.idAcademicYear,
                idSemester: currentExportData.academicYear.idSemester,
                idSalle: currentExportData.objectData.id
            }
            console.log(payload)
            const { data } = await ProgramAPI.getByRoom(payload)
            console.log(data)
    
            // correct the presence of codeRoom here
            // fix the formats of the dates
            // fix the format of the data
            const prevResult = { ...data }
            console.log(prevResult)
            const newResult = {
                code: {...prevResult}.CodeRoom || currentExportData.objectData.name,
                programs: {...prevResult}.programs,
                semester: currentExportData.academicYear.semesterValue.slice(9,10),
                academicYear: currentExportData.academicYear.acayValue
            }
            console.log(newResult)
            return newResult
        } else if(type === "faculty") {
            const payload = {
                idYear: currentExportData.academicYear.idAcademicYear,
                idSemester: currentExportData.academicYear.idSemester,
                idFaculty: currentExportData.objectData.id
            }
            const { data } = await ProgramAPI.getFaculty(payload)
            // Fix the formats of the dates
            // fix the format of the data
            const prevResult = { ...data }
            console.log(prevResult)
            const newResult = {
                ...prevResult,
                semester: currentExportData.academicYear.semesterValue.slice(9,10),
                academicYear: currentExportData.academicYear.acayValue
            }
            console.log(newResult)
            return newResult
        } else {
            const payload = {
                idYear: currentExportData.idAcay,
                idSemester: currentExportData.idSemester
            }
            console.log(payload)
            const { data } = await ProgramAPI.getAll(payload)
            console.log(data)    
    
            // correct the presence of codeRoom here
            // fix the formats of the dates
            // fix the format of the data
            const prevResult = [...data]
            console.log(prevResult)
            const newResult = [
                prevResult,
                currentExportData.semesterValue.slice(9,10),
                currentExportData.acayValue
            ]
            console.log(newResult)
            return newResult
        }
    }

    // some setters
    const setAll = async() => {
        showToast("Semester X programs exporting", "success")
    }

    const setTeacher = async() => {
        showToast("Teacher X programs exporting", "success")
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
        console.log(prevResult)
    }

    const setRoom = async() => {
        showToast("Room X programs exporting", "success")
    }

    const setFaculty = async() => {
        showToast("Faculty X programs exporting", "success")
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
        documentTitle: `Time_Table_${"code"}_Semester_${"undefined"}_Year_${"undefined"}`,
            // Semester_${currentExportData.academicYear.semesterValue.slice(9,10)}_Year_${// currentExportData.academicYear.acayValue == undefined ? 
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
            setPrograms,
            handleChargeTheExportComponent,
            readyToExport,
            setReadyToExport
        }}>
            {children}
        </ExportContext.Provider>
    );
};