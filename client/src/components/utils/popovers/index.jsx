import { Box, Popover, Typography } from "@mui/material"
import { BsFillTrashFill, BsPencilFill } from 'react-icons/bs'

const PopOverContent = ({ title, value, description }) => {
  return (
    <Box
      sx={{
        width: "calc(50% - 16px)",
        p: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Typography
        sx={{
          fontSize: 14,
          fontFamily: "Nunito-Bold",
          color: "#ff8500"
        }}
      >{ title }</Typography>
      <Typography
        sx={{
          fontSize: 14,
          fontFamily: "Nunito-Bold"
        }}
      >{ value }</Typography>
      <Typography
        sx={{
          fontSize: 12,
          fontFamily: "Nunito-Bold",
          color: "#555"
        }}
      >( { description } )</Typography>
    </Box>
  )
}

const PopOver = ({ open, onClose, anchorEl }) => {
  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      elevation={2}
    >
      <Box
        sx={{
          width: "200px",
          p: 1,
          backgroundColor: "#3e4bff",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Typography
            sx={{
              fontSize: 16,
              fontFamily: "Nunito-Bold",
              color: "#fff"
            }}
          >MATH 112</Typography>

          <Box
            sx={{
              width: 40,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <BsPencilFill 
              size={15}
              color="#fff"
            />
            <BsFillTrashFill 
              size={15}
              color="#fff"
            />
          </Box>
        </Box>

        <Typography
          sx={{
            fontSize: 13,
            fontFamily: "Nunito-Bold",
            color: "#f8f8f8"
          }}
        >
          ( DILANE3 )
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row"
        }}
      >
        <PopOverContent
          title="Salle"
          value="A502"
          description="502 Places"
        />
        <PopOverContent
          title="Horaire"
          value="07h - 9h55"
          description="3H"
        />
      </Box>
    </Popover>
  )
}

export default PopOver