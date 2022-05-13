import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"
import PopOver from '../../../../components/utils/popovers'

const ProgramItem = ({ program }) => {
  // Set local state
  const [showPopover, setShowPopover] = useState(false)
  const [anchorElement, setAnchorElement] = useState(null)

  // Some handlers
  const handlePopover = (anchorEl, val) => {
    setAnchorElement(anchorEl)
    setShowPopover(val)
  }

  return (
    <Box 
      sx={{
        position: "relative",
        width: "calc(100% - 16px)",
        p: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        "&:hover": {
          cursor: "pointer"
        },
        "& span": {
          transition: "all .4s"
        },
        "&:hover span": {
          color: "#3e4bff"
        }
      }}
      onClick={(e) => !showPopover && handlePopover(e.currentTarget, true)}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "baseline"
        }}
      >
        <Typography
          as="span"
          sx={{
            fontSize: 14,
            fontFamily: "Nunito-Bold"
          }}
        >{ program.subjectCode.toUpperCase() }</Typography>
        <Typography
          as="span"
          sx={{
            fontSize: 12,
            fontFamily: "Nunito-Bold",
            ml: 1
          }}
        >({ program.roomName.toUpperCase() })</Typography>
      </Box>

      <Typography
        as="span"
        sx={{
          fontSize: 13,
          fontFamily: "Nunito-Bold",
          color: "#555"
        }}
      >{ program.teacherName.toUpperCase() }</Typography>

      <PopOver 
        open={showPopover} 
        data={program}
        onClose={() => handlePopover(null, false)} 
        anchorEl={anchorElement}  
      />
    </Box>
  )
}

export default ProgramItem