import { Box } from "@mui/material"
import Button from '../../../../components/utils/buttons/button'

const ProgramForm = ({ onClose }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        width: "calc(100% - 16px)",
        display: "flex",
        flexDirection: "column",
        p: 1,
        backgroundColor: "#fff"
      }}
    >
      <Button 
        text="Annuler"
        variant="outlined"
        bgColor="#ff8500"
        fontSize={12}
        size="auto"
        onClick={onClose}
      />
    </Box>
  )
}

export default ProgramForm