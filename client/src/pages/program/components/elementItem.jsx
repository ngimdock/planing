import { Box, Typography } from "@mui/material"
import { useContext } from "react"
import PlanningNavigationContext from "../../../datamanager/contexts/planningNavigationContext"
import ToastContext from "../../../datamanager/contexts/toastContext"
import PlanningContext from "../../../datamanager/contexts/planningContext"
import ProgramAPI from "../../../api/program"
import PlanningAction from "../../../datamanager/actions/planning"

const ElementItem = ({ value, target, year, idSemester }) => {
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

  // Some handlers
  const handleNavigateTo = () => {
    if (target === "classes") {
      selectSemester({
        idYear: year.id,
        idSemester,
        value: `${value} | ${year.value}`
      })
      navigateTo(target, { field: "ACADEMIC_YEAR", value: 1 })
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
      // When all is OK
      if (data) {
        dispatch(PlanningAction.addClass(currentSemester.idYear, currentSemester.idSemester, data))

        // Get class from the whole list of classes
        const myClass = getClass({ 
          idAcademicYear: currentSemester.idYear, 
          idSemester: currentSemester.idSemester,
          idFaculty: data.id,
          codeClass: value 
        })

        // Save the current class programs in the global state
        handleSelectClass(myClass)
      }
    } else {
      showToast(`Le programme de ${value} n'a pas pu etre chargee correctement`, "error")
    }
  }

  const handleSelectClass = (myClass) => {
    selectClass(myClass)
  }

  return (
    <Box 
      sx={{
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
        { value }
      </Typography>
    </Box>
  )
}

export default ElementItem