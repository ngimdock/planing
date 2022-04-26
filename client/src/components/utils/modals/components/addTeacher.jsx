import React, { useContext } from "react"
import Input from '../../inputs/input'
import Select from '../../inputs/select'
import { Box } from "@mui/material"
import Button from "../../buttons/button"
import ModalContext from "../../../../datamanager/contexts/modalContext"
import styles from '../css/modalContent.module.css'

const AddTeacherModalContent = () => {
  // Get global state
  const { closeModal } = useContext(ModalContext)

  return (
    <section>
      <Input 
        placeholder="matricule"
        fullWidth
      />
      <Input 
        placeholder="nom"
        fullWidth
      />
      <Select 
        options={[
          { value: "feminin", label: "Feminin" },
          { value: "masculin", label: "Masculin" }
        ]}
        label="Sexe"
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

export default AddTeacherModalContent