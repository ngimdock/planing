import { useMemo, useState } from "react"
import { Box } from "@mui/material"
import SemesterList from "./semesterList"
import styles from '../css/program.module.css'
import ClasseList from "./classesList"

const ProgramBody = () => {
  // Set local state
  const [page, setPage] = useState("semesters")

  // Some handlers
  const generateClassNameBaseOnPage = useMemo(() => {
    if (page === "classes") return styles.containerListClasses
    else if (page === "programs") return styles.containerListPrograms

    return ""
  }, [page])

  return (
    <Box 
      as="section"
      sx={{
        overflow: "hidden",
        pb: 1
      }}  
    >
      <button onClick={() => setPage("programs")}>programs</button>
      <button onClick={() => setPage("semesters")}>semesters</button>
      <button onClick={() => setPage("classes")}>classes</button>
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
        <SemesterList />
      </Box>
    </Box>
  )
}

export default ProgramBody