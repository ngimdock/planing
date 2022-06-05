import React, { useContext, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import ProgramAPI from "../../api/program";

import { ExportContext } from "../contexts/exportContext";
import PlanningContext from "../contexts/planningContext";
import ToastContext from "../contexts/toastContext";

export const ExportProvider = ({ children }) => {    

    // State section
    const exportRef = useRef();
    const [semAndAcay, setSemAndAcay] = useState({})
    const [exportName, setExportName] = useState("")
    const { getClass, currentSemester, currentClass } = useContext(PlanningContext)
    const [programs, setPrograms] = useState({})
    const { showToast } = useContext(ToastContext)
    const [readyToExport, setReadyToExport] = useState(false)

    /* The role of this function is to performat the informations comming from the backend
     * to a format that that can be held by the ExportComponent for display   
    */ 
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
            if(data.NameTeacher !== "") {
                const prevResult = { ...data }
                console.log(prevResult)
                const newResult = {
                    code: {...prevResult}.NameTeacher || currentExportData.objectData.name,
                    programs: {...prevResult}.programs,
                    semester: currentExportData.academicYear.semesterValue.slice(9,10),
                    academicYear: currentExportData.academicYear.acayValue
                }
                setSemAndAcay({
                    semester: currentExportData.academicYear.semesterValue.slice(9,10),
                    academicYear: currentExportData.academicYear.acayValue
                })
                return { newProgram : newResult, hasProgram: true }
            } else {
                return { newProgram: {}, hasProgram: false }
            }
    
        } else if(type === "room") {
            const payload = {
                idYear: currentExportData.academicYear.idAcademicYear,
                idSemester: currentExportData.academicYear.idSemester,
                idSalle: currentExportData.objectData.id
            }
            console.log(payload)
            const { data } = await ProgramAPI.getByRoom(payload)
            console.log(data)
            if(data.CodeRoom !== "") {
                const prevResult = { ...data }
                console.log(prevResult)
                const newResult = {
                    code: {...prevResult}.CodeRoom || currentExportData.objectData.name,
                    programs: {...prevResult}.programs,
                    semester: currentExportData.academicYear.semesterValue.slice(9,10),
                    academicYear: currentExportData.academicYear.acayValue
                }
                setSemAndAcay({
                    semester: currentExportData.academicYear.semesterValue.slice(9,10),
                    academicYear: currentExportData.academicYear.acayValue
                })
                return { newProgram: newResult, hasProgram: true }
            } else {
                return { newProgram: {}, hasProgram: false }
            }
    
        } else if(type === "faculty") {
            const payload = {
                idYear: currentExportData.academicYear.idAcademicYear,
                idSemester: currentExportData.academicYear.idSemester,
                idFaculty: currentExportData.objectData.id
            }
            const { data } = await ProgramAPI.getFaculty(payload)
            console.log(data)
            if(data.facultyName) {
                const prevResult = { ...data }
                console.log(prevResult)
                const newResult = {
                    ...prevResult,
                    semester: currentExportData.academicYear.semesterValue.slice(9,10),
                    academicYear: currentExportData.academicYear.acayValue
                }
                setSemAndAcay({
                    semester: currentExportData.academicYear.semesterValue.slice(9,10),
                    academicYear: currentExportData.academicYear.acayValue
                })
                return { newProgram: newResult, hasProgram: true }
            } else {
                return { newProgram: {}, hasProgram: false }
            }
        } else {
            const payload = {
                idYear: currentExportData.academicYear.idAcay,
                idSemester: currentExportData.academicYear.idSemester
            }
            console.log(payload)
            const { data } = await ProgramAPI.getAll(payload)
            console.log(data)    
            if(data.length > 0) {
                const prevResult = [...data]
                console.log(prevResult)
                const newResult = {
                    prevResult,
                    semester: currentExportData.academicYear.semesterValue.slice(9,10),
                    academicYear: currentExportData.academicYear.acayValue
                }
                setSemAndAcay({
                    semester: currentExportData.academicYear.semesterValue.slice(9,10),
                    academicYear: currentExportData.academicYear.acayValue
                })
                return { newProgram: newResult, hasProgram: true }
            } else {
                return { newProgram: {}, hasProgram: false }
            }
        }
    }

    // some setters
    /* Their role is to indicate to the user which program he is exporting
     * while notifying that the operation has been successfull
    */
    const setAll = async() => {
        showToast(`Semester ${semAndAcay.semester} Year ${semAndAcay.academicYear} programs exported`, "success")
    }

    const setTeacher = async() => {
        showToast(`Teacher ${exportName} Semester ${semAndAcay.semester} Year ${semAndAcay.academicYear} programs exported`, "success")
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
        showToast(`Room ${exportName} Semester ${semAndAcay.semester} Year ${semAndAcay.academicYear} programs exported`, "success")
    }

    const setFaculty = async() => {
        showToast(`Faculty ${exportName} Semester ${semAndAcay.semester} Year ${semAndAcay.academicYear} programs exported`, "success")
    }

    // some export handlers
    // This handlers are the hooks connected to ReactToPrint library permitting to export a program
    const handlePrintByTeacher = useReactToPrint({
        onBeforeGetContent: async() => {
            await setTeacher()
        },
        content: () => exportRef.current,
        documentTitle: `Time_Table_${exportName && exportName}_Semester_${semAndAcay.semester}_Year_${semAndAcay.academicYear}`,
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
        documentTitle: `Time_Table_${exportName && exportName}_Semester_${semAndAcay.semester}_Year_${semAndAcay.academicYear}`,
            // Semester_${currentExportData.academicYear.semesterValue.slice(9,10)}_Year_${// currentExportData.academicYear.acayValue == undefined ? 
        copyStyles: true
    })

    const handlePrintByRoom = useReactToPrint({
        onBeforeGetContent: async() => {
            await setRoom()
        },
        content: () => exportRef.current,
        documentTitle: `Time_Table_${exportName && exportName}_Semester_${semAndAcay.semester}_Year_${semAndAcay.academicYear}`,
        copyStyles: true
    })

    const handlePrintAll = useReactToPrint({
        onBeforeGetContent: async() => {
            await setAll()
        },
        content: () => exportRef.current,
        documentTitle: `Time_Table_Semester_${semAndAcay.semester}_Year_${semAndAcay.academicYear}`,
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
            programs,
            setExportName,
            setPrograms,
            handleChargeTheExportComponent,
            readyToExport,
            setReadyToExport
        }}>
            {children}
        </ExportContext.Provider>
    );
};