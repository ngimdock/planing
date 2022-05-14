import React, { useContext, useState } from "react"
import Input from '../../../inputs/input'
import { Box } from "@mui/material"
import Button from "../../../buttons/button"
import ModalContext from "../../../../../datamanager/contexts/modalContext"
import styles from '../../css/modalContent.module.css'
import LinearLoader from "../../../loaders/linearLoader"
import SpecialityAPI from "../../../../../api/speciality"
import SpecialityContext from "../../../../../datamanager/contexts/specialityContext"
import ToastContext from "../../../../../datamanager/contexts/toastContext"

const UpdateSpecialityModalContent = () => {
  // Get global state
  const { closeModal } = useContext(ModalContext)
  const { updateSpeciality, selectedSpeciality, setSelectedSpeciality } = useContext(SpecialityContext)
  const { showToast } = useContext(ToastContext)

  // Set local state
  const [name, setName] = useState(selectedSpeciality.name)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState("")

  // Some handlers
  const handleChangeName = (e) => setName(e.target.value)

  const handleSubmitForm = async () => {
    if (!loading) {
      setLoading(true)
      const { data , error: err } = await SpecialityAPI.modifySpeciality(selectedSpeciality.id, name)
      setLoading(false)
      const {
          idSpecialite,
          nomSpecialite
      } = data
      if(idSpecialite) {
        updateSpeciality(idSpecialite, nomSpecialite)
        closeModal()
        showToast("Speciality updated", "success")
      } else {
        setError(err)
        console.log(error)
        closeModal()
        showToast("Could not update the speciality", "error")
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
        value={name}
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

export default UpdateSpecialityModalContent