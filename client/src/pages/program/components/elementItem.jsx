import { Box, Typography } from "@mui/material"
import { useContext, useEffect } from "react"
import PlanningNavigationContext from "../../../datamanager/contexts/planningNavigationContext"
import ToastContext from "../../../datamanager/contexts/toastContext"
import PlanningContext from "../../../datamanager/contexts/planningContext"
import ProgramAPI from "../../../api/program"
import PlanningAction from "../../../datamanager/actions/planning"
import ClassContext from "../../../datamanager/contexts/classContext"
import Class from "../../../entities/class"
import ExportAllBaseLayout from "../../exports/baseAll"
import { ExportContext } from "../../../datamanager/contexts/exportContext"
import { MdOutlineFileUpload } from "react-icons/md"

const ElementItem = ({ value, target, year, idSemester, onGetValue }) => {
  // Get global state
  const { navigateTo } = useContext(PlanningNavigationContext)
  const {
    selectSemester,
    selectClass,
    getClass,
    currentClass,
    currentSemester,
    dispatch
  } = useContext(PlanningContext)
  const { showToast } = useContext(ToastContext)
  const { getClass: getUniqueClass } = useContext(ClassContext)
  const { 
    programs, 
    setPrograms,
    exportRef, 
    handlePrintAll, 
    setCurrentExportData, 
    readyToExport, 
    setReadyToExport,
    handleChargeTheExportComponent
  } = useContext(ExportContext)

  useEffect(() => {
    if (readyToExport) {
      handlePrintAll()
      setReadyToExport(false)
    }
  }, [readyToExport])

  // Some handlers
  const handleNavigateTo = () => {
    if (target === "classes") {
      selectSemester({
        idYear: year.id,
        idSemester,
        value: `${value} | ${year.value}`
      })
      navigateTo(target, { field: "ACADEMIC_YEAR", value: 1 })
    } else if (target === "export") {
      onGetValue({
        idAcay: year.id,
        acayValue: year.value,
        idSemester,
        semesterValue: value
      })
    } else {
      handleGetProgramsByClass()
      navigateTo(target, { field: "CLASS", value: 1 })
    }
  }

  // Get programs filtered by class based on the code class
  const handleGetProgramsByClass = async () => {
    const { data, error } = await ProgramAPI.getByClass({
      idYear: currentSemester.idYear,
      idSemester: currentSemester.idSemester,
      codeClass: value
    })

    if (data !== undefined) {
      // New class
      let myClass = null

      // When all is OK
      if (data) {
        dispatch(PlanningAction.addClass(currentSemester.idYear, currentSemester.idSemester, data))

        // Get class from the whole list of classes
        myClass = getClass({
          idAcademicYear: currentSemester.idYear,
          idSemester: currentSemester.idSemester,
          idFaculty: data.id,
          codeClass: value
        })
      } else {
        myClass = new Class(getUniqueClass(value))
      }

      // Save the current class programs in the global state
      handleSelectClass(myClass)
    } else {
      showToast(`Le programme de ${value} n'a pas pu etre chargee correctement`, "error")
    }
  }

  const handleSelectClass = (myClass) => {
    selectClass(myClass)
  }

  const handlePrint = async() => {
    const academicYear = {
      idAcay: year.id,
      acayValue: year.value,
      idSemester,
      semesterValue: value
    }

    await handleSetCurrentExportData(academicYear)
    console.log(academicYear)
  }
  
  const handleSetCurrentExportData = async(academicYear) => {

    const newProgram = await handleChargeTheExportComponent("all", { academicYear })
    setPrograms(newProgram)
    setReadyToExport(true)
  }

  return (
    <Box
      sx={{
        position: "relative"
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "calc(100% - 32px)",
          p: 2,
          transition: "all .4s",
          "&:hover": {
            backgroundColor: "#fff2e4",
            cursor: "pointer"
          },
          "&:hover > span": {
            color: "#ff8500"
          },
          "&:not(:last-child)": {
            borderBottom: "1px solid #ccc"
          }
        }}
        onClick={handleNavigateTo}
      >
        <Typography
          as="span"
          sx={{
            color: "#555",
            fontFamily: "Nunito-Bold",
            transition: "all .4s"
          }}
        >
          {value}
        </Typography>

      </Box>

      {
        target === "classes" && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "120px",
              height: "55px",
              zIndex: 15,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer"
            }}
          >
            <MdOutlineFileUpload
              color="#555"
              size={25}
            />
            <Typography
              sx={{
                fontFamily: "Nunito-Bold",
                fontSize: "14px",
                ml: 1,
                color: "#555"
              }}
              onClick={handlePrint}
            >
              <div style={{ display: "none" }}><ExportAllBaseLayout ref={exportRef} /></div>
              Exporter
            </Typography>
          </Box>
        )
      }
    </Box>
  )
}

export default ElementItem