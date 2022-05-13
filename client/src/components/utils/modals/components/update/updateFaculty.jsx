import React, { useContext, useState } from "react"
import styles from '../../css/modalContent.module.css'
import Input from '../../../inputs/input'
import { Box } from "@mui/material"
import Button from "../../../buttons/button"
import ModalContext from "../../../../../datamanager/contexts/modalContext"
import LinearLoader from "../../../loaders/linearLoader"
import FacultyAPI from "../../../../../api/faculty"
import FacultyContext from "../../../../../datamanager/contexts/facultyContext"
import ToastContext from '../../../../../datamanager/contexts/toastContext'

const UpdateFacultyModelContent = () => {
  // Get global state
  const { closeModal } = useContext(ModalContext)
  const { updateFaculty, selectedFaculty } = useContext(FacultyContext)
  const { showToast } = useContext(ToastContext)

  // Set local state
  const [name, setName] = useState(selectedFaculty.name)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState("")

  // Some handlers
  const handleChangeName = (e) => setName(e.target.value)

  const handleSubmitForm = async() => {
    if (!loading) {
      setLoading(true)

      const { data, error: err } = await FacultyAPI.modifyFaculty(selectedFaculty.id, name) 
      setLoading(false);

      const {
          idFil,
          nomFil
      } = data

      if(idFil){
        setName("");
        updateFaculty(idFil, nomFil);
        closeModal();
        showToast("Filière modifié", "success")
      }
      else{
        setError(error)
        console.log(err)
        closeModal();
        showToast("Filière non modifié", "error")
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
    <section className={styles.container}>
      <Input 
        disabled={loading}
        placeholder="nom de la filière"
        fullWidth
        value={name}
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

export default UpdateFacultyModelContent