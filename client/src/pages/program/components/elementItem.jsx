import { Box, Typography } from "@mui/material"
import { useContext } from "react"
import PlanningNavigationContext from "../../../datamanager/contexts/planningNavigationContext"
import PlanningContext from "../../../datamanager/contexts/planningContext"

const ElementItem = ({ value, target, year, idSemester }) => {
  // Get global state
  const { navigateTo } = useContext(PlanningNavigationContext)
  const { selectSemester } = useContext(PlanningContext)

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
      navigateTo(target, { field: "CLASS", value: 1 })
    }
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