import React, { useContext, useState, useEffect } from "react"
import Input from '../../../inputs/input'
import { Box } from "@mui/material"
import Button from "../../../buttons/button"
import ModalContext from "../../../../../datamanager/contexts/modalContext"
import styles from "../../css/modalContent.module.css"
import LinearLoader from "../../../loaders/linearLoader"
import reducer, { initialState } from '../../reducers/classReducer'
import LevelAPI from '../../../../../api/level/index';
import LevelContext from '../../../../../datamanager/contexts/levelContext';
import ToastContext from "../../../../../datamanager/contexts/toastContext"

const UpdateLevelModalContent = () => {
  // Get global state
  const { closeModal } = useContext(ModalContext)
  const { updateLevel, selectedLevel } = useContext(LevelContext)
  const { showToast } = useContext(ToastContext)

  // Set local state
  const [name, setName] = useState(selectedLevel.name)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log(selectedLevel)
  }, [])

  // Some handlers
  const handleChange = (e) => setName(e.target.value)

  const handleSubmitForm = async () => {
    if (!loading) {
      setLoading(true)

      const payload = {
        nomNiv: name
      }
      const {newData, error } = await LevelAPI.update(selectedLevel.id, payload)
   
      setLoading(false)
      if (newData) {
        updateLevel({ id: newData.idNiv, name: newData.nomNiv })
       
        closeModal()
        showToast("niveau mis a jour", "success")
      } else {
      if(error)
        console.log(error)
        showToast("niveau non modifier", "error")
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
        value={name}
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

export default UpdateLevelModalContent