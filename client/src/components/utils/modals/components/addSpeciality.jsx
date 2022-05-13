import React, { useContext, useState } from "react"
import Input from '../../inputs/input'
import { Box } from "@mui/material"
import Button from "../../buttons/button"
import ModalContext from "../../../../datamanager/contexts/modalContext"
import styles from '../css/modalContent.module.css'
import LinearLoader from "../../loaders/linearLoader"
import SpecialityAPI from "../../../../api/speciality"
import SpecialityContext from "../../../../datamanager/contexts/specialityContext"
import ToastContext from "../../../../datamanager/contexts/toastContext"

const AddSpecialityModalContent = () => {
  // Get global state
  const { closeModal } = useContext(ModalContext)
  const { addSpeciality } = useContext(SpecialityContext)
  const { showToast } = useContext(ToastContext)

  // Set local state
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState("")

  // Some handlers
  const handleChangeName = (e) => setName(e.target.value)

  const handleSubmitForm = async () => {
    if (!loading) {
      setLoading(true)
      const { data, error: err } = await SpecialityAPI.createSpeciality(name)
      setLoading(false)
      if(data.id) {
        const payload = { id: data.id, name: data.nomSpecialite } 
        addSpeciality(payload)
        closeModal()
        showToast("Nouvelle spécialité ajouté", "success")
      } else {
        setError(err)
        console.log(error)
        closeModal()
        showToast("Erreur d'ajout de la spécialité", "error")
      }
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
        placeholder="nom de la spécialité"
        fullWidth
        onChange={handleChangeName}
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

export default AddSpecialityModalContent