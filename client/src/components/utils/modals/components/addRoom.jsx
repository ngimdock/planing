import React, { useContext } from "react"
import Input from '../../inputs/input'
import { Box } from "@mui/material"
import Button from "../../buttons/button"
import styles from '../css/modalContent.module.css'
import ModalContext from "../../../../datamanager/contexts/modalContext"

const AddRoomModalContent = () => {
  // Get global state
  const { closeModal } = useContext(ModalContext)

  return (
    <section>
      <Input 
        placeholder="nom de la salle"
        fullWidth
      />
      <Input 
        placeholder="capacité de la salle"
        fullWidth
        type="number"
      />

      <Box className={styles.controls}>
        <Button 
          text="Annuler"
          variant="outlined"
          bgColor="#ff8500"
          fontSize={14}
          rounded
          className={styles.controlsBtn}
          onClick={closeModal}
        />

        <Button 
          text="Sauver"
          variant="contained"
          fontSize={14}
          rounded
        />
      </Box>
    </section>
  )
}

export default AddRoomModalContent