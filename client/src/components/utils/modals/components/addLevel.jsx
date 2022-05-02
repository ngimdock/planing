import React, { useContext, useState } from "react"
import Input from '../../inputs/input'
import { Box } from "@mui/material"
import Button from "../../buttons/button"
import ModalContext from "../../../../datamanager/contexts/modalContext"
import styles from "../css/modalContent.module.css"
import LinearLoader from "../../loaders/linearLoader"

const AddLevelModalContent = () => {
  // Get global state
  const { closeModal } = useContext(ModalContext)

  // Set local state
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  // Some handlers
  const handleChange = (e) => setName(e.target.value)

  const handleSubmitForm = () => {
    if (!loading) {
      setLoading(true)
      console.log("You can send a request here")
    }
  }

  const verificationForm = () => {
    if (name) {
      return true
    } 

    return false
  }

  return (
    <section>
      <Input 
        disabled={loading}
        placeholder="nom du niveau"
        fullWidth
        onChange={handleChange}
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

export default AddLevelModalContent