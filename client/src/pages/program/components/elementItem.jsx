import { Box, Typography } from "@mui/material"
import { useContext } from "react"
import PlanningNavigationContext from "../../../datamanager/contexts/planningNavigationContext"

const ElementItem = ({ value, target }) => {
  // Get global state
  const { navigateTo } = useContext(PlanningNavigationContext)

  // Some handlers
  const handleNavigateTo = () => {
    if (target === "classes") {
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