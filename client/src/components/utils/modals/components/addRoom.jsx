import React, { useContext, useState } from "react"
import Input from '../../inputs/input'
import { Box } from "@mui/material"
import Button from "../../buttons/button"
import styles from '../css/modalContent.module.css'
import ModalContext from "../../../../datamanager/contexts/modalContext"
import LinearLoader from "../../loaders/linearLoader"

const AddRoomModalContent = () => {
  // Get global state
  const { closeModal } = useContext(ModalContext)

  // Set local state
  const [name, setName] = useState("")
  const [capacity, setCapacity] = useState(0)
  const [loading, setLoading] = useState(false)

  // Some handlers
  const handleChange = (field, e) => {
    const value = e.target.value

    if (field === "name") {
      setName(value)
    } else if (field === "capacity") {
      setCapacity(value)
    }
  }

  const handleSubmitForm = () => {
    if (!loading) {
      setLoading(true)
      console.log("You can send request here")
    }
  }

  const verificationForm = () => {
    if (name && capacity) {
      return true
    }

    return false
  }

  return (
    <section>
      <Input 
        disabled={loading}
        placeholder="nom de la salle"
        fullWidth
        onChange={(e) => handleChange("name", e)}
      />
      <Input 
        disabled={loading}
        placeholder="capacité de la salle"
        fullWidth
        type="number"
        onChange={(e) => handleChange("capacity", e)}
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
          disabled={!verificationForm() || loading}
          text="Sauver"
          variant="contained"
          fontSize={14}
          rounded
          onClick={handleSubmitForm}
        />
      </Box>

      {
        loading && <LinearLoader />
      }
    </section>
  )
}

export default AddRoomModalContent