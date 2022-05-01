import React, { useContext } from "react"
import styles from '../css/modalContent.module.css'
import Input from '../../inputs/input'
import { Box } from "@mui/material"
import Button from "../../buttons/button"
import ModalContext from "../../../../datamanager/contexts/modalContext"

const AddFacultyModalContent = () => {
  // Get global state
  const { closeModal } = useContext(ModalContext)

  return (
    <section className={styles.container}>
      <Input 
        placeholder="nom de la filière"
        fullWidth
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

export default AddFacultyModalContent
