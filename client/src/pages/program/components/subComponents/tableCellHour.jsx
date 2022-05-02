import { Box, Typography } from "@mui/material"

const TableCellHour = () => {
  return (
    <Box
      sx={{
        minHeight: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f8f8"
      }}
    >
      <Typography
        sx={{
          fontSize: 14,
          fontFamily: "Nunito-Bold"
        }}
      >
        07h - 10h
      </Typography>
    </Box>
  )
}

export default TableCellHour