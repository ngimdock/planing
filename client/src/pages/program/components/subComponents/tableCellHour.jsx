import { Box, Typography } from "@mui/material"

const TableCellHour = () => {
  return (
    <Box
      sx={{
        minHeight: 100,
        height: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: 12,
          fontFamily: "Nunito-Bold"
        }}
      >
        07h - 10h
      </Typography>
    </Box>
  )
}

export default TableCellHour