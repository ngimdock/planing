import { useContext, useMemo, useState } from "react"
import { Box } from "@mui/material"
import SemesterList from "./semesterList"
import styles from '../css/program.module.css'
import ClasseList from "./classesList"
import PlanningNavigationContext from '../../../datamanager/contexts/planningNavigationContext'
import ProgramTable from "./programTable"

const ProgramBody = () => {
  // Get data from global state
  const { currentPage } = useContext(PlanningNavigationContext)

  // Some handlers
  const generateClassNameBaseOnPage = useMemo(() => {
    if (currentPage === "classes") return styles.containerListClasses
    else if (currentPage === "programs") return styles.containerListPrograms

    return ""
  }, [currentPage])

  return (
    <Box 
      as="section"
      sx={{
        overflow: "hidden",
        pb: 1
      }}  
    >
      <Box
        sx={{
          width: "auto",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
        className={`${styles.containerList} ${generateClassNameBaseOnPage}`}
      >
        <SemesterList />
        <ClasseList />
        <ProgramTable />
      </Box>
    </Box>
  )
}

export default ProgramBody