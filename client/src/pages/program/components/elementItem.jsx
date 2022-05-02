import { Box, Typography } from "@mui/material"

const ElementItem = ({ value }) => {
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