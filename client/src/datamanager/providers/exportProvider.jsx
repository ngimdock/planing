import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

import { ExportContext } from "../contexts/exportContext";

export const ExportProvider = ({ children }) => {
    // State section
    const exportRef = useRef();
    const [placeExport, setPlaceExport] = useState("")

    // some setters
    const setAll = async() => {
        setPlaceExport("All")
    }

    const setTeacher = async() => {
        setPlaceExport("Teacher")
    }

    const setClass = async() => {
        setPlaceExport("Class")
    }

    const setRoom = async() => {
        setPlaceExport("Room")
    }

    const setFaculty = async() => {
        setPlaceExport("Faculty")
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
        documentTitle: "Class",
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
            placeExport
        }}>
            {children}
        </ExportContext.Provider>
    );
};