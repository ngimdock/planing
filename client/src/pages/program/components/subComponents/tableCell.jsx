import { Box, Typography } from "@mui/material"

const TableCellContent = () => {
  return (
    <Box
      sx={{
        minHeight: 100,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "#f8f8f8",
        transition: "all .4s",
        "&:hover": {
          backgroundColor: "#fff2e4"
        }
      }}
    >
      <Typography
        sx={{
          fontSize: 12,
          fontFamily: "Nunito-Bold"
        }}
      >
        Cours
      </Typography>
    </Box>
  ) 
}

export default TableCellContent