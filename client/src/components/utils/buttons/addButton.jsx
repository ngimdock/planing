import { Box } from "@mui/material"
import { BsPencilFill } from "react-icons/bs"
import Button from "./button"

const AddButton = ({ title, onClick }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 60,
        right: 20
      }}
    >
      <Button 
        text={title}
        rounded
        hasShadow
        onClick={onClick}
      >
        <BsPencilFill 
          size={15}
          color="#fff"
        />
      </Button>
    </Box>
  )
}

export default AddButton