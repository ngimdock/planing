import React, { useContext, useState } from "react"
import Input from '../../inputs/input'
import { Box } from "@mui/material"
import Button from "../../buttons/button"
import ModalContext from "../../../../datamanager/contexts/modalContext"
import styles from "../css/modalContent.module.css"
import LinearLoader from "../../loaders/linearLoader"
import reducer, { initialState } from '../reducers/classReducer'
import LevelAPI from '../../../../api/level/index';
import LevelContext from '../../../../datamanager/contexts/levelContext';
import ToastContext from "../../../../datamanager/contexts/toastContext"

const AddLevelModalContent = () => {
  // Get global state
  const { closeModal } = useContext(ModalContext)
  const { addLevel } = useContext(LevelContext)
  const { showToast } = useContext(ToastContext)

  // Set local state
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  // Some handlers
  const handleChange = (e) => setName(e.target.value)

  const handleSubmitForm = async () => {
    if (!loading) {
      setLoading(true)

      const payload = {
        nomNiv: name
      }
      const { data, error } = await LevelAPI.create(payload)
      setLoading(false)

      if (data) {
        addLevel({ id: data.id, name: name })

        closeModal()
        showToast("nouveau niveau cree")
      } else {
        console.log(error)
        showToast("ne peut creer un niveau", "error")
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