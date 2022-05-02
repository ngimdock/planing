import React, { useContext } from "react"
import Input from '../../inputs/input'
import { Box } from "@mui/material"
import Button from "../../buttons/button"
import ModalContext from "../../../../datamanager/contexts/modalContext"
import styles from '../css/modalContent.module.css'
import Select from "../../inputs/select"

const AddSubjectModalContent = () => {
  // Get global state
  const { closeModal } = useContext(ModalContext)

  return (
    <section>
      <Input 
        placeholder="code"
        fullWidth
      />
      <Input 
        placeholder="description"
        multiline
        fullWidth
        type="number"
      />
      <Select 
        options={[
          { value: 1, label: "Mbiakop" },
          { value: 2, label: "Jiomekong" }
        ]}
        label="Enseignant"
        fullWidth
      />
      <Select 
        options={[
          { value: 1, label: "Reseau" },
          { value: 2, label: "Geni Logiciel" }
        ]}
        label="Specialité"
        fullWidth
      />
      <Select 
        options={[
          { value: 1, label: "Semestre 1 2021-2022" },
          { value: 2, label: "Semestre 2 2021-2022" }
        ]}
        label="Semestre"
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

export default AddSubjectModalContent